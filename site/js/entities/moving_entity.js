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
    }
  }

  move() {
    switch (this.activeKey) {
      case 37:
        this.veloX -= this.speed;
        this.direction = 'LEFT'
        break;
      case 38:
        this.veloY -= this.speed;
        this.direction = 'UP'
        break;
      case 39:
        this.veloX += this.speed;
        this.direction = 'RIGHT'
        break;
      case 40:
        this.veloY += this.speed;
        this.direction = 'DOWN'
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
    this.occupiedCells.clear()
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
      case 'LEFT':
        this.veloX = 0
        this.x = this.lastX + 2
        break;
      case 'UP':
        this.veloY = 0
        this.y = this.lastY + 2
        break;
      case 'DOWN':
        this.veloY = 0
        this.y = this.lastY - 2
        break;
      case 'RIGHT':
        this.veloX = 0
        this.x = this.lastX - 2
        break;
      default:

    }
  }

  detectCollision() {
    const { x, y, x2, y2 } = this
    let collision = false
    if (this.occupiedCells.size > 1) {
      this.occupiedCells.forEach(cell => {
        cell.forEach(entity => {
          if (entity !== this) {
            if (x2 < entity.x || y2 < entity.y ||
                x > entity.x2 || y  > entity.y2) {
              collision = false
            } else {
              collision = true
            }
            // this.checkedColliders.add(entity)
          }
        }, this)
      }, this)
    }
    return collision
  }
}
