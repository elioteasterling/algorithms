import List from "./List";

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

export class PriorityQueue {
    pq: any[] = []

    isEmpty() { return this.pq.length === 0 }

    add(value: any) { this.pq.push(value) }

    max() {
        let biggest = 0
        for (let i = 0; i < this.pq.length; i++) {
            if (biggest < this.pq[i]) biggest = i
        }
        this.swap(1, this.pq.length - 1)
        return this.pq.pop()
    }

    swap(pos1: number, pos2: number) {
        const value = this.pq[pos1]
        this.pq[pos1] = this.pq[pos2]
        this.pq[pos2] = value
    }
}
