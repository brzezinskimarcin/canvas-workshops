import Controls from '@/game/controls';
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
  ctx: CanvasRenderingContext2D;
  animationRequestId!: number;
  entities!: Entity[];
  controls?: Controls;
  text: Text;

  constructor(selector: string) {
    const canvas = document.querySelector<HTMLCanvasElement>(selector)!;
    this.ctx = canvas.getContext('2d')!;
    this.text = new Text({ ctx: this.ctx });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.addEventListener('keydown', ({ code: keyCode }) => {
      if (keyCode === 'KeyR') {
        window.cancelAnimationFrame(this.animationRequestId);
        this.controls?.cleanup();
        this.initGame();
        this.start();
      }
    });

    this.initGame();
    this.start();
  }

  initGame() {
    this.controls = new Controls();
    const background = new Background({ ctx: this.ctx });
    const map = new Map({ ctx: this.ctx, config: defaultMap });
    const deathParticlesSet = new DeathParticlesSet({ ctx: this.ctx });
    const projectiles = new Projectiles({ ctx: this.ctx, map });
    const player = new Player({
      ctx: this.ctx,
      controls: this.controls,
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
      onDestroyedAllEnemies: () => {
        this.stop();
        this.showWelcomeScreen({
          title: 'You won!',
          subtitle: 'Press "R" to restart the game',
        });
      },
    });
    const crosshair = new Crosshair({ ctx: this.ctx, controls: this.controls });
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
    this.animationRequestId = window.requestAnimationFrame(this.start.bind(this));
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.entities.forEach((entity) => {
      if (entity.update) {
        entity.update();
      }
    });

    this.entities.forEach((entity) => {
      entity.draw();
    });
  }

  stop() {
    window.cancelAnimationFrame(this.animationRequestId);
  }

  showWelcomeScreen({ title, subtitle }: ShowWelcomeScreenArgs) {
    window.requestAnimationFrame(() => {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      this.text.draw({
        content: title,
        fontSize: 60,
        x: textWidth => (this.ctx.canvas.width - textWidth) / 2,
        y: this.ctx.canvas.height / 2 - 48,
      });

      this.text.draw({
        content: subtitle,
        fontSize: 36,
        x: textWidth => (this.ctx.canvas.width - textWidth) / 2,
        y: this.ctx.canvas.height / 2 + 16,
      });
    });
  }
}
