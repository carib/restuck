export default class Canvas {
  constructor(root) {
    this.root   = root
    this.canvas = document.getElementById('canvas')
    this.ctx    = canvas.getContext('2d')
    window.addEventListener('resize', this.resize)
    this.resize = this.resize.bind(this)
    this.resize()
  }

  resize() {
    // debugger
    this.canvas.width  = this.root.clientWidth
    this.canvas.height = this.root.clientHeight
  }
}
