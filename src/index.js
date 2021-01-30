import Phaser from 'phaser'

import StartScene from './scenes/StartScene'
import GameScene from './scenes/GameScene'
import GameOverScene from './scenes/GameOverScene'
import WinScene from './scenes/WinScene'


const config = {
  type: Phaser.AUTO,
  width: 384,
  height: 240,
  physics: {
    default: 'arcade',
    arcade: { debug: false },
  },
  scale: {
    zoom: 2,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [StartScene, GameScene, GameOverScene, WinScene]
}

export default new Phaser.Game(config)
