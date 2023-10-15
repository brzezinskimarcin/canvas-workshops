import Sprite from '@/entities/helpers/sprite';
import Projectile from '@/entities/projectile';
import type Map from '@/game/map';
import bullet from '@/assets/bullet.png';
import type Player from '@/entities/player';
import type Enemies from '@/game/enemies';

interface ProjectilesConstructor {
  ctx: CanvasRenderingContext2D;
  map: Map;
}

interface AddProjectileArgs {
  x: number;
  y: number;
  angle: number;
}

export default class Projectiles {
  ctx: CanvasRenderingContext2D;
  map: Map;
  bullet: Sprite;
  player!: Player;
  enemies!: Enemies;
  projectiles: Projectile[] = [];

  constructor({ ctx, map }: ProjectilesConstructor) {
    this.ctx = ctx;
    this.map = map;
    this.bullet = new Sprite({
      ctx,
      url: bullet,
    });
  }

  update() {
    this.projectiles.forEach(projectile => projectile.update());
  }

  draw() {
    this.projectiles.forEach(projectile => projectile.draw());
  }

  addProjectile({ x, y, angle }: AddProjectileArgs) {
    this.projectiles.push(new Projectile({
      ctx: this.ctx,
      map: this.map,
      player: this.player,
      enemies: this.enemies,
      bullet: this.bullet,
      x,
      y,
      angle,
      onRemove: (item: Projectile) => {
        this.projectiles.splice(this.projectiles.indexOf(item), 1);
      },
    }));
  }

  setPlayer(player: Player) {
    this.player = player;
  }

  setEnemies(enemies: Enemies) {
    this.enemies = enemies;
  }
}
