import Heap from './heap'

export default class Pathfinder {
  constructor() {
    this.open   = new Heap()
    this.closed = new Map()
    this.cost   = 0
  }

  initGrid(grid) {
    const cells = new Map()
    this.grid = grid
    this.grid.cells.forEach(cell => {
      cells.set(cell.coords, this.newCellNode(cell))
    }, this)
    this.cells = cells
    return cells
  }

  initPathfinder(grid, startCoords, targetCoords) {
    this.open.clear()
    this.initGrid(grid)
    this.cost   = 0
    this.goal   = this.cells.get(targetCoords)
    this.start  = this.openNode(startCoords)
    this.goalXY = this.grid.parseYX(targetCoords)
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
    return path
  }

  findPath() {
    let current
    let cost
    while (this.open.size() > 1) {
      current = this.getNext()
      if (current.coords === this.goal.coords) {
        console.log('TRUE!');

        return this.rebuildPath()
      }
      for (let link of current.linked) {
        cost = current.g + this.findMCost(current, link)
        if (link.isClosed && cost < this.getGScore(link)) {
          this.openNode(link.coords)
          link.parent = current
          continue
        }
        if (link.isOpen && cost < this.getGScore(link)) {
          link.isClosed
          continue
        }
        if (!link.isOpen && !link.isClosed) {
          cost = link.g
          link.parent = current
          this.openNode(link.coords)
        }
      }
    }
    return this.open.sort()
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
    if (cell.isClosed) {
      return this.getNext()
    }
    this.closeNode(node)
    cell.visited = true
    cell.g = this.getGScore(cell)
    cell.f = cell.g + cell.h
    node.score = cell.f
    cell.linked.map(link => {
      let linkNode = this.cells.get(link)
      linkNodes.push(linkNode)
    }, this)
    cell.linked = linkNodes
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
    if (!this.goalXY) {
      let goalXY = { x: 110, y: 60 }
      const d1 = Math.abs(goalXY.x - x)
      const d2 = Math.abs(goalXY.y - y)
      return d1 + d2
    }
    const d1 = Math.abs(this.goalXY.x - x)
    const d2 = Math.abs(this.goalXY.y - y)
    return d1 + d2
  }

  findMCost(fromCell, toCell) {
    return fromCell.mCost + toCell.mCost
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
    newCellNode.isStart  = (coords === this.start) ? true : false
    newCellNode.isGoal   = (coords === this.goal)  ? true : false

    newCellNode.isWall   = gridCell.has('wall')
    newCellNode.parent   = null
    newCellNode.linked   = []

    links.forEach(coords => newCellNode.linked.push(coords))
    return newCellNode
  }
}
