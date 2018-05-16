import { Scene, Engine } from './index'
import KeyWatcher from './keys'

import {
  Entity, Stage,
  Player, Enemy,
  Cell, Grid,
  Pathfinder, Heap,
} from '../entities'

export default class Game {
  constructor(root) {
    this.root = root
    this.gameLog = {}
  }

  init() {
    this.keys   = new KeyWatcher()
    this.scene  = new Scene(0, 0, this.root)
    this.engine = new Engine(1000/30, this.scene.render, this.scene.update)
    this.stage  = new Stage(this.root, 10, 5)
    this.scene.add([
      this.stage,
    ])
    this.keys.watchKeys()
    this.stage.generateTerrain()
    this.addCharacters()

    //////// FOR TESTING
    window.stage  = this.stage
    window.scene  = this.scene
    window.player = this.player
    window.gLog   = this.gameLog

    // stage.gridOverlay()
    // enemy.highlightPath()


    const start = this.enemy.coords
    const goal  = this.player.coords
    window.grid  = this.stage.grid

    window.heap = new Heap()
    window.path = new Pathfinder()
    // path.initPathfinder(stage.grid, enemy, player)
    /////////////////////////////


    this.engine.play()
  }

  addCharacters() {
    this.createPlayer()
    this.createNPCs()
    this.keys.add([
      this.player,
    ])
    this.scene.add([
      this.player,
    ])
  }

  createPlayer() {
    const cell     = this.stage.grid.parseYX(this.stage.getRandomCell())
    this.player    = new Player(cell.x, cell.y, 8, 8)
    this.player.id = this.logEntity(this.player.logType)
    document.addEventListener('keyup', this.player.handleKeyPress)
    document.addEventListener('keydown', this.player.handleKeyPress)
  }

  createNPCs() {
    this.createEnemies(1)
  }

  createEnemies(numEnemies) {
    const enemies = []
    let cell
    let enemy
    for (let i = 0; i < numEnemies; i++) {
      cell  = this.stage.grid.parseYX(this.stage.getRandomCell())
      enemy = new Enemy(cell.x, cell.y, 8, 8)
      enemy.id     = this.logEntity(enemy.logType)
      enemy.grid   = this.stage.grid
      enemy.target = this.player
      this.enemy   = enemy

      window.enemy = enemy

      enemies.push(enemy)
    }
    this.keys.add(enemies)
    this.scene.add(enemies)
  }

  logEntity(entityType) {
    if (!this.gameLog[entityType]) {
      this.gameLog[entityType] = 0
    }
    this.gameLog[entityType]++
    return `${entityType}-${this.gameLog[entityType]}`
  }
}
