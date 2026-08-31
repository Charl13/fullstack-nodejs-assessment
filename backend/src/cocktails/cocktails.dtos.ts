import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { IsTitleUnique } from './cocktails.validators';

export class CreateCocktailDto {
  @IsString()
  @IsNotEmpty()
  @IsTitleUnique({ message: 'A cocktail named "$value" already exists.' })
  title: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
