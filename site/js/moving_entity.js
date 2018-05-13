import Entity from './entity'

export default class MovingEntity extends Entity {
  constructor(x, y, width, height) {
    super(x, y, width, height)
    this.speed = 0.5

    this.update = this.update.bind(this)
    this.updatePosition = this.updatePosition.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress(e) {
    let keydown = (e.type === 'keydown') ? true : false
    if (keydown) {
      this.activeKey = e.keyCode
    } else {
      this.activeKey = null
    }
  }

  move() {
    switch (this.activeKey) {
      case 37: this.veloX -= this.speed; break;
      case 38: this.veloY -= this.speed; break;
      case 39: this.veloX += this.speed; break;
      case 40: this.veloY += this.speed; break;
    }
  }

  update() {
    this.updatePosition()
    if (this.detectCollision()) {
      this.resetPosition()
    }
  }

  updatePosition() {
    this.lastX  = this.x
    this.lastY  = this.y
    this.lastX2 = this.x2
    this.lastY2 = this.y2
    this.x     += this.veloX
    this.y     += this.veloY
    this.veloX *= this.friction
    this.veloY *= this.friction
    this.x2     = this.x + this.width
    this.y2     = this.y + this.height
    this.move()
  }

  resetPosition() {
    this.x  = this.lastX
    this.y  = this.lastY
    this.x2 = this.x + this.width
    this.y2 = this.y + this.height
    this.veloX = 0
    this.veloY = 0
  }

  detectCollision() {
    const { x, y, x2, y2 } = this
    let collision;
    let collider;
    if (this.occupiedCells.size > 0) {
      this.occupiedCells.forEach(cell => {
        cell.forEach(entity => {
          if (entity !== this) {
            if (x2 < entity.x || y2 < entity.y ||
               x  > entity.x2 || y  > entity.y2) {
              collision = false
            } else {
              collision = true
              collider  = entity
            }
          }
        }, this)
      }, this)
    }
    return collision
  }
}
