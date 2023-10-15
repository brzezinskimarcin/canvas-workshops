import Sprite from '@/entities/helpers/sprite';
import Enemy from '@/entities/enemy';
import type { MapConfig } from '@/game/map';
import type Map from '@/game/map';
import type DeathParticlesSet from '@/game/death-particles-set';
import type Projectiles from '@/game/projectiles';
import enemyBody from '@/assets/enemy-body.png';
import enemyFoot from '@/assets/enemy-foot.png';
import enemyEyesOpen from '@/assets/enemy-eyes-open.png';
import eyesClosed from '@/assets/eyes-closed.png';
import gun from '@/assets/gun.png';

interface EnemiesConstructor {
  ctx: CanvasRenderingContext2D;
  map: Map;
  projectiles: Projectiles;
  deathParticlesSet: DeathParticlesSet;
  config: MapConfig;
}

export default class Enemies {
  ctx: CanvasRenderingContext2D;
  map: Map;
  projectiles: Projectiles;
  bodyParts: Record<string, Sprite>;
  enemies: Enemy[];

  constructor({ ctx, map, projectiles, deathParticlesSet, config }: EnemiesConstructor) {
    this.ctx = ctx;
    this.map = map;
    this.projectiles = projectiles;
    this.bodyParts = {
      body: new Sprite({ ctx, url: enemyBody }),
      foot: new Sprite({ ctx, url: enemyFoot }),
      eyesOpen: new Sprite({ ctx, url: enemyEyesOpen }),
      eyesClosed: new Sprite({ ctx, url: eyesClosed }),
      gun: new Sprite({ ctx, url: gun }),
    };
    this.enemies = config.enemies.map(({ x, y }) => new Enemy({
      ctx: this.ctx,
      controls: {
        getAngle() {
          return 0;
        },
      },
      bodyParts: this.bodyParts,
      map: this.map,
      projectiles: this.projectiles,
      x: x * 64,
      y: y * 64,
      onRemove: (item) => {
        this.enemies.splice(this.enemies.indexOf(item));

        deathParticlesSet.addDeathParticles({
          color: 'rgb(168, 176, 179)',
          x: item.x,
          y: item.y,
        });
      },
    }));
  }

  update() {
    this.enemies.forEach(enemy => enemy.update());
  }

  draw() {
    this.enemies.forEach(enemy => enemy.draw());
  }
}
