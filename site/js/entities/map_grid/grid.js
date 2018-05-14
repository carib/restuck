export default class Grid {
  constructor(numRows, numCols) {
    this.rows     = numRows
    this.cols     = numCols
    this.first    = null
    this.last     = null
    this.cellSize = document.getElementById('protoCell').clientWidth
    this.cells    = new Map()
  }

  each(callback) {
    this.cells.forEach(cell => callback)
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

  replace(cell) {
    this.remove(cell)
    this.add(cell)
  }

  get(cell) {
    if (typeof cell === 'string') {
      return this.cells.get(cell)
    }
    return this.cells.get(cell.coords)
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
    split = coordString.match(/^(\d{0,3}),(\d{0,3}$)/)
    row   = parseInt(split[1])
    col   = parseInt(split[2])
    return { y: row, x: col }
  }

  getCellAt(y, x) {
    const cellY = (y <= 0) ? 0 : Math.floor(y - (y % this.cellSize))
    const cellX = (x <= 0) ? 0 : Math.floor(x - (x % this.cellSize))
    const cell  = `${cellY},${cellX}`
    if (this.get(cell)) {
      return cell
    }
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

  getLinks(...arg) {
    const delta = this.cellSize
    let intYX
    let y
    let x
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
    return {
      west:  this.getCellAt(y, x - delta),
      north: this.getCellAt(y - delta, x),
      east:  this.getCellAt(y, x + delta),
      south: this.getCellAt(y + delta, x),
    }
  }
}
