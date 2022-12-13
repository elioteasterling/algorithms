import { Comparable } from "contracts/sort"
import { exchange } from "helpers/array"

export class BinaryHeap<T extends Comparable> {

    private heap: T[] = []

    get rawAccess() { return this.heap }

    // add node to end -> swim it up
    insert(value: T) {
        const length = this.heap.push(value)
        this.swim(length - 1)
    }

    // swap the root node with the last node (remove that last node and return it) -> swim the new root down
    max() {
        exchange(this.heap, 1, this.heap.length - 1)
        const result = this.heap.pop()
        this.sink(1)
        return result
    }

    min() { return this.heap.pop() }

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
            if      (r > p) exchange(this.heap, r, p)
            else if (l > p) exchange(this.heap, l, p)
            p = this.parent(p)
        } 
    }

    childrenAreBigger(c: number[], p: number) {
        const l = c[0], r = c[1]
        return l > p || r > p
    }

    // go up -> parent is less than child in value
    private swim(child: number) { 
        let c = child
        while (c > 1 && c > this.parent(c)) {
            exchange(this.heap, c, this.parent(c))
            c = this.parent(c)
        } 
    }

    size(): number { return this.heap.length }

    // so you can use "for of" to iteratate over this heap's values
    * [Symbol.iterator](): Iterator<T, any, undefined> {
        for (const val of this.heap) yield val
    }
}
