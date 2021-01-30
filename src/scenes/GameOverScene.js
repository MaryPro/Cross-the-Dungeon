import Phaser from 'phaser'
import GameScene from './GameScene'

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' })
  }

  create() {
    this.add.text(100, 60, 'Game Over ', { fontSize: '32px', color: '#ffff' })
    this.add.text(50, 100, 'Try again to find the treasure', { fontSize: '16px', color: '#ffff' })
    this.add.text(110, 150, 'Click to restart ', { fontSize: '16px', color: '#ffff' })

    this.input.once('pointerdown', function () {

      this.time.delayedCall(100, () => {
        this.scene.start('GameScene', GameScene)
      }, [], this)
    }, this);
  }
}
