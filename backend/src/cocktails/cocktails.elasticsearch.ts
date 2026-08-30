import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ElasticSearch, ElasticSearchIndexer } from '../elasticsearch.service';
import { Cocktail } from './cocktails.entity';
import { CocktailCreatedEvent } from './cocktails.events';
import { CocktailsService } from './cocktails.service';

export const COCKTAILS_INDEX = 'cocktails';

@Injectable()
export class CocktailsElasticsearch implements ElasticSearchIndexer {
  readonly name = 'cocktails';

  constructor(
    private readonly elasticSearch: ElasticSearch,
    private readonly cocktailsService: CocktailsService,
  ) {}

  async create() {
    await this.elasticSearch.create(COCKTAILS_INDEX, {
      properties: {
        title: { type: 'text' },
        description: { type: 'text' },
        price: { type: 'float' },
      },
    });
  }

  async index(cocktail: Cocktail) {
    await this.elasticSearch.index(COCKTAILS_INDEX, String(cocktail.id), {
      title: cocktail.title,
      description: cocktail.description,
      price: cocktail.price,
    });
  }

  async indexAll(): Promise<number> {
    await this.elasticSearch.delete(COCKTAILS_INDEX);
    await this.create();

    const cocktails = await this.cocktailsService.findAll();

    for (const cocktail of cocktails) {
      await this.index(cocktail);
    }
    return cocktails.length;
  }

  @OnEvent(CocktailCreatedEvent.name)
  async onCocktailCreated({ cocktail }: CocktailCreatedEvent) {
    try {
      await this.create();
      await this.index(cocktail);
    } catch (error) {
      console.error(`Failed to index cocktail ${cocktail.id}:`, error);
    }
  }
}
