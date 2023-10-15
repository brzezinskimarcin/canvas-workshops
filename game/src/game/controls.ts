interface Point {
  x: number;
  y: number;
}

export default class Controls {
  #MAX_JUMPS = 2;

  mouseX = 0;
  mouseY = 0;
  keyLeft = false;
  keyRight = false;
  keyJump = false;
  shoot = false;
  jumps = 0;

  constructor() {
    window.addEventListener('mousemove', (event) => {
      this.mouseX = event.x;
      this.mouseY = event.y;
    });

    window.addEventListener('keydown', ({ code: keyCode }) => {
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
    });

    window.addEventListener('keyup', ({ code: keyCode }) => {
      switch (keyCode) {
        case 'KeyA':
          this.keyLeft = false;
          break;

        case 'KeyD':
          this.keyRight = false;
          break;
      }
    });

    window.addEventListener('click', () => {
      this.shoot = true;
    });
  }

  getAngle({ x, y }: Point) {
    return Math.atan2(
      this.mouseY - y,
      this.mouseX - x,
    );
  }
}
