import { Injectable } from '@nestjs/common';
import { Client as EsClient } from '@elastic/elasticsearch';

export interface ElasticSearchIndexer {
  readonly name: string;
  indexAll(): Promise<number>;
}

export const ELASTIC_SEARCH_INDEXERS = 'ELASTIC_SEARCH_INDEXERS';

@Injectable()
export class ElasticSearch {
  private client: EsClient;

  constructor() {
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
}
