import { Scene, Engine } from './index'
import { Stage, Entity, Player } from '../entities/index'

export default class Game {
  constructor(root) {
    this.root = root
  }

  init() {
    this.scene      = new Scene(0, 0, root)
    this.engine     = new Engine(1000/30, this.scene.render, this.scene.update)

    this.stage      = new Stage(this.root)
    this.entity     = new Entity(40, 20, 10, 10)
    this.player     = new Player(230, 140, 10, 10)
    this.scene.add([
      this.stage,
      this.entity,
      this.player,
    ])


    //////// FOR TESTING
    window.stage = this.stage
    window.entity = this.entity
    window.player = this.player
    /////////////////////////////

    document.addEventListener('keyup', this.player.handleKeyPress)
    document.addEventListener('keydown', this.player.handleKeyPress)
    this.stage.buildCellGrid()
    // this.stage.gridOverlay()
    this.stage.buildStageBorder()
    this.engine.play()
  }
}
