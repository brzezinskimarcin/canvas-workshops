import Character, { type CharacterConstructor } from '@/entities/helpers/character';

export interface EnemyConfig {
  x: number;
  y: number;
}

export default class Enemy extends Character {
  constructor(args: CharacterConstructor) {
    super(args);
  }
}
