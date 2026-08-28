import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CocktailsService } from './cocktails.service';
import { CocktailsController } from './cocktails.controller';
import { Cocktail } from './cocktails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cocktail])],
  providers: [CocktailsService],
  controllers: [CocktailsController],
})
export class CocktailsModule {}
