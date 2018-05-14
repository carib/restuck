import { Wall } from './tiles'
import { Cell, Grid } from './map_grid'

export default class Stage {
  constructor(root) {
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
    Object.keys(this.cells).forEach(id => {
      split = this.parseYX(id)
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
    this.cells[coords].add(wall)
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
    let split    = this.parseYX(randCell)
    startY = (startY) ? startY : split.y
    startX = (startX) ? startX : split.x
    const cSize = this.cellSize
    if (!startX) {
      debugger
    }
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
    mockEnt.x2 = col * this.cellSize + this.cellSize
    mockEnt.y2 = row * this.cellSize + this.cellSize
    randomCell = this.getEntityCells(mockEnt).topLeft
    if (this.cells[randomCell].size > 0) {
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
          this.cells[cell].delete(ent)
        })
        ent.cells.clear()
        Object.values(entityCells).forEach(cell => {
          this.cells[cell].add(ent)
        })
        Object.values(entityCells).forEach(cell => {
          ent.cells.add(cell)
          if (this.cells[cell].size > 1) {
            ent.occupiedCells.clear()
            ent.occupiedCells.add(this.cells[cell])
          }
        })
      }
    }, this)
  }

  buildCellGrid() {
    this.numRows = this.root.clientHeight / this.cellSize
    this.numCols = this.root.clientWidth / this.cellSize
    this.numCells = this.numRows * this.numCols;
    const cells = {};

    for (let i = 0; i < this.numCells; i++) {
      let col = (i % 10000 % this.numCols) * this.cellSize;
      let row = Math.floor(i / this.numCols) * this.cellSize;
      let coords = `${row},${col}`
      cells[coords] = new Set();
    }
    this.cells = cells;
    return this.cells;
  }

  gridOverlay() {
    const cells = Object.keys(this.cells)
    const grid = document.createElement('div')
    grid.id = 'grid'
    for (let cell of cells) {
      let gridCell = document.createElement('div')
      gridCell.classList.add('cell')
      gridCell.id = cell
      grid.appendChild(gridCell)
    }
    this.root.appendChild(grid)
  }

///////////////////////// FOR CELL GRID:
  parseYX(coordString) {
    let split
    let row
    let col
    split = coordString.match(/^(\d{0,3}),(\d{0,3}$)/)
    row   = parseInt(split[1])
    col   = parseInt(split[2])
    return { x: col, y: row }
  }

  getEntityCells(entity) {
    const { x, y, x2, y2 } = entity
    return {
      topLeft:  this.getCellAt(x, y),
      topRight: this.getCellAt(x2, y),
      btmLeft:  this.getCellAt(x, y2),
      btmRight: this.getCellAt(x2, y2)
    }
  }

  getCellAt(x, y) {
    const cellX = Math.floor(x - (x % this.cellSize))
    const cellY = Math.floor(y - (y % this.cellSize))
    return `${cellY},${cellX}`
  }
}
