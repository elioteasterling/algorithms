/*
    think of the array like a binary tree - cause that's what we're doing/*
        - don't use a[0], use a[1] instead to simplify the arithmetic
    every parent must be >= to its child/*

    largest key is the root/*

    parent of k is at k/2
    children of k are at 2K and 2k + 1

    if child's value larger than it's parent, swap the two and repeat until the condition is satisfied
*/


export class BinaryHeap {
    heap = []
    end  = 0
    root = 1

    insert(value) {
        // add node to end -> swim it up
    }

    popMax() {
        const  max = null // swap the root node with the last node (remove that last node and return it) -> swim the new root down
        return max.value
    }

    swap(child, parent, source) {
        const childNode     = source[child]
        this.source[child]  = this.source[parent]
        this.source[parent] = childNode
    }

    children(i)  { return [this.heap[Math.floor(i / 2)], this.heap[(Math.floor(i / 2) + 1)]] }
    parent(i)    { return  this.heap[Math.floor(i * 2)] }

    sink(n) { while (n.parent && this.greater(n.parent, n)) this.swap(n.parent, n) } // while root -> if parent greater than child, swap them and repeat

    swim(node) { while (this.childsValueGreaterThanParents(node)) this.swap(node, node.parent) }

    greater(n1, n2) { return n1.value > n2.value }

    childsValueGreaterThanParents(node) { return node.parent && node.value > node.parent.value }
}