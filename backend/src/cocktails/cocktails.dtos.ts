import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { IsTitleUnique } from './cocktails.validators';

export class CreateCocktailDto {
  @ApiProperty({
    description: 'Unique name of the cocktail',
    example: 'Mojito',
  })
  @IsString()
  @IsNotEmpty()
  @IsTitleUnique({ message: 'A cocktail named "$value" already exists.' })
  title: string;

  @ApiProperty({ description: 'Price in EUR', example: 8.5, minimum: 0 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Description of the cocktail',
    example: 'A refreshing mix of rum, mint and lime',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
