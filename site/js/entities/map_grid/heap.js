class Node {
  constructor(cell) {
    this.cell      = cell.coords
    this.score     = cell.g + cell.h
    this.neighbors = cell.linked
    this.parent    = cell.parent
  }
}

export default class Heap {
  constructor() {
    this.heap = [null]

    this.nodeAt  = this.nodeAt.bind(this)
    this.scoreAt = this.scoreAt.bind(this)
  }

  has(cellNode) {
    for (let i = 1; i < this.size(); i++) {
      if (this.nodeAt(i).coords === cellNode.coords) {
        return true
      }
    }
    return false
  }

  clear() {
    this.heap = [null]
  }

  addNew(cellNode) {
    const node = new Node(cellNode)
    this.insert(node)
  }

  insert(num) {
    const scoreAt = this.scoreAt
    const nodeAt  = this.nodeAt
    const iFloor  = this.iFloor

    this.heap.push(num)
    if (this.size() > 2) {
      let idx = this.size() - 1
      while (scoreAt(idx) < scoreAt(iFloor(idx))) {
        if (idx >= 1) {
          this.swap(iFloor(idx), idx)
          if (iFloor(idx) > 1) {
            idx = iFloor(idx)
          } else {
            break
          }
        }
      }
    }
  }

  remove() {
    const scoreAt = this.scoreAt
    const nodeAt  = this.nodeAt
    let smallest  = nodeAt(1)

    if (this.size() > 2) {
      this.heap[1] = nodeAt(this.size() - 1)
      this.heap.splice(this.size() - 1)
      if (this.size() == 3) {
        if (scoreAt(1) > scoreAt(2)) {
          this.swap(1, 2)
        }
        return smallest
      }
      let i = 1
      let left = 2 * i
      let right = 2 * i + 1
      while (scoreAt(i) >= scoreAt(left) ||
             scoreAt(i) >= scoreAt(right)) {

        if (scoreAt(left) < scoreAt(right)) {
          this.swap(i, left)
          i = 2 * i
        } else {
          this.swap(i, right)
          i = 2 * i + 1
        }
        left = 2 * i
        right = 2 * i + 1
        if (nodeAt(left)  == undefined ||
            nodeAt(right) == undefined) {

          break
        }
      }
    } else if (this.size() == 2) {
      this.heap.splice(1, 1)
    } else {
      return null
    }
    return smallest
  }

  sort() {
    let result = []
    while (this.size() > 1) {
      result.push(this.remove())
    }
    return result
  }

  ////////////////////////////////////////////////// HELPERS

  iFloor(index) {
    return Math.floor(index / 2)
  }

  nodeAt(idx) {
    if (this.heap[idx]) {
      return this.heap[idx]
    }
  }

  scoreAt(idx) {
    if (this.heap[idx]) {
      return this.heap[idx].score
    }
  }

  swap(idx1, idx2) {
    [
      this.heap[idx1], this.heap[idx2]
    ] = [
      this.heap[idx2], this.heap[idx1]
    ]
  }

  size() {
    return this.heap.length
  }

////////////////////////////////////////////////// TEST HELPERS

  bulk(arr) {
    for (let i = 0; i < arr.length; i++) {
      let node = new Node(arr[i])
      this.insert(node)
    }
    return this.heap
  }

  run(testInput) {
    const mockCells = [
      { cell: 'cell-48',  h: 48,  g: 1 },
      { cell: 'cell-92',  h: 92,  g: 1 },
      { cell: 'cell-2',   h: 2,   g: 1 },
      { cell: 'cell-13',  h: 13,  g: 1 },
      { cell: 'cell-88',  h: 88,  g: 1 },
      { cell: 'cell-4',   h: 4,   g: 1 },
      { cell: 'cell-123', h: 123, g: 1 },
      { cell: 'cell-12',  h: 12,  g: 1 },
      { cell: 'cell-98',  h: 98,  g: 1 },
      { cell: 'cell-60',  h: 60,  g: 1 },
      { cell: 'cell-5',   h: 5,   g: 1 },
      { cell: 'cell-1',   h: 1,   g: 1 },
      { cell: 'cell-15',  h: 15,  g: 1 },
      { cell: 'cell-0',   h: 0,   g: 1 },
    ]
    testInput = testInput ? testInput : mockCells
    return {
      bulkHeap: this.bulk(testInput).slice(0),
      sortedHeap: this.sort(),
    }
  }
}
