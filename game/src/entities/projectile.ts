import type Sprite from '@/entities/helpers/sprite';
import type Map from '@/game/map';
import type Player from '@/entities/player';
import type Enemies from '@/game/enemies';

interface ProjectileConstructor {
  ctx: CanvasRenderingContext2D;
  map: Map;
  bullet: Sprite;
  player: Player;
  enemies: Enemies;
  x: number;
  y: number;
  angle: number;
  onRemove: (item: Projectile) => void;
}

export default class Projectile {
  #PROJECTILE_VELOCITY = 10;

  ctx: CanvasRenderingContext2D;
  map: Map;
  bullet: Sprite;
  player: Player;
  enemies: Enemies;
  x: number;
  y: number;
  angle: number;
  velocityX: number;
  velocityY: number;
  onRemove: (item: Projectile) => void;

  constructor({ ctx, map, bullet, player, enemies, x, y, angle, onRemove }: ProjectileConstructor) {
    this.ctx = ctx;
    this.map = map;
    this.bullet = bullet;
    this.player = player;
    this.enemies = enemies;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.velocityX = Math.cos(angle) * this.#PROJECTILE_VELOCITY;
    this.velocityY = Math.sin(angle) * this.#PROJECTILE_VELOCITY;
    this.onRemove = onRemove;
  }

  detectCollision() {
    this.map.platforms.forEach((platform) => {
      const { collisionX, collisionY } = platform.collidesWith({
        x: this.x,
        y: this.y,
        velocityX: this.velocityX,
        velocityY: this.velocityY,
        width: this.bullet.image.width,
        height: this.bullet.image.height,
      });

      if (collisionX || collisionY) {
        this.onRemove(this);
      }
    });

    [this.player, ...this.enemies.enemies].forEach((character) => {
      const collision = character.collidesWith({
        x: this.x,
        y: this.y,
        velocityX: this.velocityX,
        velocityY: this.velocityY,
        width: this.bullet.image.width,
        height: this.bullet.image.height,
      });

      if (collision) {
        character.damage();
        this.onRemove(this);
      }
    });
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    this.detectCollision();
  }

  draw() {
    // @TODO:
  }
}
