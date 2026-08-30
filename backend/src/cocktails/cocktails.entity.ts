import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cocktails')
export class Cocktail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;
}
