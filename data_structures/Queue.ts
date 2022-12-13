import { Comparable } from 'contracts/sort'
import { BinaryHeap } from './Heap'
import List from "./List"

// constant time for all ops other than "for of"
export class Queue<T> implements Iterable<T> {

    list = new List<T>()

    enqueue(value: T) { return this.list.addFront(value) }

    dequeue() { return this.list.removeBack() }

    isEmpty() { return this.list.size === 0 }

    // "for of" impl
    * [Symbol.iterator](): Iterator<T, any, undefined> {
        let h = this.list.head
        while (h?.next) {
            let v = h.value
            h = h.next
            if (v === undefined) continue
            yield v
        }
    }
} 

/*
    STATS:
    add => logN, min => 1, max => logN, peek => 1
*/
export class PriorityQueue<T extends Comparable> implements Iterable<T> {

    heap: BinaryHeap<T> = new BinaryHeap<T>()

    isEmpty() { return this.heap.size() === 0 }

    add(value: T) { this.heap.insert(value) }

    max() { return this.heap.max() }

    min() { return this.heap.min() }

    get size() { return this.heap.size }

    * [Symbol.iterator](): Iterator<T, any, undefined> {
        for (const thing of this.heap) yield thing
    }
}
