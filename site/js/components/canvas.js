export default class Canvas {
  constructor(root) {
    this.root   = root
    this.canvas = document.getElementById('canvas')
    this.ctx    = canvas.getContext('2d')
    window.addEventListener('resize', this.resize)
    this.resize = this.resize.bind(this)
  }

  resize() {
    let width = this.root.clientWidth
    let height = this.root.clientHeight
    this.canvas.width  = width
    this.canvas.height = height
  }
}
