import { Injectable } from '@nestjs/common';
import { ElasticSearchIndexer } from '../elasticsearch.service';
import { CocktailsService } from './cocktails.service';

export const COCKTAILS_INDEX = 'cocktails';

export const COCKTAILS_MAPPINGS = {
  properties: {
    title: { type: 'text' },
    description: { type: 'text' },
    price: { type: 'float' },
  },
};

@Injectable()
export class CocktailsElasticSearchIndexer implements ElasticSearchIndexer {
  readonly name = 'cocktails';
  readonly index = COCKTAILS_INDEX;
  readonly mappings = COCKTAILS_MAPPINGS;

  constructor(private readonly cocktailsService: CocktailsService) {}

  async createIndex() {
    const cocktails = await this.cocktailsService.findAll();

    return cocktails.map((cocktail) => ({
      id: String(cocktail.id),
      document: {
        title: cocktail.title,
        description: cocktail.description,
        price: cocktail.price,
      },
    }));
  }
}
