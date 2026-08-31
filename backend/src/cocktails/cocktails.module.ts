import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CocktailsService } from './cocktails.service';
import { CocktailsController } from './cocktails.controller';
import { CocktailsElasticSearch } from './cocktails.elasticsearch';
import { CocktailsElasticSearchIndexer } from './cocktails.elasticsearch-indexer';
import { Cocktail } from './cocktails.entity';
import { ElasticSearchModule } from '../elasticsearch.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cocktail]), ElasticSearchModule],
  providers: [
    CocktailsService,
    CocktailsElasticSearch,
    CocktailsElasticSearchIndexer,
  ],
  controllers: [CocktailsController],
  exports: [
    CocktailsService,
    CocktailsElasticSearch,
    CocktailsElasticSearchIndexer,
  ],
})
export class CocktailsModule {}
