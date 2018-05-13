import { Entity } from './index'

export default class Stage {
  constructor(root) {
    this.root = root
    this.cellSize = document.getElementById('protoCell').clientWidth
    this.entities = new Set()
    this.possibleCollisions = new Set()

    this.render = this.render.bind(this)
    this.update = this.update.bind(this)
    this.updateCells = this.updateCells.bind(this)
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
      split = id.match(/^(\d{0,3}),(\d{0,3}$)/)
      row = parseInt(split[1])
      col = parseInt(split[2])
      if (row === 0 || col === 0 ||
          row === this.numRows * this.cellSize ||
          col === this.numCols * this.cellSize) {
          
        wall = new Entity(row, col, this.cellSize, this.cellSize)
        wall.id = 'wall'
        this.scene.add(wall)
        this.cells[id].add(wall)
      }
    })
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
            ent.occupiedCells.add(this.cells[cell])
          }
        })
      }
    }, this)
  }

  getEntityCells(entity) {
    const { x, y, width, height } = entity
    const x2 = x + width
    const y2 = y + height
    return {
      topLeft:  this.getOccupiedCellXY(x, y),
      topRight: this.getOccupiedCellXY(x2, y),
      btmLeft:  this.getOccupiedCellXY(x, y2),
      btmRight: this.getOccupiedCellXY(x2, y2)
    }
  }

  getOccupiedCellXY(x, y) {
    const cellX = Math.floor(x - (x % this.cellSize))
    const cellY = Math.floor(y - (y % this.cellSize))
    return `${cellX},${cellY}`
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
}
