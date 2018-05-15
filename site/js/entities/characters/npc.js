import { MovingEntity, Entity, Pathfinder } from '../'

export default class NonPlayerCharacter extends MovingEntity {
  constructor(x, y, width, height) {
    super(x, y, width, height)
    this.grid       = null
    this.target     = null
    this.targetXY   = null
    this.pathFound  = false
    this.pathfinder = new Pathfinder
    this.path       = []
  }

    keyResponse(e) {
      let keydown = (e.type === 'keydown') ? true : false
      this.activeKey = e.keyCode
      if (keydown) {
        this.navigatePath()
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

    navigatePath() {
      if (this.path && this.path.length === 1) {
        this.pathFound = false
      }
      if (!this.pathFound) {
        this.findTarget()
        this.pathFound = true
      }
      if (this.activeKey) {
        this.updatePosition()
      }
      const { x, y } = this.path.shift()
      let dx = Math.floor(x - this.x)
      let dy = Math.floor(y - this.y)
      if (dx > 0) {
        this.direction = 'EAST'
        return
      }
      if (dx < 0) {
        this.direction = 'WEST'
        return
      }
      if (dy > 0) {
        this.direction = 'SOUTH'
        return
      }
      if (dy < 0) {
        this.direction = 'NORTH'
        return
      }
    }

    translatePath() {

    }

    findTarget() {
      this.pathfinder.initPathfinder(this.grid, this, this.target)
      this.pathfinder.path.forEach(cell => this.path.push(cell))
    }

    highlightPath() {
      this.pathfinder.path.pop()
      this.pathfinder.path.forEach(cell => {
        let ent = new Entity(cell.x, cell.y, 10, 10)
        if (cell.coords !== player.coords) {
          this.scene.add(ent)
        }
        ent.color = '#c6ece9'
      })
    }
}
