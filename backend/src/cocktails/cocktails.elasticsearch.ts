import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ElasticSearch } from '../elasticsearch.service';
import { Cocktail } from './cocktails.entity';
import { CocktailCreatedEvent } from './cocktails.events';
import {
  COCKTAILS_INDEX,
  COCKTAILS_MAPPINGS,
} from './cocktails.elasticsearch-indexer';

@Injectable()
export class CocktailsElasticSearch {
  constructor(private readonly elasticSearch: ElasticSearch) {}

  async searchCocktails(query: string) {
    const results = await this.elasticSearch.search(COCKTAILS_INDEX, {
      multi_match: {
        query,
        fields: ['title', 'description'],
        fuzziness: 'AUTO',
      },
    });
    return results.map((result) => ({
      id: Number(result._id),
      ...(result._source as Omit<Cocktail, 'id'>),
    }));
  }

  @OnEvent(CocktailCreatedEvent.name)
  async onCocktailCreated({ cocktail }: CocktailCreatedEvent) {
    try {
      await this.elasticSearch.create(COCKTAILS_INDEX, COCKTAILS_MAPPINGS);

      await this.elasticSearch.index(COCKTAILS_INDEX, String(cocktail.id), {
        title: cocktail.title,
        description: cocktail.description,
        price: cocktail.price,
      });
    } catch (error) {
      console.error(`Failed to index cocktail ${cocktail.id}:`, error);
    }
  }
}
