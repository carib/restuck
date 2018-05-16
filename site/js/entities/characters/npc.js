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
    this.lastPath   = []
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

    findTarget() {
      this.pathfinder.initPathfinder(this.grid, this, this.target)
      this.pathfinder.path.forEach(cell => this.path.push(cell))
    }

    navigatePath() {
      if (this.path && this.path.length <= 1) {
        this.pathFound = false
      }
      if (!this.pathFound) {
        this.findTarget()
        this.pathFound = true
      }
      if (this.activeKey && this.path.length) {
        this.translatePath()
        this.updatePosition()
        this.lastPath = []
      }
    }

    resetPosition() {
      this.veloX = 0
      this.veloY = 0
      this.translatePath(this.lastPath)
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

    follow(path) {
      let dx = this.target.x - this.x,
          dy = this.target.y - this.y,
          lastX = this.x,
          lastY = this.y,
          absDX = Math.abs(dx),
          absDY = Math.abs(dy)
      for (let i = 0; i < (path.length / 3); i++) {
        this.lastPath.unshift(path.shift())
        let { x, y } = this.lastPath[0]
        dx += Math.floor(x - lastX)
        dy += Math.floor(y - lastY)
        lastX = x
        lastY = y
      }
      return {
        absDX: absDX, absDY: absDY,
        dx: dx, dy: dy
      }
    }

    retrace(path) {
      path = path.slice(0)
      let targetXY = path.slice(path.length - 1)
      let dx = targetXY.x - this.x,
          dy = targetXY.y - this.y,
          lastX = this.x,
          lastY = this.y,
          absDX = Math.abs(dx),
          absDY = Math.abs(dy)
      this.lastPath = []
      for (let i = 0; i < (path.length / 3); i++) {
        this.lastPath.unshift(path.shift())
        let { x, y } = this.lastPath[0]
        dx += Math.floor(x - lastX)
        dy += Math.floor(y - lastY)
        lastX = x
        lastY = y
      }
      return {
        absDX: absDX, absDY: absDY,
        dx: dx, dy: dy
      }
    }

    translatePath(path) {
      let pathDeltas = path ? this.retrace(path) : this.follow(this.path),
          { absDX, absDY, dx, dy } = pathDeltas
      if (absDX > absDY) {
        this.veloX = 0
        if (dx > 0) {
          this.direction = 'EAST'
          return
        }
        if (dx < 0) {
          this.direction = 'WEST'
          return
        }
      }
      if (absDX < absDY) {
        this.veloY = 0
        if (dy > 0) {
          this.direction = 'SOUTH'
          return
        }
        if (dy < 0) {
          this.direction = 'NORTH'
          return
        }
      }
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
