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
    super.draw();

    this.ctx.beginPath();
    this.ctx.roundRect(
      this.x,
      this.y - this.#HEALTH_BAR_HEIGHT - this.#HEALTH_BAR_OFFSET,
      this.health / this.MAX_HEALTH * this.#HEALTH_BAR_WIDTH,
      this.#HEALTH_BAR_HEIGHT,
      this.#HEALTH_BAR_RADIUS,
    );
    this.ctx.closePath();

    this.ctx.fillStyle = 'rgb(187, 10, 30)';
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.roundRect(
      this.x,
      this.y - this.#HEALTH_BAR_HEIGHT - this.#HEALTH_BAR_OFFSET,
      this.#HEALTH_BAR_WIDTH,
      this.#HEALTH_BAR_HEIGHT,
      this.#HEALTH_BAR_RADIUS,
    );
    this.ctx.closePath();

    this.ctx.strokeStyle = 'rgb(0, 0, 0)';
    this.ctx.lineWidth = this.#HEALTH_BAR_STROKE;
    this.ctx.stroke();

    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fill();
  }
}
