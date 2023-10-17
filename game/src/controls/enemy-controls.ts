import type Player from '@/entities/player';
import type Enemy from '@/entities/enemy';
import type Map from '@/game/map';
import type { Point } from '@/controls/controls';

interface EnemyControlsConstructor {
  player: Player;
  enemy: Enemy;
  map: Map;
  walkingPath: Point[];
}

export default class EnemyControls {
  keyLeft = false;
  keyRight = false;
  keyJump = false;
  shoot = false;
  jumps = 0;

  player: Player;
  enemy: Enemy;
  map: Map;
  walkingPath: Point[];
  walkingPathStep = 0;
  back = false;

  shootTimeout = 0;
  changeDirectionTimeout = 0;

  constructor({ player, enemy, map, walkingPath }: EnemyControlsConstructor) {
    this.player = player;
    this.map = map;
    this.enemy = enemy;
    this.walkingPath = walkingPath;
  }

  updateControls() {
    this.updateShoot();
    this.updatePosition();
  }

  getAngle({ x, y }: Point) {
    return Math.atan2(
      this.player.y - y,
      this.player.x - x,
    );
  }

  checkIntersection() {
    return this.map.platforms.some(platform => platform.intersectsWith({
      startX: this.enemy.x + 32,
      startY: this.enemy.y + 32,
      endX: this.player.x + 32,
      endY: this.player.y + 32,
    }));
  }

  updateShoot() {
    if (!this.checkIntersection() && !this.shootTimeout) {
      this.shoot = true;
      this.shootTimeout = 60;
    }

    this.shootTimeout = Math.max(0, this.shootTimeout - 1);
  }

  updatePosition() {
    const targetX = this.walkingPath[this.walkingPathStep + (this.back ? -1 : 1)].x * 64;
    const enemyX = this.enemy.x;

    if (Math.abs(targetX - enemyX) <= 0.01) {
      if (this.back) {
        this.walkingPathStep--;
      } else {
        this.walkingPathStep++;
      }

      if (this.walkingPathStep === this.walkingPath.length - 1) {
        this.back = true;
        this.changeDirectionTimeout = 120;
      } else if (this.walkingPathStep === 0) {
        this.back = false;
        this.changeDirectionTimeout = 120;
      }
    } else {
      this.changeDirectionTimeout = Math.max(0, this.changeDirectionTimeout - 1);

      if (this.changeDirectionTimeout) {
        this.keyLeft = false;
        this.keyRight = false;
        return;
      }

      if (enemyX < targetX) {
        this.keyLeft = false;
        this.keyRight = true;
      } else {
        this.keyRight = false;
        this.keyLeft = true;
      }
    }
  }
}
