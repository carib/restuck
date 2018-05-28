import { Scene, Engine } from './index'
import KeyWatcher from './keys'
import * as UI from './ui'
import * as Opt from './options'

import {
  Entity, Stage,
  Player, Enemy,
  Cell, Grid,
  Pathfinder, Heap,
} from '../entities'

let seed;

export default class Game {
  constructor() {
    this.characters = []
    this.gameLog = {}
  }

  init() {
    this.scene  = new Scene(0, 0)
    this.engine = new Engine(1000/30, this.scene.render, this.scene.update)

    this.populateScene()

    this.scene.resize()
    
    this.engine.play()
  }

  resetScene() {
    this.scene.resetScene()
    delete this.scene
    this.characters = []
    this.gameLog = {}
    this.scene = new Scene(0, 0)
    this.engine.update = this.scene.update
    this.engine.render = this.scene.render
    this.populateScene()
  }


  populateScene() {
    Opt.stage.cellSize = Opt.cellSize
    this.stage = new Stage(Opt.stage)
    this.scene.add([this.stage])

    this.stage.init(seed)
    this.addCharacters()
  }

  addCharacters() {
    this.createPlayer()
    this.createNPCs()

    this.scene.add(this.characters)
  }

  createPlayer() {
    const cell = this.stage.parseYX(this.stage.getRandomCell())
    Opt.player.x = cell.x
    Opt.player.y = cell.y
    Opt.player.width  = Opt.cellSize > 2 ? Opt.cellSize - 2 : Opt.cellSize - 1
    Opt.player.height = Opt.cellSize > 2 ? Opt.cellSize - 2 : Opt.cellSize - 1
    this.player = new Player(Opt.player)
    this.player.id = this.logEntity(this.player.logType)
    this.player.watchKeys()
    this.characters.push(this.player)
  }

  createNPCs() {
    this.createEnemies(Opt.numEnemies)
  }

  createEnemies(numEnemies) {
    let cell
    let enemy
    for (let i = 0; i < numEnemies; i++) {
      cell  = this.stage.parseYX(this.stage.getRandomCell())
      Opt.enemy.x = cell.x
      Opt.enemy.y = cell.y
      Opt.enemy.width  = Opt.cellSize > 2 ? Opt.cellSize - 2 : Opt.cellSize - 1
      Opt.enemy.height = Opt.cellSize > 2 ? Opt.cellSize - 2 : Opt.cellSize - 1
      enemy = new Enemy(Opt.enemy)
      enemy.id = this.logEntity(enemy.logType)
      enemy.target = this.player
      enemy.watchKeys()
      this.characters.push(enemy)
    }
  }

  logEntity(entityType) {
    if (!this.gameLog[entityType]) {
      this.gameLog[entityType] = 0
    }
    this.gameLog[entityType]++
    return `${entityType}-${this.gameLog[entityType]}`
  }


  addGridRule() {
    let gridRule = document.getElementById('grid-rules')
    let xRule = document.createElement('div')
    let yRule = document.createElement('div')
    xRule.id = 'x-rule'
    yRule.id = 'y-rule'
    for (let i = 0; i < Opt.stage.width; i += Opt.cellSize) {
      let x = document.createElement('div')
      if (i % 100 === 0) {
        x.innerText = `${i}`
      } else {
        x.innerText = `${i % 100}`
      }
      x.classList.add('grid-num')
      xRule.appendChild(x)
    }
    for (let i = 0; i < Opt.stage.height; i += Opt.cellSize) {
      let y = document.createElement('div')
      if (i % 100 === 0) {
        y.innerText = `${i}`
      } else {
        y.innerText = `${i % 100}`

      }
      y.classList.add('grid-num')
      yRule.appendChild(y)
    }
    gridRule.appendChild(xRule)
    gridRule.appendChild(yRule)
  }
}
