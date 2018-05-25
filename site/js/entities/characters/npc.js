import { MovingEntity, Entity, Pathfinder, PathMarker } from '../'
import * as Opt from '../../components/options'

export default class NonPlayerCharacter extends MovingEntity {
  constructor(options) {
    super(options)
    this.grid       = null
    this.target     = null
    this.targetXY   = null
    this.pathFound  = false
    this.path       = []
    this.lastPath   = []
    this.listenting = false

    this.navigatePath = this.navigatePath.bind(this)
    this.findTarget = this.findTarget.bind(this)
    this.keyResponse = this.keyResponse.bind(this)
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

  findTarget(target) {
    target = target ? target : this.target.getDetails()
    this.grid = this.scene.stage
    this.pathFound = false
    this.pathfinder = new Pathfinder()
    this.pathfinder.scene = this.scene
    this.pathfinder.initPathfinder(this.grid, this, target)
    if (!this.pathfinder.path) {
      this.getLost()
    } else {
      this.pathfinder.path.forEach(cell => this.path.push(cell))
      if (Opt.uiConfig.pathHighlight) {
        this.highlightPath()
      }
    }
  }

  checkLogs() {
    const logs = Object.values(this.pathfinder.log.sorts)
    const activeLogs = []
    logs.forEach(log => {
      Object.keys(log).length ? activeLogs.push(log) : null
    })
    return activeLogs
  }

  getLost() {
    const logs = this.checkLogs()
    let randomCoords
    let cell
    let log
    if (!logs.length) {
      this.isStuck = true
    } else {
      log = Object.keys(logs[Math.floor(Math.random() * logs.length)])
      randomCoords = log[Math.floor(Math.random() * log.length)]
      if (this.grid.has(randomCoords)) {
        cell = this.grid.get(randomCoords)
        if (cell.isEmpty) {
          this.findTarget(cell)
        }
      } else {
        this.getLost()
      }
    }
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
          this.x = this.lastX + 0.001
          break;
        case 'NORTH':
          this.y = this.lastY + 0.001
          break;
        case 'EAST':
          this.x = this.lastX - 0.001
          break;
        case 'SOUTH':
          this.y = this.lastY - 0.001
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
    let path = this.path.pop()
    this.path.forEach(cell => {
      let pathOptions = {
        path: cell,
        pathName: 'npcToPlayer',
        color: '#ff6347',
        width: this.width,
        height: this.height,
      }
      let pathMark = new PathMarker(pathOptions)
      this.scene.add(pathMark)
    })
  }
}
