import type { MapConfig } from '@/game/map';

const defaultMap: MapConfig = {
  platforms: [
    {
      x: 1,
      y: 5,
      tiles: [
        ['LEFT_TOP_GRASS', 'TOP_GRASS', 'TOP_GRASS', 'RIGHT_TOP_GRASS'],
        ['LEFT_DIRT', 'INNER_SKELETON_1_LEFT_TOP', 'INNER_SKELETON_1_RIGHT_TOP', 'RIGHT_DIRT'],
        ['LEFT_DIRT', 'INNER_SKELETON_1_LEFT_BOTTOM', 'INNER_SKELETON_1_RIGHT_BOTTOM', 'RIGHT_DIRT'],
        ['LEFT_BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'RIGHT_BOTTOM_DIRT'],
      ],
    },

    {
      x: 8,
      y: 9,
      tiles: [
        ['EMPTY', 'EMPTY', 'EMPTY', 'LEFT_TOP_ROUNDED_GRASS', 'TOP_GRASS', 'RIGHT_TOP_GRASS'],
        ['LEFT_TOP_GRASS', 'TOP_GRASS', 'TOP_GRASS', 'INNER_GRASS_RIGHT_BOTTOM', 'INNER_BONE_5', 'RIGHT_DIRT'],
        ['LEFT_BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'RIGHT_BOTTOM_DIRT'],
      ],
    },
  ],
  enemies: [
    {
      x: 8,
      y: 9,
    },
  ],
};

export default defaultMap;
