import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Client as EsClient } from '@elastic/elasticsearch';

export interface ElasticSearchIndexer {
  readonly name: string;
  readonly index: string;
  readonly mappings: Record<string, unknown>;
  createIndex(): Promise<
    Array<{ id: string; document: Record<string, unknown> }>
  >;
}

export const ELASTIC_SEARCH_INDEXERS = 'ELASTIC_SEARCH_INDEXERS';

@Injectable()
export class ElasticSearch {
  private client: EsClient;

  constructor(private readonly moduleRef: ModuleRef) {
    this.client = new EsClient({ node: process.env.ELASTICSEARCH_HOST });

    this.ping();
  }

  async ping() {
    try {
      const isAlive = await this.client.ping();

      console.log('Elasticsearch cluster is up and running:', isAlive);
    } catch (error) {
      console.error('Elasticsearch cluster is down!', error);
    }
  }

  async create(index: string, mappings: Record<string, unknown>) {
    const exists = await this.client.indices.exists({ index });

    if (!exists) {
      await this.client.indices.create({ index, mappings });
    }
  }

  async delete(index: string) {
    const exists = await this.client.indices.exists({ index });

    if (exists) {
      await this.client.indices.delete({ index });
    }
  }

  async index(index: string, id: string, document: Record<string, unknown>) {
    await this.client.index({ index, id, document });
  }

  async search(index: string, query: Record<string, unknown>) {
    const response = await this.client.search({ index, query });

    return response.hits.hits;
  }

  async indexAll(index?: string) {
    for (const indexer of this.getIndexers(index)) {
      await this.delete(indexer.index);
      await this.create(indexer.index, indexer.mappings);

      const items = await indexer.createIndex();

      for (const item of items) {
        await this.index(indexer.index, item.id, item.document);
      }
      console.log(`Reindexed ${items.length} ${indexer.name}.`);
    }
  }

  getIndexers(index?: string) {
    const indexers = this.moduleRef.get<ElasticSearchIndexer[]>(
      ELASTIC_SEARCH_INDEXERS,
      {
        strict: false,
      },
    );
    return index
      ? indexers.filter((indexer) => indexer.index === index)
      : indexers;
  }
}
