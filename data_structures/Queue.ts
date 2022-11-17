import { BinaryHeap } from './Heap'
import List from "./List"

// constant time for all ops other than "for of"
export class Queue {

    list = new List()

    enqueue(value: any) { return this.list.addFront(value) }

    dequeue() { return this.list.removeBack() }

    isEmpty() { return this.list.size === 0 }

    // "for of" impl
    [Symbol.iterator]() {   
        return this.list
    }
} 

/*
    STATS:
    add => logN, min => 1, max => logN, peek => 1
*/
export class PriorityQueue {
    heap = new BinaryHeap( (a: any, b: any) => a > b)

    isEmpty() { return this.heap.size() === 0 }

    add(value: any) { this.heap.insert(value) }

    max() { return this.heap.max() }

    min() { return this.heap.min() }

    // "for of" impl
    [Symbol.iterator]() {   
        return this.heap
    }
}
