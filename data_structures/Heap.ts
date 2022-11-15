/*
    Binary Heap via Array<any>
*/

export class BinaryHeap {
    private heap    : any[] = []
    private greater : Function
 
    constructor(firstGreaterThanSecond: Function) {
        this.greater = firstGreaterThanSecond
    }

    // add node to end -> swim it up
    insert(value: any) {
        const length = this.heap.push(value)
        this.swim(length - 1)
    }

    // swap the root node with the last node (remove that last node and return it) -> swim the new root down
    max() {
        this.swap(1, this.heap.length - 1)
        const result = this.heap.pop()
        this.sink(1)
        return result
    }

    min() {
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