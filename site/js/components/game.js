import { Scene, Engine } from './index'
import { Entity, Stage } from '../entities'
import { Player, Enemy } from '../entities/characters'

import Cell from '../entities/map_grid/cell'
import Grid from '../entities/map_grid/grid'
import Pathfinder from '../entities/map_grid/pathfinder'
import BinaryHeap from '../entities/map_grid/binary_heap'

export default class Game {
  constructor(root) {
    this.root = root
    this.gameLog = {}
  }

  init() {
    this.scene  = new Scene(0, 0, this.root)
    this.engine = new Engine(1000/30, this.scene.render, this.scene.update)
    this.stage  = new Stage(this.root)
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


    const start = this.enemy.coords
    const goal  = this.player.coords
    const grid  = this.stage.grid
    window.pf   = new Pathfinder(grid, start, goal)
    window.heap = new BinaryHeap(function (x) { return x })
    /////////////////////////////
    this.engine.play()
  }

  handleClick(e) {
    debugger
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
