import BinaryHeap from './binary_heap'

export default class Pathfinder {
  constructor(grid, startCell, targetCell) {
    this.grid       = grid
    this.start      = startCell
    this.target     = targetCell
    this.openPath   = new Set()
    this.closedPath = new Set()
    this.finalPath  = new Set()
    this.cellScores = new Map()
  }

  initGrid() {
    let cellScore
    this.grid.forEach(cell => {
      cellScore = {
        f: 0,
        g: 0,
        h: 0,
        cost: 1,
        visited: false,
        closed: false,
        links: cell.links.keys,
      }
      this.cellScores.set(cell.coords, cellScore)
    })
  }

  initPath(x, y) {
    const startXY   = `${this.y},${this.x}`
    const targetXY  = `${y},${x}`
    this.startCell  = this.grid.get(startXY)
    this.targetCell = this.grid.get(targetXY)
    this.openPath.add(startCell)
    this.findPath(startCell, this.targetCell)
  }

  findPath(start, goal) {
    const cellScores = {}
    const grid = Object.assign({}, this.grid)
    cellScores[this.grid.get(startCell).coords].g = 0
  }

  hScore(start, goal) {
    const { x, y } = goal
    return Math.abs(cell.x - x) + Math.abs(cell.y - y)
  }

  gScore(current, next) {

  }

  fScore(cell) {

  }

}
