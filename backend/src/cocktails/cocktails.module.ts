import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CocktailsService } from './cocktails.service';
import { CocktailsController } from './cocktails.controller';
import { CocktailsElasticsearch } from './cocktails.elasticsearch';
import { Cocktail } from './cocktails.entity';
import { ElasticsearchModule } from '../elasticsearch.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cocktail]), ElasticsearchModule],
  providers: [CocktailsService, CocktailsElasticsearch],
  controllers: [CocktailsController],
  exports: [CocktailsService, CocktailsElasticsearch],
})
export class CocktailsModule {}
