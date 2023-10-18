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
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;

  constructor({ ctx, x, y, width, height, url }: SpriteConstructor) {
    this.image = new Image();
    this.image.src = url;
    this.ctx = ctx;
    this.width = width || this.image.width;
    this.height = height || this.image.height;
    this.x = typeof x === 'function' ? x(this.width) : (x || 0);
    this.y = typeof y === 'function' ? y(this.height) : (y || 0);
  }

  draw({ sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight }: DrawArgs = {}) {
    // @TODO:
  }

  rotate({ angle, x, y, callback }: RotateArgs) {
    // @TODO:
  }
}
