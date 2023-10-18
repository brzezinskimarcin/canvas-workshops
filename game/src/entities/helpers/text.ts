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
    // @TODO:
  }
}
