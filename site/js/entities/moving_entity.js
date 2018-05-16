import Entity from './entity'

export default class MovingEntity extends Entity {
  constructor(x, y, width, height) {
    super(x, y, width, height)
    this.speed    = 0.5
    this.veloX    = 0
    this.veloY    = 0
    this.friction = 0.9

    this.update         = this.update.bind(this)
    this.updatePosition = this.updatePosition.bind(this)
  }

  move() {
    if (this.activeKey) {
      switch (this.direction) {
        case 'WEST':
          this.veloX -= this.speed;
          break;
        case 'NORTH':
          this.veloY -= this.speed;
          break;
        case 'EAST':
          this.veloX += this.speed;
          break;
        case 'SOUTH':
          this.veloY += this.speed;
          break;
      }
    }
  }

  update() {
    this.updatePosition()
  }

  updatePosition() {
    if (this.detectCollision()) {
      this.resetPosition()
    }
    this.lastX  = this.x
    this.lastY  = this.y
    this.lastX2 = this.x2
    this.lastY2 = this.y2
    this.move()
    this.x     += this.veloX
    this.y     += this.veloY
    this.veloX *= this.friction
    this.veloY *= this.friction
    this.x2     = this.x + this.width
    this.y2     = this.y + this.height
  }

  resetPosition() {
    this.veloX = 0
    this.veloY = 0
    if (this.direction === this.collisionDirection) {
      switch (this.direction) {
        case 'WEST':
          this.x = this.lastX + 0.1
          break;
        case 'NORTH':
          this.y = this.lastY + 0.1
          break;
        case 'EAST':
          this.x = this.lastX - 0.1
          break;
        case 'SOUTH':
          this.y = this.lastY - 0.1
          break;
      }
    }
  }

  detectCollision(ent1, ent2) {
    ent1 = (ent1) ? ent1 : this
    const { x, y, x2, y2 } = ent1
    let collision = false
    if (this.occupiedCells.size > 0) {
      this.occupiedCells.forEach(cell => {
        cell.each(entity => {
          if (entity !== this) {
            if (x2 < entity.x || y2 < entity.y ||
                x > entity.x2 || y > entity.y2) {
              collision = false
            } else {
              collision = true
              this.collisionDirection = this.direction
            }
          }
        }, this)
      }, this)
    }
    return collision
  }
}
