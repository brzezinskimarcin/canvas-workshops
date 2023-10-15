import type Controls from '@/game/controls';
import type Map from '@/game/map';
import type Projectiles from '@/game/projectiles';
import type Sprite from '@/entities/helpers/sprite';

export interface CharacterConstructor {
  ctx: CanvasRenderingContext2D;
  controls: Controls;
  map: Map;
  projectiles: Projectiles;
  bodyParts: Record<string, Sprite>;
  x: number;
  y: number;
  onRemove: (item: Character) => void;
}

interface CollidesParams {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  width: number;
  height: number;
}

export default abstract class Character {
  #GRAVITY = 0.5;
  #CHARACTER_VELOCITY = 8;
  #JUMP_VELOCITY = 12.5;
  #FEET_OFFSET = 10;
  #EYES_OFFSET = 4;
  #WALKING_ANIMATION_FRAMES = 15;
  #PLAYER_WIDTH = 64;
  #GUN_DAMAGE = 25;
  MAX_HEALTH = 100;

  ctx: CanvasRenderingContext2D;
  controls: Controls;
  map: Map;
  projectiles: Projectiles;
  bodyParts: Record<string, Sprite>;
  x: number;
  y: number;
  onRemove: (item: Character) => void;
  angle = 0;
  centerX = 0;
  centerY = 0;
  velocityX = 0;
  velocityY = 0;
  health = this.MAX_HEALTH;

  walkingAnimation = -1;
  damagedAnimation = 0;

  constructor({ ctx, controls, map, projectiles, bodyParts, x, y, onRemove }: CharacterConstructor) {
    this.ctx = ctx;
    this.controls = controls;
    this.map = map;
    this.projectiles = projectiles;
    this.bodyParts = bodyParts;
    this.x = x;
    this.y = y;
    this.onRemove = onRemove;
  }

  interpretControls() {
    if (this.controls.keyLeft) {
      this.velocityX = -this.#CHARACTER_VELOCITY;
    } else if (this.controls.keyRight) {
      this.velocityX = this.#CHARACTER_VELOCITY;
    } else {
      this.velocityX = 0;
      this.walkingAnimation = -1;
    }

    if (this.controls.keyJump) {
      this.velocityY = -this.#JUMP_VELOCITY;
      this.controls.keyJump = false;
      this.walkingAnimation = -1;
    }

    if (this.controls.shoot) {
      this.controls.shoot = false;
      this.projectiles.addProjectile({
        x: this.centerX,
        y: this.centerY,
        angle: this.angle,
      });
    }
  }

  getPlayerBoundingRect() {
    return {
      x: this.#PLAYER_WIDTH / 4 + this.x,
      y: this.#PLAYER_WIDTH / 8 + this.y,
      velocityX: this.velocityX,
      velocityY: this.velocityY,
      width: this.#PLAYER_WIDTH / 2,
      height: 3 * this.#PLAYER_WIDTH / 4,
    };
  }

  collidesWith({ x, y, velocityX, velocityY, width, height }: CollidesParams) {
    let collision = false;

    const {
      x: tileX,
      y: tileY,
      width: tileWidth,
      height: tileHeight,
    } = {
      x: this.x,
      y: this.y,
      width: this.#PLAYER_WIDTH,
      height: this.#PLAYER_WIDTH,
    };

    if (x + width >= tileX && x <= tileX + tileWidth) {
      collision ||= y + height <= tileY && y + height + velocityY >= tileY;
      collision ||= y >= tileY + tileHeight && y + velocityY <= tileY + tileHeight;
    }

    if (y + height >= tileY && y <= tileY + tileHeight) {
      collision ||= x + width <= tileX && x + width + velocityX >= tileX;
      collision ||= x >= tileX + tileWidth && x + velocityX <= tileX + tileWidth;
    }

    return collision;
  }

  damage() {
    this.health -= this.#GUN_DAMAGE;
    this.damagedAnimation = 60;
  }

  detectCollision() {
    this.map.platforms.forEach((platform) => {
      const { collisionX, collisionY } = platform.collidesWith(this.getPlayerBoundingRect());
      if (collisionX) {
        this.velocityX = 0;
      }

      if (collisionY) {
        this.velocityY = 0;
        this.controls.jumps = 0;
        if (this.walkingAnimation === -1) {
          this.walkingAnimation = 0;
        }
      }
    });
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.velocityY += this.#GRAVITY;

    this.angle = this.controls.getAngle({
      x: this.centerX,
      y: this.centerY,
    });

    this.centerX = this.x + this.#PLAYER_WIDTH / 2;
    this.centerY = this.y + this.#PLAYER_WIDTH / 2;

    if (this.walkingAnimation > -1) {
      this.walkingAnimation = (this.walkingAnimation + 1) % this.#WALKING_ANIMATION_FRAMES;
    }

    this.interpretControls();
    this.detectCollision();
  }

  animateWalking(framesDelayed: number, callback: () => void) {
    if (this.walkingAnimation > -1 && (this.controls.keyLeft || this.controls.keyRight)) {
      this.ctx.translate(this.centerX, this.centerY);
      const direction = this.controls.keyLeft ? -1 : 1;
      const frame = (this.walkingAnimation + framesDelayed) % this.#WALKING_ANIMATION_FRAMES;
      this.ctx.rotate(direction * frame * Math.PI / 60);
      this.ctx.translate(-this.centerX, -this.centerY);
    }

    callback();
    this.ctx.resetTransform();
  }

  draw() {
    this.bodyParts.gun.rotate({
      angle: this.angle,
      x: this.centerX,
      y: this.centerY,
      callback: () => {
        this.bodyParts.gun.draw({
          destinationX: this.centerX,
          destinationY: this.centerY,
        });
      },
    });

    this.animateWalking(5, () => {
      this.bodyParts.foot.draw({
        destinationX: this.centerX - this.bodyParts.foot.width / 2 - this.#FEET_OFFSET,
        destinationY: this.y + this.#PLAYER_WIDTH - this.bodyParts.foot.height,
      });
    });

    this.bodyParts.body.draw({
      destinationX: this.x,
      destinationY: this.y,
    });

    const offsetX = this.#EYES_OFFSET * Math.sin(Math.PI / 2 - this.angle);
    const offsetY = this.#EYES_OFFSET * Math.cos(Math.PI / 2 - this.angle);

    if (this.health <= 0 || this.y - 20 >= this.ctx.canvas.height) {
      this.onRemove(this);
    } else if (this.damagedAnimation) {
      this.damagedAnimation--;
      this.bodyParts.eyesClosed.draw({
        destinationX: this.centerX + offsetX - this.bodyParts.eyesClosed.width / 2,
        destinationY: this.centerY + offsetY - this.bodyParts.eyesClosed.height / 2,
      });
    } else {
      this.bodyParts.eyesOpen.draw({
        destinationX: this.centerX + offsetX - this.bodyParts.eyesOpen.width / 2,
        destinationY: this.centerY + offsetY - this.bodyParts.eyesOpen.height / 2,
      });
    }

    this.animateWalking(0, () => {
      this.bodyParts.foot.draw({
        destinationX: this.centerX - this.bodyParts.foot.width / 2 + this.#FEET_OFFSET,
        destinationY: this.y + this.#PLAYER_WIDTH - this.bodyParts.foot.height,
      });
    });
  }
}
