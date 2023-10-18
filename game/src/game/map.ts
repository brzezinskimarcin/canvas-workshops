import Sprite from '@/entities/helpers/sprite';
import Platform, { type PlatformConfig } from '@/entities/platform';
import type { EnemyConfig } from '@/entities/enemy';
import platformsTileset from '@/assets/platforms-tileset.png';

export interface MapConfig {
  platforms: PlatformConfig[];
  enemies: EnemyConfig[];
}

interface MapConstructor {
  ctx: CanvasRenderingContext2D;
  config: MapConfig;
}

export default class Map {
  ctx: CanvasRenderingContext2D;
  platforms: Platform[];
  platformTileset: Sprite;

  constructor({ ctx, config }: MapConstructor) {
    this.ctx = ctx;
    this.platformTileset = new Sprite({
      ctx,
      x: 0,
      y: 0,
      width: 64,
      height: 64,
      url: platformsTileset,
    });

    this.platforms = config.platforms.map(platformConfig => new Platform({
      ctx: this.ctx,
      platformTileset: this.platformTileset,
      ...platformConfig,
    }));
  }

  draw() {
    // @TODO:
  }
}
