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
    this.pathMoves  = []
    this.backTrace  = []
    this.listenting = false

    this.navigatePath = this.navigatePath.bind(this)
    this.findTarget = this.findTarget.bind(this)
    this.keyResponse = this.keyResponse.bind(this)
  }

  keyResponse(e) {
    console.log('keyResponse');
    let keydown = (e.type === 'keydown') ? true : false
    this.activeKey = e.keyCode
    console.log(this.pathMoves);
    console.log(e.type);
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
    console.log('findTarget');
    target = target ? target : this.target.getDetails()
    this.path = []
    this.pathMoves = []
    this.grid = this.scene.stage
    this.pathFound = false
    this.scene.remove(this.pathfinder)
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

  navigatePath() {
    console.log('navigatePath');
    if (!this.pathFound) {
      this.findTarget()
      this.pathFound = true
      this.translatePath()
    }
    if (this.activeKey && this.path.length) {
      this.follow()
      this.updatePosition()
    }
    if (this.path && this.path.length <= 1) {
      this.pathFound = false
    }
    if (!this.pathMoves.length) {
      this.pathFound = false
    }
    if (this.pathMoves.some(el => !el)) {
      this.pathFound = false
    }
  }

  resetPosition() {
    console.log('resetPosition');
    this.veloX = 0
    this.veloY = 0
    this.retrace(this.backTrace)
    // if (this.direction === this.collisionDirection) {
    switch (this.collisionDirection) {
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
    // }
  }

  follow() {
    console.log('follow');
    let dir = this.pathMoves.shift()
    console.log('backtrace',this.backTrace);
    if (!this.lookAheadForWall(dir)) {
      this.direction = dir
    } else {
      this.follow()
    }
    this.backTrace.unshift(dir)
    if (this.backTrace.length > 10) {
      this.backTrace.pop()
    }
  }

  retrace(backTrace) {
    console.log('retrace');
    let dir
    this.pathMoves = []
    for (let i = 0; i < 3; i++) {
      dir = backTrace.shift()
      this.pathMoves.unshift(dir)
    }
    this.direction = this.pathMoves[0]
  }

  translatePath(backTrace) {
    console.log('translatePath');
    let moves = []
    let nextMove, lastMove, dx, dy

    for (let i = 0; i < this.path.length; i++) {
      lastMove = lastMove ? lastMove : this
      nextMove = this.path[i]
      dx = nextMove.x - lastMove.x
      dy = nextMove.y - lastMove.y
      lastMove = nextMove
      if (dx > 0) {
        for (let i = 0; i < 6; i++) {
          moves.push('EAST')
          continue
        }
      }
      if (dx < 0) {
        for (let i = 0; i < 6; i++) {
          moves.push('WEST')
          continue
        }
      }
      if (dy > 0) {
        for (let i = 0; i < 6; i++) {
          moves.push('SOUTH')
          continue
        }
      }
      if (dy < 0) {
        for (let i = 0; i < 6; i++) {
          moves.push('NORTH')
          continue
        }
      }
    }
    // if (this.pathMoves.length > 10) {
    //   let pMoves = this.pathMoves.slice(0, 10)
    //   moves = moves.slice(10, moves.length)
    //   for (let i = 0; i < moves.length; i++) {
    //     pMoves.push(moves[i])
    //   }
    //   moves = pMoves
    // }
    this.pathMoves = moves
  }

  lookAheadForWall(nextMove) {
    console.log('lookAheadForWall');
    let nextCell
    switch (nextMove) {
      case 'WEST':
        nextCell = this.grid.getCellAt(this.y, this.x - this.speed)
        return this.grid.get(nextCell).isWall ? true : false
      case 'NORTH':
        nextCell = this.grid.getCellAt(this.y - this.speed, this.x)
        return this.grid.get(nextCell).isWall ? true : false
      case 'EAST':
        nextCell = this.grid.getCellAt(this.y, this.x + this.speed)
        return this.grid.get(nextCell).isWall ? true : false
      case 'SOUTH':
        nextCell = this.grid.getCellAt(this.y + this.speed, this.x)
        return this.grid.get(nextCell).isWall ? true : false
    }

  }

  checkLogs() {
    console.log('checkLogs');
    const logs = Object.values(this.pathfinder.log.sorts)
    const activeLogs = []
    logs.forEach(log => {
      Object.keys(log).length ? activeLogs.push(log) : null
    })
    return activeLogs
  }

  getLost() {
    console.log('getLost');
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
