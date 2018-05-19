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

export default class Game {
  constructor(root) {
    this.root = root
    this.characters = []
    this.gameLog = {}

    this.handleClick = this.handleClick.bind(this)
    this.uiActionRelay = this.uiActionRelay.bind(this)
  }

  init() {
    this.keys   = new KeyWatcher()
    this.scene  = new Scene(0, 0, this.root)
    this.engine = new Engine(1000/30, this.scene.render, this.scene.update)

    this.populateScene()

    this.keys.watchKeys()

    this.scene.resize()

    this.userInterface()

    window.opt = Opt
    this.engine.play()
  }

  userInterface() {
    this.addUIElement('button', 'decrease-cell-size', 'click', this.handleClick)
    this.addUIElement('button', 'increase-cell-size', 'click', this.handleClick)
  }

  addUIElement(tagName, elementId, eventType, eventCallback) {
    const newElement = document.createElement(tagName)
    newElement.id = `ui-${tagName}-${elementId}`
    newElement.addEventListener(eventType, eventCallback)
    document.body.append(newElement)
  }

  handleClick(e) {
    const parsedId = e.target.id.match(/button-(\w*)-(.*)$/)
    const command = parsedId[1]
    const subject = parsedId[2]
    this.uiActionRelay(command, subject)
  }

  uiActionRelay(command, subject) {
    this.scene.resetScene()
    this.scene = new Scene(0, 0)
    this.characters = []
    this.stage.entities = new Set()
    this.engine.update = this.scene.update
    this.engine.render = this.scene.render
    const relay = {
      decrease: {
        'cell-size': this.decreaseCellSize
      },
      increase: {
        'cell-size': this.increaseCellSize
      }
    }
    relay[command][subject]()
    this.scene.stage = this.stage
    this.populateScene()
  }

  decreaseCellSize() {
    if (Opt.cellSize > 2) {
      Opt.cellSize -= 2
    }
  }

  increaseCellSize() {
    if (Opt.cellSize < 16) {
      Opt.cellSize += 2
    }
  }

  populateScene() {
    Opt.stage.cellSize = Opt.cellSize
    this.stage = new Stage(Opt.stage)
    this.scene.add([this.stage])
    this.stage.init()
    this.addCharacters()
  }

  addCharacters() {
    this.createPlayer()
    this.createNPCs()
    this.keys.add(this.characters)
    this.scene.add(this.characters)
  }

  createPlayer() {
    const cell = this.stage.grid.parseYX(this.stage.getRandomCell())
    Opt.player.x = cell.x
    Opt.player.y = cell.y
    Opt.player.width = Opt.cellSize > 2 ? Opt.cellSize - 2 : Opt.cellSize - 1
    Opt.player.height = Opt.cellSize > 2 ? Opt.cellSize - 2 : Opt.cellSize - 1
    this.player = new Player(Opt.player)
    this.player.id = this.logEntity(this.player.logType)
    this.characters.push(this.player)
  }

  createNPCs() {
    this.createEnemies(1)
  }

  createEnemies(numEnemies) {
    let cell
    let enemy
    for (let i = 0; i < numEnemies; i++) {
      cell  = this.stage.grid.parseYX(this.stage.getRandomCell())
      Opt.enemy.x = cell.x
      Opt.enemy.y = cell.y
      Opt.enemy.width  = Opt.cellSize > 2 ? Opt.cellSize - 2 : Opt.cellSize - 1
      Opt.enemy.height = Opt.cellSize > 2 ? Opt.cellSize - 2 : Opt.cellSize - 1
      enemy = new Enemy(Opt.enemy)
      enemy.id = this.logEntity(enemy.logType)
      enemy.target = this.player
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
}
