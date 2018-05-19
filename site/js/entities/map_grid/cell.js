import * as Opt from '../../components/options'

export default class Cell {
  constructor(coordString) {
    this.coords  = coordString
    this.isFirst = false
    this.isLast  = false
    this.links   = new Set()
    this.cell    = new Set()
    this.mCost   = 1
    this.y       = null
    this.x       = null
    this.logType = 'cell'

    this.has    = this.has.bind(this)
    this.add    = this.add.bind(this)
    this.size   = this.size.bind(this)
    this.each   = this.each.bind(this)
    this.clear  = this.clear.bind(this)
    this.remove = this.remove.bind(this)
  }

  size() {
    return this.cell.size
  }

  isEmpty() {
    return !this.size()
  }

  has(value) {
    if (typeof value === 'string') {
      let result
      this.cell.forEach(entity => {
        if (!entity) {
          return false
        }
        result = entity.id === value
      })
      return result
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

  render() {
    let { x, y } = this
    let { ctx } = this.scene

    ctx.strokeStyle = '#dadada'
    ctx.strokeRect(x, y, Opt.cellSize, Opt.cellSize)
  }
}
