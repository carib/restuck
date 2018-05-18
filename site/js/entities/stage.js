import { Cell, Grid, Wall } from './'
import * as Opt from '../components/options'

export default class Stage {
  constructor(options) {
    this.root     = options.root
    this.cellSize = options.cellSize
    this.entities = new Set()
    this.numVoids = options.numVoids
    this.voidSize = options.voidSize

    this.render           = this.render.bind(this)
    this.update           = this.update.bind(this)
    this.updateCells      = this.updateCells.bind(this)
    this.getRandomCell    = this.getRandomCell.bind(this)
    this.generateTerrain  = this.generateTerrain.bind(this)
    this.buildStageBorder = this.buildStageBorder.bind(this)
  }

  update() {
    this.updateCells()
  }

  render() {

  }

  init() {
    this.generateTerrain()
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
          row === this.numRows * this.cellSize - this.cellSize ||
          col === this.numCols * this.cellSize - this.cellSize) {
        this.placeWall(col, row)
      }
    }, this)
  }

  placeWall(x, y) {
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
    const rootW = document.getElementById('root').clientWidth
    const rootH = document.getElementById('root').clientHeight
    if (!size) return;
    let randCell = this.getRandomCell()
    let split    = this.grid.parseYX(randCell)
    startY = (startY) ? startY : split.y
    startX = (startX) ? startX : split.x
    const cSize = this.cellSize

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
    startX = (startX >= rootW) ? rootW - this.cellSize : startX
    startX = (startX <= 0) ? this.cellSize : startX
    startY = (startY >= rootH) ? rootH - this.cellSize : startY
    startY = (startY <= 0) ? this.cellSize : startY
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
    mockEnt.x  = col * this.cellSize
    mockEnt.y  = row * this.cellSize
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
      if (ent !== this && ent.id !== 'wall') {
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
    this.numRows  = Math.floor(this.root.clientHeight / this.cellSize)
    this.numCols  = Math.floor(this.root.clientWidth / this.cellSize)
    this.numCells = this.numRows * this.numCols;
    const gridOpt = {
      numRows: this.numRows,
      numCols: this.numCols,
      cellSize: Opt.cellSize
    }
    const grid   = new Grid(gridOpt);
    for (let i = 0; i < this.numCells; i++) {
      let col    = (i % 100000 % this.numCols) * this.cellSize;
      let row    = Math.floor(i / this.numCols) * this.cellSize;
      let coords = `${row},${col}`
      let cell   = new Cell(coords)
      grid.add(cell)
    }
    this.grid  = grid;
    this.cells = this.grid.cells
    return this.grid;
  }

  gridOverlay() {
    const cells = this.grid
    const grid = document.createElement('div')
    grid.id = 'grid'
    this.grid.each(cell => {
      let gridCell = document.createElement('div')
      gridCell.classList.add('cell')
      gridCell.id = cell.coords
      grid.appendChild(gridCell)
    })
    this.root.appendChild(grid)
  }
}
