import { Command, CommandRunner } from 'nest-commander';
import { ElasticSearch } from '../elasticsearch.service';

@Command({
  name: 'elastic-search-index',
  description: 'Reindex all resources into Elasticsearch',
})
export class ElasticSearchIndexCommand extends CommandRunner {
  constructor(private readonly elasticSearch: ElasticSearch) {
    super();
  }

  async run(): Promise<void> {
    await this.elasticSearch.indexAll();
  }
}
