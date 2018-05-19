

export default class Canvas {
  constructor() {
    this.canvas = document.getElementById('canvas')
    this.ctx    = canvas.getContext('2d')
    window.addEventListener('resize', this.resize)
    this.resize = this.resize.bind(this)
  }

  resize() {
    let width  = document.documentElement.clientWidth
    let height = document.documentElement.clientHeight
    this.canvas.width  = width
    this.canvas.height = height
  }
}
