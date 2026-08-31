import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Cocktail } from './cocktails/cocktails.entity';
import { CocktailsModule } from './cocktails/cocktails.module';
import { CocktailsElasticSearchIndexer } from './cocktails/cocktails.elasticsearch-indexer';
import { ELASTIC_SEARCH_INDEXERS } from './elasticsearch.service';
import { ElasticSearchModule } from './elasticsearch.module';
import { ElasticSearchIndexCommand } from './commands/elastic-search-index.command';

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
    ElasticSearchModule,
  ],
  providers: [
    ElasticSearchIndexCommand,
    {
      provide: ELASTIC_SEARCH_INDEXERS,
      useFactory: (cocktailsSearchIndexer: CocktailsElasticSearchIndexer) => [
        cocktailsSearchIndexer,
      ],
      inject: [CocktailsElasticSearchIndexer],
    },
  ],
})
export class AppModule {}
