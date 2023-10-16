import type Sprite from '@/entities/helpers/sprite';
import { PLATFORM_TILE_MAPPING, type PlatformTileType } from '@/utils';

interface PlatformConstructor {
  ctx: CanvasRenderingContext2D;
  platformTileset: Sprite;
  x: number;
  y: number;
  tiles: PlatformTileType[][];
}

interface CollidesParams {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  width: number;
  height: number;
}

interface IntersectsParams {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export type PlatformConfig = Pick<PlatformConstructor, 'tiles' | 'x' | 'y'>;

export default class Platform {
  #TILE_WIDTH = 64;

  x: number;
  y: number;
  tiles: PlatformTileType[][];

  ctx: CanvasRenderingContext2D;
  platformTileset: Sprite;

  constructor({ ctx, platformTileset, x, y, tiles }: PlatformConstructor) {
    this.ctx = ctx;
    this.x = x * this.#TILE_WIDTH;
    this.y = ctx.canvas.height - y * this.#TILE_WIDTH;
    this.platformTileset = platformTileset;
    this.tiles = tiles;
  }

  draw() {
    this.tiles.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        const [spriteX, spriteY] = PLATFORM_TILE_MAPPING[column];
        this.platformTileset.draw({
          sourceX: spriteX * this.#TILE_WIDTH,
          sourceY: spriteY * this.#TILE_WIDTH,
          sourceWidth: this.#TILE_WIDTH,
          sourceHeight: this.#TILE_WIDTH,
          destinationX: this.#TILE_WIDTH * columnIndex + this.x,
          destinationY: this.#TILE_WIDTH * rowIndex + this.y,
          destinationWidth: this.#TILE_WIDTH,
          destinationHeight: this.#TILE_WIDTH,
        });
      });
    });
  }

  collidesWith({ x, y, velocityX, velocityY, width, height }: CollidesParams) {
    let collisionX = false;
    let collisionY = false;

    this.tiles.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        if (column === 'EMPTY') {
          return;
        }

        const tileX = this.#TILE_WIDTH * columnIndex + this.x;
        const tileY = this.#TILE_WIDTH * rowIndex + this.y;
        const tileWidth = this.#TILE_WIDTH;
        const tileHeight = this.#TILE_WIDTH;

        if (x + width >= tileX && x <= tileX + tileWidth) {
          collisionY ||= y + height <= tileY && y + height + velocityY >= tileY;
          collisionY ||= y >= tileY + tileHeight && y + velocityY <= tileY + tileHeight;
        }

        if (y + height >= tileY && y <= tileY + tileHeight) {
          collisionX ||= x + width <= tileX && x + width + velocityX >= tileX;
          collisionX ||= x >= tileX + tileWidth && x + velocityX <= tileX + tileWidth;
        }
      });
    });

    return { collisionX, collisionY };
  }

  intersectsWith({ startX: a, startY: b, endX: c, endY: d }: IntersectsParams) {
    return this.tiles.some((row, rowIndex) => {
      return row.some((column, columnIndex) => {
        if (column === 'EMPTY') {
          return false;
        }

        const x1 = this.#TILE_WIDTH * columnIndex + this.x;
        const y1 = this.#TILE_WIDTH * rowIndex + this.y;
        const x2 = x1 + this.#TILE_WIDTH;
        const y2 = y1 + this.#TILE_WIDTH;

        return [
          [x1, y1, x2, y1],
          [x2, y1, x2, y2],
          [x2, y2, x1, y2],
          [x1, y2, x1, y1],
        ].some(([p, q, r, s]) => {
          const det = (c - a) * (s - q) - (r - p) * (d - b);
          if (det === 0) {
            return false;
          } else {
            const lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
            const gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
            return (lambda > -0.01 && lambda < 1.01) && (gamma > -0.01 && gamma < 1.01);
          }
        });
      });
    });
  }
}
