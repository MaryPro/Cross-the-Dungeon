import Phaser from 'phaser'

// import HelloWorldScene from './scenes/HelloWorldScene'
import GameScene from './scenes/GameScene'
// import GameOverScene from './scenes/GameOverScene'
// import WinScene from './scenes/WinScene'


const config = {
  type: Phaser.AUTO,
  width: 384,
  height: 240,
  physics: {
    default: 'arcade',
    // arcade: { debug: true },
  },
  scale: {
    zoom: 2
  },
  scene: [GameScene]
}

export default new Phaser.Game(config)
