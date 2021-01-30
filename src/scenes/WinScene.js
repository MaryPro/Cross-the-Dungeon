import Phaser from 'phaser'
import GameScene from './GameScene'

let fintime = 0

export default class WinScene extends Phaser.Scene {
  constructor(time) {
    super({ key: 'WinScene' })
    this.fireworkBlue = undefined
    this.rocketBlue = undefined
    this.fireworkOrange = undefined
    this.rocketOrange = undefined

    fintime = time

  }

  preload() {
    this.load.spritesheet('fireworkBlue', 'assets/fireworkBlue.png', { frameWidth: 88, frameHeight: 86 })
    this.load.spritesheet('rocketBlue', 'assets/rocketBlue.png', { frameWidth: 7, frameHeight: 52 })
    this.load.spritesheet('fireworkOrange', 'assets/fireworkOrange.png', { frameWidth: 93, frameHeight: 92 })
    this.load.spritesheet('rocketOrange', 'assets/rocketOrange.png', { frameWidth: 7, frameHeight: 51 })

  }

  create() {

    this.fireworkBlue = this.createFirework('fireworkBlue', 80, 80)
    this.fireworkOrange = this.createFirework('fireworkOrange', 270, 150)

    this.rocketBlue = this.createRocket('rocketBlue', 80)
    this.rocketOrange = this.createRocket('rocketOrange', 270)


    this.fireworkBlue.anims.play('fireworkBlue', true)
    this.fireworkOrange.anims.play('fireworkOrange', true)

    this.add.text(70, 60, 'You are AWESOME!', { fontSize: '25px', color: '#ffff' })
    this.add.text(110, 100, `Your time: ${fintime}ms`, { fontSize: '16px', color: '#ffff' })
    this.add.text(110, 180, 'Click to restart ', { fontSize: '16px', color: '#ffff' })

    this.input.once('pointerdown', function () {
      this.scene.start('GameScene', GameScene)
    }, this);
  }

  update() {
    if (this.rocketBlue.y > 80) {
      this.rocketBlue.anims.play('rocketBlue', true)
    } else if (this.rocketBlue.y = 80) {
      this.rocketBlue.anims.play('rocketBlue', false)
      this.fireworkBlue.anims.play('fireworkBlue', true)
      this.rocketBlue.y = 300
    }

    if (this.fireworkBlue.anims.isPlaying) {
      this.rocketBlue.anims.play('rocketBlue', false)

    } else {
      this.rocketBlue.y -= 2
    }

    if (this.rocketOrange.y > 150) {
      this.rocketOrange.anims.play('rocketOrange', true)
    } else if (this.rocketOrange.y = 150) {
      this.rocketOrange.anims.play('rocketOrange', false)
      this.fireworkOrange.anims.play('fireworkOrange', true)
      this.rocketOrange.y = 300
    }

    if (this.fireworkOrange.anims.isPlaying) {
      this.rocketOrange.anims.play('rocketOrange', false)

    } else {
      this.rocketOrange.y -= 2
    }

  }

  createFirework(fireworkKey, x, y) {
    let firework = this.physics.add.sprite(x, y, fireworkKey)
    firework.setScale(2)

    this.anims.create({
      key: fireworkKey,
      frames: this.anims.generateFrameNumbers(fireworkKey, { start: 0 }),
      frameRate: 20,
    })

    return firework
  }

  createRocket(rocketKey, x) {
    let rocket = this.physics.add.sprite(x, 300, rocketKey)

    this.anims.create({
      key: rocketKey,
      frames: this.anims.generateFrameNumbers(rocketKey, { start: 0 }),
      frameRate: 20,
      repeat: -1
    })


    return rocket
  }

}

