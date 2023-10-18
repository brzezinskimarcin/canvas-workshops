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
  // @TODO: #ARC_OFFSET_ANGLE = ???;

  ctx: CanvasRenderingContext2D;
  controls: PlayerControls;

  constructor({ ctx, controls }: CrosshairConstructor) {
    this.controls = controls;
    this.ctx = ctx;
  }

  draw() {
    // @TODO:
  }

  drawCircle(radius: number, counterClockwise?: boolean) {
    // @TODO:
  }

  drawArc(startAngle: number) {
    // @TODO:
  }

  drawCrosshair() {
    // @TODO:
  }
}
