import { Wall } from './tiles'
import { Cell, Grid } from './map_grid'

export default class Stage {
  constructor(root) {
    // super()
    this.root     = root
    this.cellSize = document.getElementById('protoCell').clientWidth
    this.entities = new Set()
    this.possibleCollisions = new Set()

    this.render          = this.render.bind(this)
    this.update          = this.update.bind(this)
    this.updateCells     = this.updateCells.bind(this)
    this.getRandomCell   = this.getRandomCell.bind(this)
    this.generateTerrain = this.generateTerrain.bind(this)
  }

  update() {
    this.updateCells()
  }

  render() {

  }

  buildStageBorder() {
    let split
    let row
    let col
    let wall
    this.cells.each(id => {
      split = this.cells.parseYX(id)
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
    const wall = new Wall(x, y, this.cellSize, this.cellSize)
    const coords = `${y},${x}`
    wall.id = 'wall'
    this.scene.add(wall)
    this.cells.get(coords).add(wall)
  }

  generateTerrain() {
    this.buildCellGrid()
    this.buildStageBorder()
    this.gridOverlay()
    const numVoids = 20
    const voidSize = 5
    for (let i = 0; i < numVoids; i++) {
      this.growVoid(voidSize, voidSize)
    }
  }

  growVoid(length, size, startX, startY) {
    if (!size) return;
    let randCell = this.getRandomCell()
    let split    = this.cells.parseYX(randCell)
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
    startX = (startX > 470) ? 460 : startX
    startX = (startX < 0)   ? 20  : startX
    startY = (startY > 310) ? 300 : startY
    startY = (startY < 0)   ? 20  : startY
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
    randomCell = this.cells.getCellAt(mockEnt.y, mockEnt.x)
    if (this.cells.get(randomCell).size() > 0) {
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
          this.cells.get(cell).remove(ent)
        }, this)
        ent.cells.clear()
        Object.values(entityCells).forEach(cell => {
          this.cells.get(cell).add(ent)
        }, this)
        Object.values(entityCells).forEach(cell => {
          ent.cells.add(cell)
          if (this.cells.get(cell).size() > 1) {
            ent.occupiedCells.clear()
            ent.occupiedCells.add(this.cells.get(cell))
          }
        }, this)
      }
    }, this)
  }

  getEntityCells(entity) {
    const { x, y, x2, y2 } = entity
    return {
      topLeft:  this.cells.getCellAt(y, x),
      topRight: this.cells.getCellAt(y, x2),
      btmLeft:  this.cells.getCellAt(y2, x),
      btmRight: this.cells.getCellAt(y2, x2)
    }
  }

  buildCellGrid() {
    this.numRows  = this.root.clientHeight / this.cellSize
    this.numCols  = this.root.clientWidth / this.cellSize
    this.numCells = this.numRows * this.numCols;
    const cells   = new Grid(this.numRows, this.numCosl);

    for (let i = 0; i < this.numCells; i++) {
      let col    = (i % 10000 % this.numCols) * this.cellSize;
      let row    = Math.floor(i / this.numCols) * this.cellSize;
      let coords = `${row},${col}`
      let cell   = new Cell(coords)
      cells.add(cell)
    }
    this.cells = cells;
    return this.cells;
  }

  gridOverlay() {
    const cells = this.cells
    const grid = document.createElement('div')
    grid.id = 'grid'
    this.cells.each(cell => {
      let gridCell = document.createElement('div')
      gridCell.classList.add('cell')
      gridCell.id = cell.coords
      grid.appendChild(gridCell)
    })
    this.root.appendChild(grid)
  }
}
