import { BinaryHeap } from './Heap'
import List from "./List"

// constant time for all ops other than "for of"
export class Queue<T> {

    list = new List<T>()

    enqueue(value: T) { return this.list.addFront(value) }

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
export class PriorityQueue<T> {
    heap: BinaryHeap<T> = new BinaryHeap( (a: Record<string, T>, b: Record<string, T>, key?: string) => {
        if (key) return a[key] > b[key]
        return a > b
    })

    isEmpty() { return this.heap.size() === 0 }

    add(value: T) { this.heap.insert(value) }

    max() { return this.heap.max() }

    min() { return this.heap.min() }

    // "for of" impl
    [Symbol.iterator]() {   
        return this.heap
    }
}
