/*
    Binary Heap via Array<any>
*/

interface Comparable {
    greater : (a: any, b: any) => boolean
}

export class BinaryHeap {
    private heap    : any[]      = []
    private root    : number     = 1 // holds the largest value (ignore heap[0] to make the arithmetic easier)
    private greater : (a: any, b: any) => boolean
    pointer         : number;
 
    constructor(firstGreaterThanSecond: Comparable) {
        this.greater = firstGreaterThanSecond.greater
    }

    // add node to end -> swim it up
    insert(value: any) {
        const length = this.heap.push(value)
        this.swim(length - 1)
    }

    // swap the root node with the last node (remove that last node and return it) -> swim the new root down
    popMax() {
        this.swap(1, this.heap.length - 1)
        const result = this.heap.pop()
    }

    swap(child: number, parent: number) {
        const baby= this.heap[child]
        this.heap[child]  = this.heap[parent]
        this.heap[parent] = baby
    }

    children(i: number) : number[] { return [Math.floor(i * 2), Math.floor(i * 2) + 1] }
    parent(  i: number) : number   { return  Math.floor(i / 2) }

    // keeps heap order when a child's value is greater than their parent's
    // while root -> if parent greater than child, swap them and repeat
    // go down
    sink(j: number) {
        let i = j
        while (i < this.heap.length - 1 && this.greater(i, this.parent(i))) {
            this.swap(i, this.parent(i))
            i = this.parent(i)
        } 
    }

    // go up -> parent is less than child in value
    swim(i: number) { 
        let pos = i
        while (pos > 1 && this.greater(pos, this.parent(pos))) {
            this.swap(pos, this.parent(pos))
            pos = this.parent(i)
        } 
    }
}