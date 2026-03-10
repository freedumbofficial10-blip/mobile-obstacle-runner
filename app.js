const STORAGE_KEYS = {
  bestTime: 'pulsedash_best_time',
  coins: 'pulsedash_total_coins',
  level: 'pulsedash_level',
};

const state = {
  bestTime: Number(localStorage.getItem(STORAGE_KEYS.bestTime)) || 0,
  totalCoins: Number(localStorage.getItem(STORAGE_KEYS.coins)) || 0,
  level: Number(localStorage.getItem(STORAGE_KEYS.level)) || 1,
  runCoins: 0,
  runTime: 0,
};

const menuScreen = document.getElementById('menuScreen');
const gameScreen = document.getElementById('gameScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const runtimeMessage = document.getElementById('runtimeMessage');

const bestTimeValue = document.getElementById('bestTimeValue');
const coinValue = document.getElementById('coinValue');
const levelValue = document.getElementById('levelValue');
const timeValue = document.getElementById('timeValue');
const runCoinValue = document.getElementById('runCoinValue');
const finalTimeValue = document.getElementById('finalTimeValue');
const finalCoinsValue = document.getElementById('finalCoinsValue');
const bestAfterRunValue = document.getElementById('bestAfterRunValue');

const playBtn = document.getElementById('playBtn');
const restartBtn = document.getElementById('restartBtn');
const menuBtn = document.getElementById('menuBtn');

let game;

function showMessage(message, type = 'info') {
  runtimeMessage.textContent = message;
  runtimeMessage.className = `runtime-message show ${type === 'error' ? 'error' : ''}`.trim();
}

function hideMessage() {
  runtimeMessage.textContent = '';
  runtimeMessage.className = 'runtime-message';
}

function setScreen(screen) {
  [menuScreen, gameScreen, gameOverScreen].forEach((el) => el.classList.remove('active'));
  screen.classList.add('active');
}

function formatTime(seconds) {
  return `${seconds.toFixed(1)}s`;
}

function persistProgress() {
  localStorage.setItem(STORAGE_KEYS.bestTime, String(state.bestTime));
  localStorage.setItem(STORAGE_KEYS.coins, String(state.totalCoins));
  localStorage.setItem(STORAGE_KEYS.level, String(state.level));
}

function refreshMenuStats() {
  bestTimeValue.textContent = formatTime(state.bestTime);
  coinValue.textContent = state.totalCoins;
  levelValue.textContent = state.level;
}

function ensureRuntimeReady() {
  if (location.protocol === 'file:') {
    showMessage('Open via local server (npm start), not file:// URL.', 'error');
    return false;
  }

  if (typeof window.Phaser === 'undefined') {
    showMessage('Phaser failed to load. Check internet access or CDN policy, then refresh.', 'error');
    return false;
  }

  return true;
}

function startGame() {
  if (!ensureRuntimeReady()) return;

  hideMessage();
  setScreen(gameScreen);
  state.runCoins = 0;
  state.runTime = 0;
  timeValue.textContent = '0.0';
  runCoinValue.textContent = '0';

  if (game) game.destroy(true);

  const container = document.getElementById('gameContainer');
  const width = Math.max(container.clientWidth, 320);
  const height = Math.max(container.clientHeight, 420);

  class RunScene extends Phaser.Scene {
    constructor() {
      super('RunScene');
      this.obstacleSpeed = 200;
      this.spawnTimer = 0;
      this.coinTimer = 0;
      this.elapsed = 0;
    }

    create() {
      this.cameras.main.setBackgroundColor('#0c1434');

      this.lanes = [width * 0.2, width * 0.5, width * 0.8];
      this.currentLane = 1;

      this.player = this.add.rectangle(this.lanes[this.currentLane], height - 70, 40, 40, 0x22d3ee);
      this.physics.add.existing(this.player);
      this.player.body.setImmovable(true);
      this.player.body.setAllowGravity(false);

      this.obstacles = this.physics.add.group();
      this.coins = this.physics.add.group();

      this.physics.add.overlap(this.player, this.coins, (_player, coin) => {
        coin.destroy();
        state.runCoins += 1;
        runCoinValue.textContent = String(state.runCoins);
      });

      this.physics.add.overlap(this.player, this.obstacles, () => {
        this.endRun();
      });

      this.input.on('pointerdown', (pointer) => {
        if (pointer.x < width / 2) {
          this.currentLane = Math.max(0, this.currentLane - 1);
        } else {
          this.currentLane = Math.min(2, this.currentLane + 1);
        }
        this.tweens.add({
          targets: this.player,
          x: this.lanes[this.currentLane],
          duration: 80,
          ease: 'Power2',
        });
      });
    }

    update(_time, delta) {
      const dt = delta / 1000;
      this.elapsed += dt;
      state.runTime = this.elapsed;
      timeValue.textContent = this.elapsed.toFixed(1);

      this.obstacleSpeed += dt * 4;
      this.spawnTimer += dt;
      this.coinTimer += dt;

      if (this.spawnTimer >= 0.75) {
        this.spawnTimer = 0;
        this.spawnObstacle();
      }

      if (this.coinTimer >= 1.1) {
        this.coinTimer = 0;
        this.spawnCoin();
      }

      this.obstacles.children.each((obj) => {
        obj.y += this.obstacleSpeed * dt;
        if (obj.y > height + 30) obj.destroy();
      });

      this.coins.children.each((obj) => {
        obj.y += (this.obstacleSpeed - 35) * dt;
        if (obj.y > height + 30) obj.destroy();
      });
    }

    spawnObstacle() {
      const lane = Phaser.Math.Between(0, 2);
      const obstacle = this.add.rectangle(this.lanes[lane], -30, 42, 42, 0xff5f7a);
      this.physics.add.existing(obstacle);
      obstacle.body.setAllowGravity(false);
      obstacle.body.setImmovable(true);
      this.obstacles.add(obstacle);
    }

    spawnCoin() {
      const lane = Phaser.Math.Between(0, 2);
      const coin = this.add.circle(this.lanes[lane], -20, 14, 0xffd54a);
      this.physics.add.existing(coin);
      coin.body.setAllowGravity(false);
      coin.body.setImmovable(true);
      this.coins.add(coin);
    }

    endRun() {
      this.scene.pause();
      onGameOver();
    }
  }

  game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'gameContainer',
    width,
    height,
    physics: {
      default: 'arcade',
      arcade: { debug: false },
    },
    scene: [RunScene],
  });
}

function onGameOver() {
  state.totalCoins += state.runCoins;
  state.bestTime = Math.max(state.bestTime, state.runTime);
  state.level = Math.max(1, Math.floor(state.totalCoins / 50) + 1);
  persistProgress();

  finalTimeValue.textContent = formatTime(state.runTime);
  finalCoinsValue.textContent = String(state.runCoins);
  bestAfterRunValue.textContent = formatTime(state.bestTime);

  refreshMenuStats();
  setScreen(gameOverScreen);
}

playBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
menuBtn.addEventListener('click', () => {
  if (game) {
    game.destroy(true);
    game = null;
  }
  refreshMenuStats();
  setScreen(menuScreen);
});

refreshMenuStats();
if (!ensureRuntimeReady()) {
  playBtn.disabled = true;
  restartBtn.disabled = true;
}
