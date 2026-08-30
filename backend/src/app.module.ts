import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Cocktail } from './cocktails/cocktails.entity';
import { CocktailsModule } from './cocktails/cocktails.module';
import { CocktailsElasticsearch } from './cocktails/cocktails.elasticsearch';
import { ELASTIC_SEARCH_INDEXERS } from './elasticsearch.service';
import { ElasticSearch } from './elasticsearch.service';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      logging: true,
      entities: [Cocktail],
    }),
    CocktailsModule,
  ],
  providers: [
    {
      provide: ELASTIC_SEARCH_INDEXERS,
      useFactory: (cocktailsElasticsearch: CocktailsElasticsearch) => [
        cocktailsElasticsearch,
      ],
      inject: [CocktailsElasticsearch],
    },
  ],
})
export class AppModule {}
