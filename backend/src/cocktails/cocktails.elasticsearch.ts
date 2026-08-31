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
