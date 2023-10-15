import Controls from '@/game/controls';
import Background from '@/entities/background';
import Map from '@/game/map';
import DeathParticlesSet from '@/game/death-particles-set';
import Projectiles from '@/game/projectiles';
import Player from '@/entities/player';
import Crosshair from '@/entities/crosshair';
import defaultMap from '@/maps/default';
import Enemies from './enemies';

interface Entity {
  update?: () => void;
  draw: () => void;
}

export default class Game {
  ctx: CanvasRenderingContext2D;
  animationRequestId!: number;
  entities: Entity[];

  constructor(selector: string) {
    const canvas = document.querySelector<HTMLCanvasElement>(selector)!;
    this.ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const controls = new Controls();
    const map = new Map({ ctx: this.ctx, config: defaultMap });
    const deathParticlesSet = new DeathParticlesSet({ ctx: this.ctx });
    const projectiles = new Projectiles({ ctx: this.ctx, map });
    const player = new Player({ ctx: this.ctx, controls, map, projectiles, deathParticlesSet });
    const enemies = new Enemies({ ctx: this.ctx, map, projectiles, deathParticlesSet, config: defaultMap });
    projectiles.setPlayer(player);
    projectiles.setEnemies(enemies);

    this.entities = [
      new Background({ ctx: this.ctx }),
      map,
      deathParticlesSet,
      projectiles,
      player,
      enemies,
      new Crosshair({ ctx: this.ctx, controls }),
    ];
  }

  start() {
    this.animationRequestId = window.requestAnimationFrame(this.start.bind(this));
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.entities.forEach((entity) => {
      if (entity.update) {
        entity.update();
      }
    });

    this.entities.forEach((entity) => {
      entity.draw();
    });
  }

  stop() {
    window.cancelAnimationFrame(this.animationRequestId);
  }
}
