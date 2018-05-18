import { Entity } from '../'

export default class Wall extends Entity {
  constructor(options) {
    super(options)
    this.id = 'wall'
    this.width = options.width
    this.height = options.height
    this.color = options.color
  }

  render() {
    let { x, y, width, height } = this
    let { ctx } = this.scene
    // if (Math.floor(Math.random() * 100000 < 2)) {
    //   ctx.shadowColor = 'black'
    //   ctx.shadowBlur = Math.random() * 100
    //
    // }

    ctx.fillStyle = this.color
    ctx.fillRect(x, y, width, height)
  }
}
