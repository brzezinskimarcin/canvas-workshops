import Sprite from '@/entities/helpers/sprite';
import Text from '@/entities/helpers/text';
import Enemy from '@/entities/enemy';
import type { MapConfig } from '@/game/map';
import type Map from '@/game/map';
import type DeathParticlesSet from '@/game/death-particles-set';
import type Projectiles from '@/game/projectiles';
import type Player from '@/entities/player';
import enemyBody from '@/assets/enemy-body.png';
import enemyFoot from '@/assets/enemy-foot.png';
import enemyEyesOpen from '@/assets/enemy-eyes-open.png';
import eyesClosed from '@/assets/eyes-closed.png';
import gun from '@/assets/gun.png';
import enemy from '@/assets/enemy.png';

interface EnemiesConstructor {
  ctx: CanvasRenderingContext2D;
  map: Map;
  projectiles: Projectiles;
  deathParticlesSet: DeathParticlesSet;
  config: MapConfig;
  player: Player;
  onDestroyedAllEnemies: () => void;
}

export default class Enemies {
  ctx: CanvasRenderingContext2D;
  map: Map;
  projectiles: Projectiles;
  bodyParts: Record<string, Sprite>;
  enemies: Enemy[];
  enemySprite: Sprite;
  text: Text;
  onDestroyedAllEnemies: () => void;

  constructor({ ctx, map, projectiles, deathParticlesSet, config, player, onDestroyedAllEnemies }: EnemiesConstructor) {
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
    this.onDestroyedAllEnemies = onDestroyedAllEnemies;
    this.enemySprite = new Sprite({ ctx, url: enemy });
    this.text = new Text({ ctx });
    this.enemies = config.enemies.map(({ x, y, walkingPath }) => new Enemy({
      ctx: this.ctx,
      bodyParts: this.bodyParts,
      map: this.map,
      projectiles: this.projectiles,
      player,
      walkingPath,
      x: x * 64,
      y: ctx.canvas.height - y * 64,
      onRemove: (item) => {
        this.enemies.splice(this.enemies.indexOf(item as Enemy), 1);

        deathParticlesSet.addDeathParticles({
          color: 'rgb(67, 176, 42)',
          x: item.x,
          y: item.y,
        });
      },
    }));
  }

  update() {
    if (this.enemies.length) {
      this.enemies.forEach(enemy => enemy.update());
    } else {
      this.onDestroyedAllEnemies();
    }
  }

  draw() {
    this.enemies.forEach(enemy => enemy.draw());

    const textWidth = this.text.draw({
      content: `x${this.enemies.length}`,
      fontSize: 36,
      x: textWidth => this.ctx.canvas.width - textWidth - 32,
      y: 48,
    });

    this.enemySprite.draw({
      destinationX: this.ctx.canvas.width - textWidth - 32 - this.enemySprite.width - 12,
      destinationY: this.enemySprite.height / 2 - 9,
    });
  }
}
