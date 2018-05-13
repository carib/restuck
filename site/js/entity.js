export default class Entity {
  constructor(x, y, width, height) {
    this.x        = x
    this.y        = y
    this.lastX    = x
    this.lastY    = y
    this.veloX    = 0
    this.veloY    = 0
    this.friction = 0.9
    this.width    = width
    this.height   = height
    this.color    = '#000'
    this.class    = 'entity'
    this.id       = 'entity'
    this.cells    = new Set()

    this.watchKeys()
    this.update = this.update.bind(this)
    this.render = this.render.bind(this)
  }

  handleKeyPress(e) {}

  positionEntity() {}

  update() {}

  render() {
    let { x, y, width, height } = this
    let { ctx } = this.scene
    ctx.fillStyle = this.color
    ctx.fillRect(x, y, width, height)
  }

  watchKeys() {
    document.addEventListener('keyup', this.handleKeyPress)
    document.addEventListener('keydown', this.handleKeyPress)
  }
}
