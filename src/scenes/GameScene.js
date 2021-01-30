import Phaser from 'phaser'
import GameOverScene from './GameOverScene'
import WinScene from './WinScene'


const PLAYER_KEY = 'player'
const ENEMY_KEY = 'enemy'
const TREASURE_KEY = 'treasure'
let time = 0
let timer = {
  start: false
}


export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })

    this.player = undefined
    this.enemies = undefined
    this.treasure = undefined
    // this.timer = 0
    this.playerSpeed = 1.9
    this.enemyMaxY = 210
    this.enemyMinY = 30
  }

  preload() {
    this.load.spritesheet(PLAYER_KEY, '/assets/hero.png', { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet(ENEMY_KEY, '/assets/enemy.png', { frameWidth: 26, frameHeight: 30 })
    this.load.image(TREASURE_KEY, '/assets/treasure.png')

    this.load.image('tiles', '/assets/tiles.png')
    this.load.tilemapTiledJSON('dungeon', '/assets/maps/dungeon.json')
  }

  create() {

    const map = this.add.tilemap('dungeon')
    let tileset = map.addTilesetImage('dundeonT', 'tiles')
    //layers
    map.createLayer('floor', tileset)
    map.createLayer('wall', tileset)

    this.player = this.createPlayer()
    this.enemies = this.createEnemies()

    this.treasure = this.physics.add.sprite(this.sys.game.config.width - 40, this.sys.game.config.height / 2, 'treasure')
    this.treasure.setScale(0.4)

    this.physics.add.collider(this.player, this.enemies, this.gameOver, null, this)
    this.physics.add.collider(this.player, this.treasure, this.winGame, null, this)

    this.isPlayerAlive = true
    this.isPlayerWin = false
    this.cameras.main.resetFX()

    timer = this.add.text(16, 16, 'Timer: ' + time, { fontSize: '16px', fill: '#ffff' })
  }

  update() {
    if (!this.isPlayerAlive) {
      return;
    }
    if (this.isPlayerWin) {
      this.player.anims.play('stay')
      this.player.y -= 2
      return;
    }

    if (this.input.activePointer.isDown) {
      this.player.x += this.playerSpeed
      this.player.anims.play('run', true)
      timer.start = true
    } else {
      this.player.anims.play('stay')
    }
    let enemies = this.enemies.getChildren()
    let numEnemies = enemies.length

    for (let i = 0; i < numEnemies; i++) {
      enemies[i].y += enemies[i].speed
      enemies[i].anims.play(ENEMY_KEY, true)

      if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
        enemies[i].speed *= -1
      } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
        enemies[i].speed *= -1
      }
    }
    if (timer.start) {
      time++
      timer.setText('Timer: ' + time)
    }
  }

  createPlayer() {
    let player = this.physics.add.sprite(20, this.sys.game.config.height / 2, PLAYER_KEY)
    player.setScale(0.7)
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'stay',
      frames: [{ key: PLAYER_KEY, frame: 1 }],
      frameRate: 20
    })

    return player
  }

  createEnemies() {
    const enemies = this.physics.add.group({
      key: ENEMY_KEY,
      repeat: 4,
      setXY: {
        x: 80,
        y: 50,
        stepX: 55,
        stepY: 10
      }
    })

    enemies.children.iterate((enemy) => {
      enemy.speed = Math.random() * 1.5 + 1
      enemy.setScale(0.8)

      this.anims.create({
        key: ENEMY_KEY,
        frames: this.anims.generateFrameNumbers(ENEMY_KEY, { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
      })
    })

    return enemies
  }

  winGame() {
    timer.start = false
    this.isPlayerWin = true

    this.time.delayedCall(250, () => {
      this.cameras.main.fade(250)
    }, [], this)

    this.time.delayedCall(700, () => {
      this.scene.start('WinScene', new WinScene(time))
      time = 0
    }, [], this)

  }

  gameOver() {
    this.isPlayerAlive = false;
    timer.start = false
    this.physics.pause()

    this.cameras.main.shake(500)

    this.time.delayedCall(200, () => {
      this.cameras.main.fade(200, 111)
    }, [], this);


    this.time.delayedCall(500, () => {
      this.scene.launch('GameOverScene', new GameOverScene())
      time = 0
    }, [], this)

  }
}

