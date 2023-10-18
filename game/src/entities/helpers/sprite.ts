interface SpriteConstructor {
  ctx: CanvasRenderingContext2D;
  x?: number | ((width: number) => number);
  y?: number | ((height: number) => number);
  width?: number;
  height?: number;
  url: string;
}

interface DrawArgs {
  sourceX?: number;
  sourceY?: number;
  sourceWidth?: number;
  sourceHeight?: number;
  destinationX?: number;
  destinationY?: number;
  destinationWidth?: number;
  destinationHeight?: number;
}

interface RotateArgs {
  angle: number;
  x: number;
  y: number;
  callback: () => void;
}

export default class Sprite {
  ctx: CanvasRenderingContext2D;
  x!: number;
  y!: number;
  width!: number;
  height!: number;
  image: HTMLImageElement;

  constructor({ ctx, x, y, width, height, url }: SpriteConstructor) {
    this.image = new Image();
    this.image.src = url;
    this.ctx = ctx;
    this.image.onload = () => {
      this.width = width || this.image.width;
      this.height = height || this.image.height;
      this.x = typeof x === 'function' ? x(this.width) : (x || 0);
      this.y = typeof y === 'function' ? y(this.height) : (y || 0);
    };
  }

  draw({ sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight }: DrawArgs = {}) {
    this.ctx.drawImage(
      this.image,
      sourceX || 0,
      sourceY || 0,
      sourceWidth || this.image.width,
      sourceHeight || this.image.height,
      destinationX || this.x,
      destinationY || this.y,
      destinationWidth || this.width,
      destinationHeight || this.height,
    );
  }

  rotate({ angle, x, y, callback }: RotateArgs) {
    this.ctx.translate(x, y);
    if (Math.abs(angle) >= Math.PI / 2) {
      this.ctx.scale(-1, 1);
      this.ctx.rotate(Math.PI - angle);
    } else {
      this.ctx.rotate(angle);
    }
    this.ctx.translate(-x, -y);

    callback();

    this.ctx.resetTransform();
  }
}
