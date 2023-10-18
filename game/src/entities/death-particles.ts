interface DeathParticlesConstructor {
  ctx: CanvasRenderingContext2D;
  color: string;
  x: number;
  y: number;
  onRemove: (item: DeathParticles) => void;
}

interface DeathParticle {
  color: string;
  x: number;
  y: number;
  radius: number;
  velocityX: number;
  velocityY: number;
}

export default class DeathParticles {
  #PARTICLE_MAX_VELOCITY = 10;
  deathParticles: DeathParticle[] = [];

  ctx: CanvasRenderingContext2D;
  onRemove: (item: DeathParticles) => void;

  constructor({ ctx, color, x, y, onRemove }: DeathParticlesConstructor) {
    this.ctx = ctx;
    this.deathParticles = Array.from({ length: 50 }).map(() => ({
      color,
      x,
      y,
      radius: Math.random() * 3 + 1,
      velocityX: Math.random() * 2 * this.#PARTICLE_MAX_VELOCITY - this.#PARTICLE_MAX_VELOCITY,
      velocityY: Math.random() * 2 * this.#PARTICLE_MAX_VELOCITY - this.#PARTICLE_MAX_VELOCITY,
    }));
    this.onRemove = onRemove;
  }

  update() {
    this.deathParticles = this.deathParticles.filter((particle) => {
      return particle.x >= 0 && particle.x <= this.ctx.canvas.width
      && particle.y >= 0 && particle.y <= this.ctx.canvas.height;
    }).map(particle => ({
      ...particle,
      x: particle.x + particle.velocityX,
      y: particle.y + particle.velocityY,
    }));

    if (!this.deathParticles.length) {
      this.onRemove(this);
    }
  }

  draw() {
    // @TODO:
  }
}
