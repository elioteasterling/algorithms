/*
    Binary Heap via array
*/

import { ComparableFunction } from "contracts/data-structures"

export class BinaryHeap {
    private heap    : any[] = []
    private greater : ComparableFunction
 
    constructor(firstGreaterThanSecond: ComparableFunction) {
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

    min() { return this.heap.pop() }

    private swap(child: number, parent: number) {
        const baby= this.heap[child]
        this.heap[child]  = this.heap[parent]
        this.heap[parent] = baby
    }

    private children(i: number) : number[] { return [Math.floor(i * 2), Math.floor(i * 2) + 1] }
    private parent(  i: number) : number   { return  Math.floor(i / 2) }

    // keeps heap order when a child's value is greater than their parent's
    // while root -> if parent greater than child, swap them and repeat
    // go down
    private sink(parent: number) {
        let p = parent
        let c = this.children(p)
        const l = c[0], r = c[1]
        while (this.childrenAreBigger(c, p) && p < this.heap.length - 1) {
            if      (this.greater(r, p)) this.swap(r, p)
            else if (this.greater(l, p)) this.swap(l, p)
            p = this.parent(p)
        } 
    }

    childrenAreBigger(c: number[], p: number) {
        const l = c[0], r = c[1]
        return this.greater(l, p) || this.greater(r, p)
    }

    // go up -> parent is less than child in value
    private swim(child: number) { 
        let c = child
        while (c > 1 && this.greater(c, this.parent(c))) {
            this.swap(c, this.parent(c))
            c = this.parent(c)
        } 
    }

    size() { return this.heap.length }

    // "for of" impl
    [Symbol.iterator]() {
        return this.heap
    }
}
