import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Cocktail } from './cocktails.entity';
import { CocktailsService } from './cocktails.service';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Cocktail> {
    const cocktail = await this.cocktailsService.findOne(id);

    if (!cocktail) {
      throw new NotFoundException(`Cocktail with id ${id} not found`);
    }
    return cocktail;
  }

  @Get()
  findAll(): Promise<Cocktail[]> {
    return this.cocktailsService.findAll();
  }

  @Post()
  async create(@Body() cocktail: Cocktail) {
    console.log('info: creating cocktail', cocktail);
    const res = await this.cocktailsService.create(cocktail);
    console.log('res', res);
    return true;
  }
}
