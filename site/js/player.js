import Entity from './entity'

export default class Player extends Entity {
  constructor(x, y, width, height) {
    super(x, y, width, height)
    this.speed = 0.5
    this.color = '#41f798'
    this.id    = 'player'

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
  }

  updatePosition() {
    this.lastX  = this.x
    this.lastY  = this.y
    this.x     += this.veloX
    this.y     += this.veloY
    this.veloX *= this.friction
    this.veloY *= this.friction
    this.move()
  }

  render() {
    const { x, y, width, height } = this
    const { ctx } = this.scene
    ctx.fillStyle = this.color
    ctx.fillRect(x, y, width, height)
  }
}
