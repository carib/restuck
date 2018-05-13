import Scene from './scene'
import Engine from './engine'

import Stage  from './stage'
import Entity from './entity'
import Player from './player'

export default class Game {
  constructor(root) {
    this.root = root
  }

  init() {
    this.scene      = new Scene(0, 0, root)
    this.engine     = new Engine(1000/30, this.scene.render, this.scene.update)

    this.stage      = new Stage(this.root)
    this.entity     = new Entity(40, 20, 32, 32)
    this.player     = new Player(230, 140, 32, 32)
    this.scene.add([
      this.stage,
      this.entity,
      this.player,
    ])
    //////// FOR TESTING
    window.stage = this.stage
    window.entity = this.entity
    window.player = this.player


    document.addEventListener('keyup', this.player.handleKeyPress)
    document.addEventListener('keydown', this.player.handleKeyPress)
    this.stage.buildCellGrid()
    this.stage.gridOverlay()
    this.engine.play()
  }
}
