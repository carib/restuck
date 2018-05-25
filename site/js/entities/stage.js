import { Cell, Wall } from './'
import * as Opt from '../components/options'
import Grid from './map_grid/grid'

export default class Stage extends Grid {
  constructor(options) {
    super(options)
    this.entities = new Set()
    this.numVoids = options.numVoids
    this.voidSize = options.voidSize

    this.render           = this.render.bind(this)
    this.update           = this.update.bind(this)
    this.placeWall        = this.placeWall.bind(this)
    this.updateCells      = this.updateCells.bind(this)
    this.getRandomCell    = this.getRandomCell.bind(this)
    this.generateTerrain  = this.generateTerrain.bind(this)
    this.buildStageBorder = this.buildStageBorder.bind(this)
  }

  update() {
    this.updateCells()
  }

  render() {
    let { ctx } = this.scene
    let { width, height } = this
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, width, height)
  }

  init() {
    this.generateTerrain()
    if (Opt.uiConfig.gridOverlay) {
      this.toggleGridOverlay()
    }
  }

  buildStageBorder() {
    let split
    let row
    let col
    let wall
    this.cells.forEach(cell => {
      split = this.parseYX(cell.coords)
      row = split.y
      col = split.x
      if (row === 0 ||
          col === 0 ||
          row === this.numRows * Opt.cellSize - Opt.cellSize ||
          col === this.numCols * Opt.cellSize - Opt.cellSize) {
        this.placeWall(col, row)
      }
    }, this)
  }

  placeWall(x, y) {
    const sceneW = this.numCols * Opt.cellSize
    const sceneH = this.numRows * Opt.cellSize
    x = (x >= sceneW) ? sceneW - Opt.cellSize : x
    y = (y >= sceneH) ? sceneH - Opt.cellSize : y
    let cell = this.getCellAt(y, x)
    cell = this.parseYX(cell)
    x = cell.x
    y = cell.y
    Opt.wall.x = x
    Opt.wall.y = y
    Opt.wall.width = Opt.cellSize
    Opt.wall.height = Opt.cellSize
    const wall = new Wall(Opt.wall)
    const coords = `${y},${x}`
    wall.id = 'wall'
    this.scene.add(wall)
    cell = this.get(coords)
    cell.add(wall)
    cell.isWall = true
    cell.setMCost()
  }

  generateTerrain() {
    this.buildCellGrid()
    this.linkGridCells()
    this.buildStageBorder()
    const numVoids = this.numVoids
    const voidSize = this.voidSize
    for (let i = 0; i < numVoids; i++) {
      this.growVoid(voidSize, voidSize)
    }
    this.cells.forEach(cell => cell.setMCost())
  }

  growVoid(length, size, startX, startY) {
    const sceneW = this.width
    const sceneH = this.height
    const cSize = Opt.cellSize
    if (!size) return;
    let randCell = this.getRandomCell()
    let split = this.parseYX(randCell)
    while (!this.get(randCell)) {
      randCell = this.getRandomCell()
    }
    split  = this.parseYX(randCell)
    startY = (startY) ? startY : split.y
    startX = (startX) ? startX : split.x
    startX = (startX >= sceneW) ? sceneW - Opt.cellSize : startX
    startX = (startX <= 0) ? Opt.cellSize : startX
    startY = (startY >= sceneH) ? sceneH - Opt.cellSize : startY
    startY = (startY <= 0) ? Opt.cellSize : startY
    this.placeWall(startX, startY)
    let path = [
      [(startX + cSize), (startX - cSize)],
      [(startY + cSize), (startY - cSize)],
    ]
    let pick = [
      path[0][Math.floor(Math.random() * path.length)],
      path[1][Math.floor(Math.random() * path.length)]
    ]
    startX = pick[0]
    startY = pick[1]
    if (length > 4) {
      length = 0
    }
    this.growVoid((length + 1), (size - 1), startX, startY);
  }

  updateCells() {
    let entityCells
    this.entities.forEach(ent => {
      if (ent !== this && ent.id !== 'wall' && ent.logType !== 'cell') {
        entityCells = this.getEntityCells(ent)
        ent.cells.forEach(cell => {
          this.get(cell).remove(ent)
        }, this)
        ent.cells.clear()
        Object.values(entityCells).forEach(cell => {
          if (!cell) {
            debugger
          }
          this.get(cell).add(ent)
        }, this)
        Object.values(entityCells).forEach(cell => {
          ent.cells.add(cell)
          if (this.get(cell).size() > 1) {
            ent.occupiedCells.clear()
            ent.occupiedCells.add(this.get(cell))
          }
        }, this)
      }
    }, this)
  }

  getEntityCells(entity) {
    const { x, y, x2, y2 } = entity
    return {
      topLeft:  this.getCellAt(y, x),
      topRight: this.getCellAt(y, x2),
      btmLeft:  this.getCellAt(y2, x),
      btmRight: this.getCellAt(y2, x2)
    }
  }

  toggleGridOverlay() {
    const cells = Array.from(this.cells.values())
    if (Opt.uiConfig.gridOverlay) {
      this.scene.add(cells)
    } else {
      for (let i = 0; i < cells.length; i++) {
        this.scene.remove(cells[i])
      }
    }
  }
}
