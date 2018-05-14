export default class Cell {
  constructor(coordString) {
    // String coordinates as 'yCoord,xCoord'
    this.coords  = coordString
    // Is this cell a 'Sentinel' cell of grid
    this.isFirst = false
    this.isLast  = false
    // Adjacent cells
    this.links   = new Set()
    // Body/Contents of this cell
    this.cell    = new Set()
    // This cell y,x coords as Integers
    this.y       = null
    this.x       = null
    // Individual cells from links set if present, otherwise null
    this.w       = null
    this.n       = null
    this.e       = null
    this.s       = null

    this.size   = this.size.bind(this)
    this.has    = this.has.bind(this)
    this.each   = this.each.bind(this)
    this.add    = this.add.bind(this)
    this.remove = this.remove.bind(this)
    this.clear  = this.clear.bind(this)
  }

  size() {
    return this.cell.size
  }

  has(value, isId) {
    if (isId) {
      this.cell.each(entity => (entity.id === value))
    }
    return this.cell.has(value)
  }

  each(callback) {
    this.cell.forEach(entity => {
      callback(entity)
    }, this)
  }

  add(entity) {
    this.cell.add(entity)
  }

  remove(entity) {
    this.cell.delete(entity)
  }

  clear() {
    this.cell.forEach(entity => {
      if (entity.id !== 'wall') {
        this.cell.delete(entity)
      }
    }, this)
  }
}
