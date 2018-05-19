export default class PathMark {
  constructor(options) {
    this.path          = options.path
    this.pathName      = options.pathName
    this.color         = options.color
    this.width         = options.width
    this.height        = options.height
    this.id            = 'mark'
    this.x             = options.path.x
    this.y             = options.path.y
    this.x2            = this.x + this.width
    this.y2            = this.y + this.height
    this.cells         = new Set()
    this.occupiedCells = new Set()
  }

  update() {
    setTimeout(() => {
      this.scene.remove(this)
    }, 1000)
  }

  render() {
  let { x, y } = this.path
  let { ctx } = this.scene
  ctx.fillStyle = '#e62c22'
  ctx.fillRect(x, y, this.width, this.height)
  }
}
