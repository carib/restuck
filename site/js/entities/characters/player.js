import { MovingEntity } from '../'

export default class Player extends MovingEntity {
  constructor(options) {
    super(options)
    this.speed    = options.speed
    this.friction = options.friction
    this.color    = options.color
    this.logType  = options.logType
  }

  getDetails() {
    return this
  }

  keyResponse(e) {
    let keydown = (e.type === 'keydown') ? true : false
    if (keydown) {
      this.activeKey = e.keyCode
      switch (e.keyCode) {
        case 37:
          this.direction = 'WEST'
          break;
        case 38:
          this.direction = 'NORTH'
          break;
        case 39:
          this.direction = 'EAST'
          break;
        case 40:
          this.direction = 'SOUTH'
          break;
      }
    } else {
      this.activeKey = null
      if (this.activeKey === 37 || this.activeKey === 39) {
        this.veloX -= this.speed / 3
      }
      if (this.activeKey === 38 || this.activeKey === 40) {
        this.veloY -= this.speed / 3
      }
    }
  }
}
