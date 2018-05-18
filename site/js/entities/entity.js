export default class Entity {
  constructor(options) {
    this.coords   = `${options.y},${options.x}`
    this.x        = options.x
    this.y        = options.y
    this.x2       = options.x + options.width
    this.y2       = options.y + options.height
    this.lastX    = options.x
    this.lastY    = options.y
    this.width    = options.width
    this.height   = options.height
    this.halfW    = options.width / 2
    this.halfH    = options.height / 2
    this.thirdW   = options.width / 3
    this.thirdH   = options.height / 3
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
