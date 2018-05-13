export default class Stage {
  constructor(root) {
    this.root = root
    this.cellSize = 32
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

  updateCells() {
    let entityCells
    for (let ent of this.entities) {
      if (ent !== this && ent.id !== 'wall') {
        entityCells = this.getEntityCells(ent)
        ent.cells.forEach(cell => {
          this.cells[cell].delete(ent)
        })
        ent.cells.clear()
        Object.values(entityCells).forEach(cell => {
          this.cells[cell].add(ent)
          if (this.cells[cell].size > 1) {
            this.possibleCollisions.add(cell)
          }
        })
        Object.values(entityCells).forEach(cell => {
          ent.cells.add(cell)
          ent.occupiedCells.add(this.cells[cell])
        })
      }
    }
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
    const rows = this.root.clientHeight / this.cellSize
    const cols = this.root.clientWidth / this.cellSize
    let numCells = rows * cols;
    const cells = {};

    for (let i = 0; i < numCells; i++) {
      let col = (i % 1000 % cols) * this.cellSize;
      let row = Math.floor(i/cols) * this.cellSize;
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
