import { Cocktail } from './cocktails.entity';

export class CocktailCreatedEvent {
  constructor(public readonly cocktail: Cocktail) {}
}
