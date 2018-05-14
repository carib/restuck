export default class Entity {
  constructor(x, y, width, height) {
    this.x        = x
    this.y        = y
    this.x2       = x + width
    this.y2       = y + height
    this.lastX    = x
    this.lastY    = y
    this.width    = width
    this.height   = height
    this.color    = '#000'
    this.class    = 'entity'
    this.id       = 'entity'
    this.cells    = new Set()
    this.occupiedCells = new Set()

    this.update = this.update.bind(this)
    this.render = this.render.bind(this)
  }

  positionEntity() {}

  update() {}

  render() {
    let { x, y, width, height } = this
    let { ctx } = this.scene
    ctx.fillStyle = this.color
    ctx.fillRect(x, y, width, height)
  }
}
