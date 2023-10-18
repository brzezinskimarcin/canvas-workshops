import PlayerControls from '@/controls/player-controls';
import Background from '@/entities/background';
import Map from '@/game/map';
import DeathParticlesSet from '@/game/death-particles-set';
import Projectiles from '@/game/projectiles';
import Player from '@/entities/player';
import Crosshair from '@/entities/crosshair';
import Text from '@/entities/helpers/text';
import defaultMap from '@/maps/default';
import Enemies from './enemies';

interface Entity {
  update?: () => void;
  draw: () => void;
}

interface ShowWelcomeScreenArgs {
  title: string;
  subtitle: string;
}

export default class Game {
  #TITLE_FONT_SIZE = 60;
  #TITLE_OFFSET = -48;
  #SUBTITLE_FONT_SIZE = 36;
  #SUBTITLE_OFFSET = 16;

  ctx!: CanvasRenderingContext2D;
  animationRequestId!: number;
  entities!: Entity[];
  playerControls?: PlayerControls;
  text: Text;

  constructor(selector: string) {
    // @TODO:
    this.text = new Text({ ctx: this.ctx });

    document.addEventListener('keydown', ({ code: keyCode }) => {
      if (keyCode === 'KeyR') {
        window.cancelAnimationFrame(this.animationRequestId);
        this.playerControls?.cleanup();
        this.initGame();
        this.start();
      }
    });

    this.initGame();
    this.start();
  }

  initGame() {
    this.playerControls = new PlayerControls();
    const background = new Background({ ctx: this.ctx });
    const map = new Map({ ctx: this.ctx, config: defaultMap });
    const deathParticlesSet = new DeathParticlesSet({ ctx: this.ctx });
    const projectiles = new Projectiles({ ctx: this.ctx, map });
    const player = new Player({
      ctx: this.ctx,
      controls: this.playerControls,
      map,
      projectiles,
      deathParticlesSet,
      onDeath: () => {
        this.stop();
        this.showWelcomeScreen({
          title: 'You lost!',
          subtitle: 'Press "R" to restart the game',
        });
      },
    });
    const enemies = new Enemies({
      ctx: this.ctx,
      map,
      projectiles,
      deathParticlesSet,
      config: defaultMap,
      player,
      onDestroyedAllEnemies: () => {
        this.stop();
        this.showWelcomeScreen({
          title: 'You won!',
          subtitle: 'Press "R" to restart the game',
        });
      },
    });
    const crosshair = new Crosshair({ ctx: this.ctx, controls: this.playerControls });
    projectiles.setPlayer(player);
    projectiles.setEnemies(enemies);

    this.entities = [
      background,
      map,
      deathParticlesSet,
      projectiles,
      player,
      enemies,
      crosshair,
    ];
  }

  start() {
    // @TODO:
  }

  stop() {
    // @TODO:
  }

  showWelcomeScreen({ title, subtitle }: ShowWelcomeScreenArgs) {
    // @TODO:
  }
}
