import { Scene, Engine } from './index'
import { Entity, Stage } from '../entities'
import { Player, Enemy } from '../entities/characters'

import Cell from '../entities/map_grid/cell'
import Grid from '../entities/map_grid/grid'
import Pathfinder from '../entities/map_grid/pathfinder'
import Heap from '../entities/map_grid/heap'

export default class Game {
  constructor(root) {
    this.root = root
    this.gameLog = {}
  }

  init() {
    this.scene  = new Scene(0, 0, this.root)
    this.engine = new Engine(1000/30, this.scene.render, this.scene.update)
    this.stage  = new Stage(this.root, 100, 5)
    this.scene.add([
      this.stage,
    ])
    this.stage.generateTerrain()
    this.addCharacters()

    //////// FOR TESTING
    window.stage  = this.stage
    window.scene  = this.scene
    window.player = this.player
    window.gLog   = this.gameLog

    // stage.gridOverlay()

    const start = this.enemy.coords
    const goal  = this.player.coords
    window.grid  = this.stage.grid

    window.heap = new Heap()
    window.path  = new Pathfinder(grid, start, goal)
    path.initPathfinder(stage.grid, enemy.coords, player.coords)
    this.highlightPath()
    /////////////////////////////


    this.engine.play()
  }

  highlightPath() {
    path.path.pop()
    path.path.forEach(cell => {
      if (cell.coords !== player.coords) {

      }
      let ent = new Entity(cell.x, cell.y, 10, 10)
      ent.color = '#c6ece9'
    })
  }

  addCharacters() {
    this.createNPCs()
    this.createPlayer()
    this.scene.add([
      this.player,
    ])
  }

  createPlayer() {
    const cell     = this.stage.grid.parseYX(this.stage.getRandomCell())
    this.player    = new Player(cell.x, cell.y, 10, 10)
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
      enemy = new Enemy(cell.x, cell.y, 10, 10)
      enemy.id = this.logEntity(enemy.logType)
      enemy.grid = this.stage.grid
      this.enemy   = enemy
      window.enemy = enemy

      enemies.push(enemy)
    }
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
