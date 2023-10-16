import type { Point } from '@/controls/controls';

export default class PlayerControls {
  #MAX_JUMPS = 2;

  mouseX = 0;
  mouseY = 0;
  keyLeft = false;
  keyRight = false;
  keyJump = false;
  shoot = false;
  jumps = 0;
  mouseMoveEventListenerBound = this.mouseMoveEventListener.bind(this);
  keyDownEventListenerBound = this.keyDownEventListener.bind(this);
  keyUpEventListenerBound = this.keyUpEventListener.bind(this);
  clickEventListenerBound = this.clickEventListener.bind(this);

  constructor() {
    window.addEventListener('mousemove', this.mouseMoveEventListenerBound);
    window.addEventListener('keydown', this.keyDownEventListenerBound);
    window.addEventListener('keyup', this.keyUpEventListenerBound);
    window.addEventListener('click', this.clickEventListenerBound);
  }

  cleanup() {
    window.removeEventListener('mousemove', this.mouseMoveEventListenerBound);
    window.removeEventListener('keydown', this.keyDownEventListenerBound);
    window.removeEventListener('keyup', this.keyUpEventListenerBound);
    window.removeEventListener('click', this.clickEventListenerBound);
  }

  getAngle({ x, y }: Point) {
    return Math.atan2(
      this.mouseY - y,
      this.mouseX - x,
    );
  }

  mouseMoveEventListener(event: MouseEvent) {
    this.mouseX = event.x;
    this.mouseY = event.y;
  }

  keyDownEventListener({ code: keyCode }: KeyboardEvent) {
    switch (keyCode) {
      case 'KeyA':
        this.keyLeft = true;
        break;

      case 'KeyD':
        this.keyRight = true;
        break;

      case 'Space':
        if (this.jumps < this.#MAX_JUMPS) {
          this.keyJump = true;
          this.jumps++;
        }
        break;
    }
  }

  keyUpEventListener({ code: keyCode }: KeyboardEvent) {
    switch (keyCode) {
      case 'KeyA':
        this.keyLeft = false;
        break;

      case 'KeyD':
        this.keyRight = false;
        break;
    }
  }

  clickEventListener() {
    this.shoot = true;
  }
}
