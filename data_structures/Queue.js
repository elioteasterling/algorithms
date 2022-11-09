import List from "./List.js";

export class Queue {

    list = new List()

    enqueue(value) { return this.list.addFront(value) }

    dequeue() { return this.list.removeBack() }

    isEmpty() { return this.list.size === 0 }

    // "for of" impl
    [Symbol.iterator]() {   
        return this.list
    }
}

export class PriorityQueue {
    pq = []

    isEmpty() { return this.pq.length === 0 }

    add(v) { pq.push(v) }

    max() {
        let biggest = 0
        for (let i = 0; i < pq.length; i++) {
            if (biggest < pq[i]) biggest = i
        }
        this.swap(this.max, this.pq.length - 1)
        return this.pq.pop()
    }

    swap(pos1, pos2) {
        const value = this.pq[pos1]
        this.pq[pos1] = this.pq[pos2]
        this.pq[pos2] = value
    }
}
