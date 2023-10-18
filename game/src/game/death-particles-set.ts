import DeathParticles from '@/entities/death-particles';

interface ProjectilesConstructor {
  ctx: CanvasRenderingContext2D;
}

interface AddDeathParticles {
  color: string;
  x: number;
  y: number;
}

export default class DeathParticlesSet {
  ctx: CanvasRenderingContext2D;
  deathParticles: DeathParticles[] = [];

  constructor({ ctx }: ProjectilesConstructor) {
    this.ctx = ctx;
  }

  update() {
    this.deathParticles.forEach(deathParticle => deathParticle.update());
  }

  draw() {
    // @TODO:
  }

  addDeathParticles({ color, x, y }: AddDeathParticles) {
    this.deathParticles.push(new DeathParticles({
      ctx: this.ctx,
      color,
      x,
      y,
      onRemove: (item: DeathParticles) => {
        this.deathParticles.splice(this.deathParticles.indexOf(item), 1);
      },
    }));
  }
}
