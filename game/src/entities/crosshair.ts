import type PlayerControls from '@/controls/player-controls';

interface CrosshairConstructor {
  ctx: CanvasRenderingContext2D;
  controls: PlayerControls;
}

export default class Crosshair {
  #DOT_RADIUS = 3;
  #DOT_OFFSET = 14;
  #CIRCLE_RADIUS = 24;
  #THICKNESS = 4;
  #STROKE_WIDTH = 3;
  #STROKE_COLOR = '#000000';
  #FILL_COLOR = '#a8b0b3';
  #ARC_OFFSET_ANGLE = Math.asin(this.#THICKNESS / (2 * (this.#CIRCLE_RADIUS - this.#THICKNESS / 2)));

  ctx: CanvasRenderingContext2D;
  controls: PlayerControls;

  constructor({ ctx, controls }: CrosshairConstructor) {
    this.controls = controls;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.beginPath();

    this.drawCircle(this.#DOT_RADIUS);
    this.drawCrosshair();
    this.drawCircle(this.#CIRCLE_RADIUS + this.#THICKNESS / 2, true);

    this.ctx.closePath();

    this.ctx.lineWidth = this.#STROKE_WIDTH;
    this.ctx.strokeStyle = this.#STROKE_COLOR;
    this.ctx.stroke();

    this.ctx.fillStyle = this.#FILL_COLOR;
    this.ctx.fill();
  }

  drawCircle(radius: number, counterClockwise?: boolean) {
    const { mouseX: x, mouseY: y } = this.controls;
    this.ctx.arc(
      x,
      y,
      radius,
      0,
      2 * Math.PI,
      counterClockwise,
    );
  }

  drawArc(startAngle: number) {
    const { mouseX: x, mouseY: y } = this.controls;

    this.ctx.arc(
      x,
      y,
      this.#CIRCLE_RADIUS - this.#THICKNESS / 2,
      startAngle + this.#ARC_OFFSET_ANGLE,
      startAngle + Math.PI / 2 - this.#ARC_OFFSET_ANGLE,
    );
  }

  drawCrosshair() {
    const { mouseX: x, mouseY: y } = this.controls;

    this.ctx.moveTo(x + this.#CIRCLE_RADIUS - this.#THICKNESS, y - this.#THICKNESS / 2);

    this.ctx.lineTo(x + this.#DOT_OFFSET, y - this.#THICKNESS / 2);
    this.ctx.lineTo(x + this.#DOT_OFFSET, y + this.#THICKNESS / 2);
    this.ctx.lineTo(x + this.#CIRCLE_RADIUS - this.#THICKNESS, y + this.#THICKNESS / 2);
    this.drawArc(0);

    this.ctx.lineTo(x + this.#THICKNESS / 2, y + this.#DOT_OFFSET);
    this.ctx.lineTo(x - this.#THICKNESS / 2, y + this.#DOT_OFFSET);
    this.ctx.lineTo(x - this.#THICKNESS / 2, y + this.#CIRCLE_RADIUS - this.#THICKNESS);
    this.drawArc(Math.PI / 2);

    this.ctx.lineTo(x - this.#DOT_OFFSET, y + this.#THICKNESS / 2);
    this.ctx.lineTo(x - this.#DOT_OFFSET, y - this.#THICKNESS / 2);
    this.ctx.lineTo(x - this.#CIRCLE_RADIUS + this.#THICKNESS, y - this.#THICKNESS / 2);
    this.drawArc(Math.PI);

    this.ctx.lineTo(x - this.#THICKNESS / 2, y - this.#DOT_OFFSET);
    this.ctx.lineTo(x + this.#THICKNESS / 2, y - this.#DOT_OFFSET);
    this.ctx.lineTo(x + this.#THICKNESS / 2, y - this.#CIRCLE_RADIUS + this.#THICKNESS);
    this.drawArc(3 * Math.PI / 2);

    this.ctx.moveTo(x + this.#CIRCLE_RADIUS, y);
  }
}
