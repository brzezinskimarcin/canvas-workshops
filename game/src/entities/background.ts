import Sprite from '@/entities/helpers/sprite';
import cloud1 from '@/assets/cloud-1.png';
import cloud2 from '@/assets/cloud-2.png';
import cloud3 from '@/assets/cloud-3.png';

interface BackgroundConstructor {
  ctx: CanvasRenderingContext2D;
}

export default class Background {
  #BG_START = '#536d9c';
  #BG_END = '#a5b2cb';
  #CLOUD_VELOCITIES = [0.25, 0.15, 0.3];

  clouds: Sprite[];
  ctx: CanvasRenderingContext2D;

  constructor({ ctx }: BackgroundConstructor) {
    this.ctx = ctx;
    this.clouds = [
      new Sprite({
        ctx,
        url: cloud1,
        x: 50,
        y: 50,
      }),

      new Sprite({
        ctx,
        url: cloud2,
        x: cloudWidth => this.ctx.canvas.width - cloudWidth,
        y: cloudHeight => (this.ctx.canvas.height - cloudHeight) / 2,
      }),

      new Sprite({
        ctx,
        url: cloud3,
        x: cloudWidth => (this.ctx.canvas.width - cloudWidth) / 2,
        y: cloudHeight => this.ctx.canvas.height - 2 * cloudHeight,
      }),
    ];
  }

  update() {
    this.clouds.forEach((cloud, i) => {
      cloud.x = cloud.x >= -cloud.width ? cloud.x - this.#CLOUD_VELOCITIES[i] : this.ctx.canvas.width;
    });
  }

  draw() {
    // @TODO:
  }

  drawGradient() {
    // @TODO:
  }
}
