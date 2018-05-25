import { Cell, Grid, Wall } from './'
import * as Opt from '../components/options'

export default class Stage {
  constructor(options) {
    this.entities = new Set()
    this.numVoids = options.numVoids
    this.voidSize = options.voidSize
    this.width    = Opt.stage.width
    this.height   = Opt.stage.height

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
      split = this.grid.parseYX(cell.coords)
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
    let cell = this.grid.getCellAt(y, x)
    cell = this.grid.parseYX(cell)
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
    this.grid.get(coords).add(wall)
  }

  generateTerrain() {
    this.buildCellGrid()
    this.grid.linkGridCells()
    this.buildStageBorder()
    const numVoids = this.numVoids
    const voidSize = this.voidSize
    for (let i = 0; i < numVoids; i++) {
      this.growVoid(voidSize, voidSize)
    }
  }

  growVoid(length, size, startX, startY) {
    const sceneW = this.width
    const sceneH = this.height
    const cSize = Opt.cellSize
    if (!size) return;
    let randCell = this.getRandomCell()
    let split = this.grid.parseYX(randCell)
    while (!this.grid.get(randCell)) {
      randCell = this.getRandomCell()
    }
    split  = this.grid.parseYX(randCell)
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

  getRandomCell() {
    const mockEnt = {}
    let randomCell;
    let col = Math.floor(Math.random() * this.numCols)
    let row = Math.floor(Math.random() * this.numRows)
    col = (col > this.numCols) ? this.numCols - 2 : col
    col = (col < 0) ? 20 : col
    row = (row > this.numRows) ? this.numRows : row
    row = (row < 0) ? 20 : row
    mockEnt.x  = col * Opt.cellSize
    mockEnt.y  = row * Opt.cellSize
    randomCell = this.grid.getCellAt(mockEnt.y, mockEnt.x)
    if (!randomCell) {
      debugger
      this.grid.getCellAt(mockEnt.y, mockEnt.x)
    }
    if (this.grid.get(randomCell).size() > 0) {
      return this.getRandomCell()
    }
    return randomCell
  }

  updateCells() {
    let entityCells
    this.entities.forEach(ent => {
      if (ent !== this && ent.id !== 'wall' && ent.logType !== 'cell') {
        entityCells = this.getEntityCells(ent)
        ent.cells.forEach(cell => {
          this.grid.get(cell).remove(ent)
        }, this)
        ent.cells.clear()
        Object.values(entityCells).forEach(cell => {
          if (!cell) {
            debugger
          }
          this.grid.get(cell).add(ent)
        }, this)
        Object.values(entityCells).forEach(cell => {
          ent.cells.add(cell)
          if (this.grid.get(cell).size() > 1) {
            ent.occupiedCells.clear()
            ent.occupiedCells.add(this.grid.get(cell))
          }
        }, this)
      }
    }, this)
  }

  getEntityCells(entity) {
    const { x, y, x2, y2 } = entity
    return {
      topLeft:  this.grid.getCellAt(y, x),
      topRight: this.grid.getCellAt(y, x2),
      btmLeft:  this.grid.getCellAt(y2, x),
      btmRight: this.grid.getCellAt(y2, x2)
    }
  }

  buildCellGrid() {
    this.numRows  = Math.floor(this.height / Opt.cellSize)
    this.numCols  = Math.floor(this.width / Opt.cellSize)
    this.numCells = this.numRows * this.numCols;
    const gridOpt = {
      numRows: this.numRows,
      numCols: this.numCols,
      cellSize: Opt.cellSize
    }
    const grid   = new Grid(gridOpt);
    for (let i = 0; i < this.numCells; i++) {
      let col    = (i % 1000000 % this.numCols) * Opt.cellSize;
      let row    = Math.floor(i / this.numCols) * Opt.cellSize;
      let coords = `${row},${col}`
      let cell   = new Cell(coords)
      grid.add(cell)
    }
    this.grid  = grid;
    this.cells = this.grid.cells
    return this.grid;
  }

  toggleGridOverlay() {
    const cells = Array.from(this.grid.cells.values())
    if (Opt.uiConfig.gridOverlay) {
      this.scene.add(cells)
    } else {
      for (let i = 0; i < cells.length; i++) {
        this.scene.remove(cells[i])
      }
    }
  }
}
