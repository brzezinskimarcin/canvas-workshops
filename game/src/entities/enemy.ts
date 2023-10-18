import EnemyControls from '@/controls/enemy-controls';
import type { Point } from '@/controls/controls';
import Character, { type CharacterConstructor } from '@/entities/helpers/character';
import type Player from '@/entities//player';

export interface EnemyConfig {
  x: number;
  y: number;
  walkingPath: Point[];
}

export type EnemyConstructor = Omit<CharacterConstructor, 'controls'> & {
  player: Player;
  walkingPath: Point[];
};

export default class Enemy extends Character {
  #HEALTH_BAR_WIDTH = 64;
  #HEALTH_BAR_HEIGHT = 6;
  #HEALTH_BAR_RADIUS = 2;
  #HEALTH_BAR_OFFSET = 2;
  #HEALTH_BAR_STROKE = 1;
  #HEALTH_BAR_COLOR = 'rgb(187, 10, 30)';

  controls: EnemyControls;

  constructor(args: EnemyConstructor) {
    super(args as unknown as CharacterConstructor);

    this.controls = new EnemyControls({
      player: args.player,
      enemy: this,
      map: this.map,
      walkingPath: args.walkingPath,
    });
  }

  update() {
    this.controls.updateControls();
    super.update();
  }

  draw() {
    // @TODO:
  }
}
