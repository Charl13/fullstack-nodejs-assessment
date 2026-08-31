import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Cocktail } from './cocktails.entity';
import { CocktailsService } from './cocktails.service';
import { CocktailsElasticSearch } from './cocktails.elasticsearch';
import { CreateCocktailDto } from './cocktails.dtos';

@Controller('cocktails')
export class CocktailsController {
  constructor(
    private readonly cocktailsService: CocktailsService,
    private readonly cocktailsElasticSearch: CocktailsElasticSearch,
  ) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Cocktail> {
    const cocktail = await this.cocktailsService.findOne(id);

    if (!cocktail) {
      throw new NotFoundException(`Cocktail with id ${id} not found`);
    }
    return cocktail;
  }

  @Get()
  findAll(@Query('q') q?: string) {
    if (q) {
      return this.cocktailsElasticSearch.searchCocktails(q);
    }
    return this.cocktailsService.findAll();
  }

  @Post()
  async create(@Body() cocktail: CreateCocktailDto) {
    console.log('info: creating cocktail', cocktail);
    const res = await this.cocktailsService.create(cocktail);
    console.log('res', res);
    return true;
  }
}
