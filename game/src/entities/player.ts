import Character, { type CharacterConstructor } from '@/entities/helpers/character';
import type DeathParticlesSet from '@/game/death-particles-set';
import Sprite from '@/entities/helpers/sprite';
import playerBody from '@/assets/player-body.png';
import playerFoot from '@/assets/player-foot.png';
import playerEyesOpen from '@/assets/player-eyes-open.png';
import eyesClosed from '@/assets/eyes-closed.png';
import gun from '@/assets/gun.png';

export type PlayerConstructor = Omit<CharacterConstructor, 'bodyParts' | 'onRemove' | 'x' | 'y'> & {
  deathParticlesSet: DeathParticlesSet;
  onDeath: () => void;
};

export default class Player extends Character {
  #HEALTH_BAR_WIDTH = 512;
  #HEALTH_BAR_HEIGHT = 24;
  #HEALTH_BAR_RADIUS = 8;
  #HEALTH_BAR_STROKE = 2;
  #HEALTH_BAR_OFFSET = 24;
  #HEALTH_BAR_COLOR = 'rgb(187, 10, 30)';

  constructor(args: PlayerConstructor) {
    super({
      ...args,
      x: 64,
      y: args.ctx.canvas.height - 7 * 64,
      bodyParts: {
        body: new Sprite({ ctx: args.ctx, url: playerBody }),
        foot: new Sprite({ ctx: args.ctx, url: playerFoot }),
        eyesOpen: new Sprite({ ctx: args.ctx, url: playerEyesOpen }),
        eyesClosed: new Sprite({ ctx: args.ctx, url: eyesClosed }),
        gun: new Sprite({ ctx: args.ctx, url: gun }),
      },
      onRemove: (item) => {
        args.deathParticlesSet.addDeathParticles({
          color: 'rgb(223, 223, 223)',
          x: item.x,
          y: item.y,
        });
        args.onDeath();
      },
    });
  }

  draw() {
    // @TODO:
  }
}
