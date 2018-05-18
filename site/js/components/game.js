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
  }

  init() {
    this.keys   = new KeyWatcher()
    this.scene  = new Scene(0, 0, this.root)
    this.engine = new Engine(1000/30, this.scene.render, this.scene.update)

    this.populateScene()

    this.keys.watchKeys()

    this.userInterface()


    window.opt = Opt

    this.engine.play()
  }

  userInterface() {
    const uiPanel = document.createElement('button')
    uiPanel.id = 'ui-button-decrease-cell-size'
    uiPanel.addEventListener('click', (e) => {
      this.handleClick(e)
    })
    document.body.append(uiPanel)
  }

  handleClick(e) {
    const parsedId = e.target.id.match(/button-(\w*)-(.*)$/)
    const command = parsedId[1]
    const subject = parsedId[0]

    console.log(parsedId);
    this.uiActionRelay(command, subject)
  }

  uiActionRelay(command, subject) {
    const relay = {
      decrease: {
        'cell-size': this.decreaseCellSize()
      }
    }
    relay[command][subject]
  }

  decreaseCellSize() {
    console.log(this.stage);
    this.scene.resetScene()
    this.characters = []
    if (Opt.cellSize > 2) {
      Opt.cellSize -= 2
    }
    this.populateScene()
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
    Opt.player.width = Opt.cellSize
    Opt.player.height = Opt.cellSize
    this.player = new Player(Opt.player)
    this.player.id = this.logEntity(this.player.logType)
    this.characters.push(this.player)
    document.addEventListener('keyup', this.player.handleKeyPress)
    document.addEventListener('keydown', this.player.handleKeyPress)
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
      Opt.enemy.width = Opt.cellSize
      Opt.enemy.height = Opt.cellSize
      enemy = new Enemy(Opt.enemy)
      enemy.id     = this.logEntity(enemy.logType)
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
