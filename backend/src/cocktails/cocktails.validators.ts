import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Cocktail } from './cocktails.entity';

@ValidatorConstraint({ name: 'isTitleUnique', async: true })
@Injectable()
export class IsTitleUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Cocktail)
    private readonly cocktailRepository: Repository<Cocktail>,
  ) {}

  async validate(title: string): Promise<boolean> {
    const existing = await this.cocktailRepository.findOneBy({ title });
    return !existing;
  }

  defaultMessage(): string {
    return 'A cocktail with this title already exists.';
  }
}

export function IsTitleUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isTitleUnique',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsTitleUniqueConstraint,
    });
  };
}
