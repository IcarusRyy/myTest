type Heap = any
type Node = any

export function push(heap, node) {
  const index = heap.length
  heap.push(node)
  siftUp(heap, node, index)
}

export function peek(heap) {
  return heap.length === 0 ? null : heap[0]
}

export function pop(heap) {
  if (heap.length === 0) {
    return null
  }
  const first = heap[0]
  const last = heap.pop()
  if (last !== first) {
    heap[0] = last
    siftDown(heap, last, 0)
  }
  return first
}

function siftUp(heap, node, i: number): void {
  let index = i
  while (index > 0) {
    const parentIndex = (index - 1) >>> 1
    const parent = heap[parentIndex]
    if (compare(parent, node) > 0) {
      // The parent is larger. Swap positions.
      heap[parentIndex] = node
      heap[index] = parent
      index = parentIndex
    } else {
      // The parent is smaller. Exit.
      return
    }
  }
}

function siftDown(heap, node, i: number): void {
  let index = i
  const length = heap.length
  const halfLength = length >>> 1
  while (index < halfLength) {
    const leftIndex = (index + 1) * 2 - 1
    const left = heap[leftIndex]
    const rightIndex = leftIndex + 1
    const right = heap[rightIndex]

    // If the left or right node is smaller, swap with the smaller of those.
    if (compare(left, node) < 0) {
      if (rightIndex < length && compare(right, left) < 0) {
        heap[index] = right
        heap[rightIndex] = node
        index = rightIndex
      } else {
        heap[index] = left
        heap[leftIndex] = node
        index = leftIndex
      }
    } else if (rightIndex < length && compare(right, node) < 0) {
      heap[index] = right
      heap[rightIndex] = node
      index = rightIndex
    } else {
      // Neither child is smaller. Exit.
      return
    }
  }
}
function compare(a: Node, b: Node) {
  // Compare sort index first, then task id.
  const diff = a.sortIndex - b.sortIndex
  return diff !== 0 ? diff : a.id - b.id
}
