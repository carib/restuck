import Heap from './heap'

export default class Pathfinder {
  constructor() {
    this.open   = new Heap()
    this.closed = new Map()
    this.cost   = 0

    this.log = {
      current: {},
      cost: {},
      nixed: {},
      opened: {},
      parented: {}
    }
  }

  initGrid(grid) {
    const cells = new Map()
    this.goalXY = grid.parseYX(this.target.coords)
    grid.cells.forEach(cell => {
      cells.set(cell.coords, this.newCellNode(cell))
    }, this)
    this.grid   = grid
    this.cells  = cells
    this.start  = this.openNode(this.entity.coords)
    this.goal   = this.cells.get(this.target.coords)
    return cells
  }

  initPathfinder(grid, entity, target) {
    this.open.clear()
    this.target = target
    this.entity = entity
    this.cost   = 0

    this.initGrid(grid)
    this.findPath()
  }

  rebuildPath() {
    const path = []
    let cell = this.goal
    while (cell !== this.start) {
      path.unshift(cell)
      cell = cell.parent
      if (cell === null) {
        break
      }
    }
    this.path = path
    console.log(this.log);
    return path
  }

  findPath() {
    let current
    let cost
    let i = 0
    while (this.open.size() > 1) {
      current = this.getNext()
      console.log(`Visiting: ${i}`, current);
      i++
      this.log.current[current.coords] = current
      if (current.coords === this.goal.coords) {
        return this.rebuildPath()
      }
      for (let link of current.linked) {
        cost = current.g + this.findMCost(current, link)
        this.log.cost[current.coords] = cost
        if (link.isOpen && cost < this.getGScore(link)) {
          link.isOpen = false
          this.log.nixed[link.coords] = link
          continue
        }
        if (link.isClosed && cost > this.getGScore(link)) {
          this.openNode(link.coords)
          link.parent = current
          this.log.opened[link.coords] = link
          continue
        }
        if (!link.isOpen && !link.isClosed) {
          cost = link.g
          this.cost += cost
          link.parent = current
          this.openNode(link.coords)
          this.log.parented[link.coords] = link
        }
      }
    }
    console.log(`NO PATH EXISTS: ${this.start.coords}->${this.goal.coords}`);
    return false
  }

  runTest() {
    let g = stage.grid
    g = this.initGrid(g)
    this.openNode('30,10')
    let n = this.getNext()
    return n
  }

  openNode(coords) {
    const cell = this.cells.get(coords)
    if (cell.isClosed) {
      this.closed.delete(coords)
      cell.isClosed = false
    }
    cell.isOpen = true
    this.open.addNew(cell)
    return cell
  }

  getNext() {
    let node = this.open.remove()
    let cell = this.cells.get(node.cell)
    let linkNodes = []
    if (true) {

    }
    if (cell.isWall || !cell.isOpen || cell.isClosed) {
      return this.getNext()
    }
    this.closeNode(node)
    cell.visited = true
    cell.g = this.getGScore(cell)
    cell.f = cell.g + cell.h
    node.score = cell.f
    cell.linked.map(link => {
      if (typeof link === 'string') {
        let linkNode = this.cells.get(link)
        if (linkNode && !linkNode.visited && !linkNode.isWall) {
          linkNodes.push(linkNode)
        }
      }
    }, this)
    if (linkNodes.length > 0) {
      cell.linked = linkNodes
    } else {
      return this.getNext()
    }
    if (typeof cell.linked[0] === 'string') {
      debugger
    }
    return cell
  }

  closeNode(node) {
    let cell      = this.cells.get(node.cell)
    cell.isOpen   = false
    cell.isClosed = true
    this.closed.set(node.cell, node)
  }

  getGScore(cell) {
    if (cell.parent === null) {
      return 0
    }
    return cell.g + cell.parent.g + cell.m
  }

  getHScore(x, y) {
    // if (!this.goalXY) {
    //   let goalXY = { x: 110, y: 60 }
    //   const d1 = Math.abs(goalXY.x - x)
    //   const d2 = Math.abs(goalXY.y - y)
    //   return d1 + d2
    // }
    // debugger
    const d1 = Math.abs(this.goalXY.x - x)
    const d2 = Math.abs(this.goalXY.y - y)
    return d1 + d2
  }

  findMCost(fromCell, toCell) {
    return fromCell.m + toCell.m
  }

  newCellNode(gridCell) {
    const { coords, links, x, y, mCost } = gridCell
    const newCellNode = {}

    newCellNode.coords = coords
    newCellNode.x = x
    newCellNode.y = y
    newCellNode.f = 0
    newCellNode.g = 0
    newCellNode.h = this.getHScore(x, y)
    newCellNode.m = mCost
    newCellNode.isOpen   = false
    newCellNode.isClosed = false
    newCellNode.visited  = false
    newCellNode.isStart  = (coords === this.entity.coords) ? true : false
    newCellNode.isGoal   = (coords === this.target.coords) ? true : false
    newCellNode.isWall   = gridCell.has('wall')
    newCellNode.parent   = null
    newCellNode.linked   = []

    links.forEach(coords => newCellNode.linked.push(coords))
    return newCellNode
  }
}
