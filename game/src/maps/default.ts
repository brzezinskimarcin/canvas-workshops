import type { MapConfig } from '@/game/map';

const defaultMap: MapConfig = {
  platforms: [
    {
      x: 1,
      y: 6,
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
        ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'LEFT_TOP_ROUNDED_GRASS', 'TOP_GRASS', 'RIGHT_TOP_GRASS'],
        ['LEFT_TOP_GRASS', 'TOP_GRASS', 'TOP_GRASS', 'TOP_GRASS', 'INNER_GRASS_RIGHT_BOTTOM', 'INNER_BONE_5', 'RIGHT_DIRT'],
        ['LEFT_BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'RIGHT_BOTTOM_DIRT'],
      ],
    },
    {
      x: 18,
      y: 4,
      tiles: [
        ['LEFT_TOP_GRASS', 'TOP_GRASS', 'TOP_GRASS', 'TOP_GRASS', 'TOP_GRASS', 'RIGHT_TOP_GRASS'],
        ['LEFT_DIRT', 'INNER_BONE_4', 'INNER', 'INNER_BONE_5', 'INNER', 'RIGHT_DIRT'],
        ['LEFT_BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'RIGHT_BOTTOM_DIRT'],
      ],
    },
    {
      x: 28,
      y: 8,
      tiles: [
        ['EMPTY', 'EMPTY', 'SINGLE_WIDTH_TOP', 'EMPTY', 'SINGLE_WIDTH_TOP', 'EMPTY', 'SINGLE_WIDTH_TOP', 'EMPTY', 'SINGLE_WIDTH_TOP'],
        ['EMPTY', 'EMPTY', 'SINGLE_WIDTH_INNER', 'EMPTY', 'SINGLE_WIDTH_INNER', 'EMPTY', 'SINGLE_WIDTH_INNER', 'EMPTY', 'SINGLE_WIDTH_INNER'],
        ['EMPTY', 'EMPTY', 'SINGLE_WIDTH_BOTTOM', 'EMPTY', 'SINGLE_WIDTH_BOTTOM', 'EMPTY', 'SINGLE_WIDTH_BOTTOM', 'EMPTY', 'SINGLE_WIDTH_BOTTOM'],
        ['LEFT_TOP_GRASS', 'RIGHT_TOP_ROUNDED_GRASS', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'LEFT_TOP_ROUNDED_GRASS', 'RIGHT_TOP_GRASS'],
        ['LEFT_DIRT', 'INNER_GRASS_LEFT_BOTTOM', 'TOP_GRASS', 'TOP_GRASS', 'TOP_GRASS', 'TOP_GRASS', 'TOP_GRASS', 'TOP_GRASS', 'TOP_GRASS', 'INNER_GRASS_RIGHT_BOTTOM', 'RIGHT_DIRT'],
        ['LEFT_BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'BOTTOM_DIRT', 'RIGHT_BOTTOM_DIRT'],
      ],
    },
  ],
  enemies: [
    {
      x: 8,
      y: 10,
      walkingPath: [
        { x: 8, y: 9 },
        { x: 9, y: 9 },
        { x: 10, y: 9 },
        { x: 11, y: 9 },
      ],
    },
    {
      x: 18,
      y: 5,
      walkingPath: [
        { x: 18, y: 4 },
        { x: 19, y: 4 },
        { x: 20, y: 4 },
        { x: 21, y: 4 },
        { x: 22, y: 4 },
        { x: 23, y: 4 },
      ],
    },
    {
      x: 30,
      y: 5,
      walkingPath: [
        { x: 30, y: 5 },
        { x: 31, y: 5 },
        { x: 32, y: 5 },
        { x: 33, y: 5 },
        { x: 34, y: 5 },
        { x: 35, y: 5 },
        { x: 36, y: 5 },
      ],
    },
  ],
};

export default defaultMap;
