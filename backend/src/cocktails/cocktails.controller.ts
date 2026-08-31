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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Cocktail } from './cocktails.entity';
import { CocktailsService } from './cocktails.service';
import { CocktailsElasticSearch } from './cocktails.elasticsearch';
import { CreateCocktailDto } from './cocktails.dtos';

@ApiTags('cocktails')
@Controller('cocktails')
export class CocktailsController {
  constructor(
    private readonly cocktailsService: CocktailsService,
    private readonly cocktailsElasticSearch: CocktailsElasticSearch,
  ) {}

  @ApiOperation({ summary: 'Get a single cocktail by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: Cocktail })
  @ApiNotFoundResponse({
    description: 'Cocktail with the given id was not found',
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Cocktail> {
    const cocktail = await this.cocktailsService.findOne(id);

    if (!cocktail) {
      throw new NotFoundException(`Cocktail with id ${id} not found`);
    }
    return cocktail;
  }

  @ApiOperation({
    summary: 'List cocktails, optionally fuzzy-searched by title/description',
  })
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Fuzzy search query matched against title and description',
  })
  @ApiOkResponse({ type: Cocktail, isArray: true })
  @Get()
  findAll(@Query('q') q?: string) {
    if (q) {
      return this.cocktailsElasticSearch.searchCocktails(q);
    }
    return this.cocktailsService.findAll();
  }

  @ApiOperation({ summary: 'Create a new cocktail' })
  @ApiCreatedResponse({
    description: 'Cocktail was created',
    type: Cocktail,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed, e.g. duplicate title or invalid price',
  })
  @Post()
  async create(@Body() cocktail: CreateCocktailDto): Promise<Cocktail> {
    return this.cocktailsService.create(cocktail);
  }
}
