import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cocktail } from './cocktails.entity';
import { CocktailCreatedEvent } from './cocktails.events';

@Injectable()
export class CocktailsService {
  constructor(
    @InjectRepository(Cocktail)
    private cocktailRepository: Repository<Cocktail>,
    private eventEmitter: EventEmitter2,
  ) {}

  findAll() {
    return this.cocktailRepository.find();
  }

  findOne(id: number) {
    return this.cocktailRepository.findOneBy({ id });
  }

  async create(cocktail: Cocktail) {
    const created = await this.cocktailRepository.save(cocktail);

    this.eventEmitter.emit(
      CocktailCreatedEvent.name,
      new CocktailCreatedEvent(created),
    );
    return created;
  }
}
