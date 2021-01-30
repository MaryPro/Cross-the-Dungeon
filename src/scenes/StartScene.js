import Phaser from 'phaser'
import GameScene from './GameScene'

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' })
  }

  preload() {
    this.load.audio('theme', 'assets/audio/misty _valley.mp3')
    this.load.image('tiles', '/assets/tiles.png')
    this.load.tilemapTiledJSON('dungeon', '/assets/maps/dungeon.json')
  }

  create() {
    const map = this.add.tilemap('dungeon')
    let tileset = map.addTilesetImage('dundeonT', 'tiles')
    map.createLayer('floor', tileset)
    map.createLayer('wall', tileset)

    this.add.text(40, 60, 'Cross the Dungeon', { fontSize: '30px', color: '#ffff' })
    this.clickAnim = this.add.text(120, 150, 'Click to START', { fontSize: '16px', color: '#ffff' })
    this.speed = 0.5

    this.music = this.sound.add('theme')
    this.music.play()

    this.input.once('pointerdown', function () {
      this.time.delayedCall(100, () => {
        this.scene.start('GameScene', GameScene)
      }, [], this)
    }, this);
  }

  update() {
    this.clickAnim.y += this.speed
    if (this.clickAnim.y <= 130 && this.speed < 0) {
      this.speed *= -1
    } else if (this.clickAnim.y >= 170 && this.speed > 0) {
      this.speed *= -1
    }
  }

}
