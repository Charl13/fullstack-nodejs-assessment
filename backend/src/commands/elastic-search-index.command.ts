import { Inject } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import {
  ELASTIC_SEARCH_INDEXERS,
  ElasticSearchIndexer,
} from '../elasticsearch.service';

@Command({
  name: 'elastic-search-index',
  description: 'Reindex all resources into Elasticsearch',
})
export class ElasticSearchIndexCommand extends CommandRunner {
  constructor(
    @Inject(ELASTIC_SEARCH_INDEXERS)
    private readonly indexers: ElasticSearchIndexer[],
  ) {
    super();
  }

  async run(): Promise<void> {
    for (const indexer of this.indexers) {
      const count = await indexer.indexAll();

      console.log(`Reindexed ${count} ${indexer.name}.`);
    }
  }
}
