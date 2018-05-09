export default class Display {
  constructor(canvas) {
    this.buffer  = document.createElement('canvas').getContext('2d')
    this.ctx     = canvas.getContext('2d')

    this.render       = this.render.bind(this)
    this.resize       = this.resize.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  render() {
    const { buffer, ctx }     = this
    const { canvas }          = buffer
    const { width, height }   = ctx.canvas
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, width, height)
  }

  resize(e) {
    let height
    let width
    height = document.documentElement.clientHeight
    width  = document.documentElement.clientWidth

    this.ctx.canvas.height = height - 32
    this.ctx.canvas.width  = width - 32

    this.render()
  }

  handleResize(e) {
    this.resize(e)
  }
}
