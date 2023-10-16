export interface Point {
  x: number;
  y: number;
}

export interface Controls {
  keyLeft: boolean;
  keyRight: boolean;
  keyJump: boolean;
  shoot: boolean;
  jumps: number;
  getAngle(point: Point): number;
}
