import Entity from './entity'

export default class MovingEntity extends Entity {
  constructor(x, y, width, height) {
    super(x, y, width, height)
    this.speed    = 0.5
    this.veloX    = 0
    this.veloY    = 0
    this.friction = 0.9
    this.checkedColliders = new Set()
    this.watchKeys()
    this.update = this.update.bind(this)
    this.updatePosition = this.updatePosition.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  watchKeys() {
    document.addEventListener('keyup', this.handleKeyPress)
    document.addEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress(e) {
    let keydown = (e.type === 'keydown') ? true : false
    if (keydown) {
      this.activeKey = e.keyCode
    } else {
      this.activeKey = null
      // this.direction = null
    }
  }

  move() {
    switch (this.activeKey) {
      case 37:
        this.veloX -= this.speed;
        this.direction = 'WEST'
        break;
      case 38:
        this.veloY -= this.speed;
        this.direction = 'NORTH'
        break;
      case 39:
        this.veloX += this.speed;
        this.direction = 'EAST'
        break;
      case 40:
        this.veloY += this.speed;
        this.direction = 'SOUTH'
        break;
    }
  }

  update() {
    this.lastX  = this.x
    this.lastY  = this.y
    this.lastX2 = this.x2
    this.lastY2 = this.y2
    this.move()
    if (this.detectCollision()) {
      this.resetPosition()
      this.checkedColliders.clear()
    }
    this.updatePosition()
  }

  updatePosition() {
    this.x     += this.veloX
    this.y     += this.veloY
    this.veloX *= this.friction
    this.veloY *= this.friction
    this.x2     = this.x + this.width
    this.y2     = this.y + this.height
  }

  resetPosition() {
    switch (this.direction) {
      case 'WEST':
        this.veloX = 0
        this.x = this.lastX + 0.001
        this.veloX += this.speed
        break;
      case 'NORTH':
        this.veloY = 0
        this.y = this.lastY + 0.001
        this.veloY += this.speed
        break;
      case 'EAST':
        this.veloX = 0
        this.x = this.lastX - 0.001
        this.veloX -= this.speed
        break;
      case 'SOUTH':
        this.veloY = 0
        this.y = this.lastY - 0.001
        this.veloY -= this.speed
        break;
    }
  }

  detectCollision() {
    const { x, y, x2, y2 } = this
    let collision = false
    if (this.occupiedCells.size > 0) {
      // debugger
      this.occupiedCells.forEach(cell => {
        cell.each(entity => {
          if (entity !== this) {
            if (x2 < entity.x || y2 < entity.y ||
                x > entity.x2 || y  > entity.y2) {
              collision = false
            } else {
              collision = true
            }
          }
        }, this)
      }, this)
    }
    return collision
  }
}
