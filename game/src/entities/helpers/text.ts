interface TextConstructor {
  ctx: CanvasRenderingContext2D;
}

interface DrawArgs {
  content: string;
  fontSize: number;
  x?: number | ((width: number) => number);
  y?: number | ((width: number) => number);
}

export default class Text {
  ctx: CanvasRenderingContext2D;

  constructor({ ctx }: TextConstructor) {
    this.ctx = ctx;
  }

  draw({ content, fontSize, x, y }: DrawArgs) {
    this.ctx.font = `600 ${fontSize}px Arial`;
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    this.ctx.strokeStyle = 'rgb(0, 0, 0)';
    this.ctx.lineWidth = fontSize / 6;
    const { width } = this.ctx.measureText(content);
    const startX = typeof x === 'function' ? x(width) : (x || 0);
    const startY = typeof y === 'function' ? y(width) : (y || 0);
    this.ctx.strokeText(
      content,
      startX,
      startY,
    );
    this.ctx.fillText(
      content,
      startX,
      startY,
    );

    return width;
  }
}
