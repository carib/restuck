import { Cell } from '../'

import * as Opt from '../../components/options'

export default class Grid {
  constructor(options) {
    this.rows     = options.numRows
    this.cols     = options.numCols
    this.cellSize = options.cellSize
    this.height   = Opt.stage.height
    this.width    = Opt.stage.width
    this.first    = null
    this.last     = null
    this.cells    = new Map()

    this.getCellAt = this.getCellAt.bind(this)
  }

  each(callback) {
    if (callback) {
      this.cells.forEach(cell => callback(cell))
    }
  }

  eachKey(callback) {
    if (callback) {
      for (var i = 0; i < this.cells.keys().length; i++) {
        this.apply(this.cells.keys()[i], callback)
      }
    } else {
      return this.cells.keys()
    }
  }

  has(cell) {
    if (typeof cell === 'string') {
      return this.cells.has(cell)
    }

    return this.cells.has(cell.coords)
  }

  add(cell) {
    if (typeof cell === 'string' && !this.has(cell)) {
      this.cells.set(cell.coords, cell)
      return
    }
    if (cell instanceof Array) {
      cell.forEach(el => this.add(el))
    } else {
      if (!this.cells[cell.coords]) {
        this.cells.set(cell.coords, cell)
        this.setLinks(cell)
        this.isFirstCell(cell)
        this.isLastCell(cell)
      }
    }
  }

  remove(cell) {
    if (typeof cell === 'string' && this.cells.has(cell)) {
      this.cells.delete(cell)
      return
    }
    this.cells.delete(cell.coords)
  }

  get(cell) {
    if (typeof cell === 'string') {
      return this.cells.get(cell)
    }
    if (!cell || !cell.coords) {
      debugger
    }
    return this.cells.get(cell.coords)
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
    for (let i = 0; i < this.numCells; i++) {
      let col    = (i % 1000000 % this.numCols) * Opt.cellSize;
      let row    = Math.floor(i / this.numCols) * Opt.cellSize;
      let coords = `${row},${col}`
      let cell   = new Cell(coords)
      cell.grid = this
      this.add(cell)
    }
    return this;
  }

  isFirstCell(cell) {
    if (!this.first ||
        cell.y < this.first.y ||
        cell.y === this.first.y && cell.x < this.last.x) {
      if (this.first) {
        this.first.isFirst = false
      }
      this.first   = cell
      cell.isFirst = true
      return true
    }
    return false
  }

  isLastCell(cell) {
    if (!this.last ||
        cell.y > this.last.y ||
        cell.y === this.last.y && cell.x > this.last.x) {
      if (this.last) {
        this.last.isLast = false
      }
      this.last   = cell
      cell.isLast = true
      return true
    }
    return false
  }

  parseYX(coordString) {
    let split
    let row
    let col
    split = coordString.match(/^(\d{0,}),(\d{0,}$)/)
    row   = parseInt(split[1])
    col   = parseInt(split[2])
    return { y: row, x: col }
  }

  getCellAt(y, x) {
    if (y < 0 ||
        x < 0 ||
        y > this.rows * this.cellSize ||
        x > this.cols * this.cellSize) {
      return
    }
    const cellY = Math.floor(y - (y % this.cellSize))
    const cellX = Math.floor(x - (x % this.cellSize))
    const cell  = `${cellY},${cellX}`
    if (this.get(cell)) {
      return cell
    }
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
    randomCell = this.getCellAt(mockEnt.y, mockEnt.x)
    if (!randomCell) {
      debugger
      this.getCellAt(mockEnt.y, mockEnt.x)
    }
    if (this.get(randomCell).size() > 0) {
      return this.getRandomCell()
    }
    return randomCell
  }

  setLinks(cell) {
    const intYX = this.parseYX(cell.coords)
    const links = this.getLinks(cell.coords)
    cell.y = intYX.y
    cell.x = intYX.x
    if (links.west) {
      cell.w = links.west
    }
    if (links.north) {
      cell.n = links.north
    }
    if (links.east) {
      cell.e = links.east
    }
    if (links.south) {
      cell.s = links.south
    }
    Object.values(links).forEach(link => {
      if (link) {
        cell.links.add(link)
      }
    })
  }

  linkGridCells() {
    this.cells.forEach(cell => this.setLinks(cell))
  }

  getLinks(...arg) {
    const delta = this.cellSize
    let intYX
    let y
    let x
    let lastY
    let lastX
    let nextY
    let nextX
    arg = Array.from(arg)
    if (typeof arg[0] === 'number') {
      y = arg[0]
      x = arg[1]
    }
    if (typeof arg[0] === 'string') {
      intYX = this.parseYX(arg[0])
      y = intYX.y
      x = intYX.x
    }
    if (arg[0].constructor.name === 'Cell') {
      return arg[0].links
    }
    if (typeof arg[0] === 'object') {
      y = arg[0].y
      x = arg[0].x
    }
    lastY = y - delta
    lastX = x - delta
    nextY = y + delta
    nextX = x + delta
    return {
      west:  this.getCellAt(y, lastX),
      north: this.getCellAt(lastY, x),
      east:  this.getCellAt(y, nextX),
      south: this.getCellAt(nextY, x),
    }
  }
}
