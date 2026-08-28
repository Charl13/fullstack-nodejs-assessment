import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cocktail } from "./cocktails.entity";

@Injectable()
export class CocktailsService {
  constructor(
    @InjectRepository(Cocktail)
    private cocktailRepository: Repository<Cocktail>,
  ) {}

  findAll() {
    return this.cocktailRepository.find();
  }

  findOne(id: number) {
    return this.cocktailRepository.findOneBy({ id });
  }

  create(cocktail: Cocktail) {
    return this.cocktailRepository.insert(cocktail);
  }
}
