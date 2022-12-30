import { Comparable } from 'contracts/sort';
import { Node } from "./Node"

export class List<T extends Comparable> {
    length = 0
    head?: Node<T>
    tail?: Node<T>

    constructor(value?: T | T[]) {
        if (Array.isArray(value)) for (let v of value) this.addBack(v)
        else if (value) this.addBack(value)
    }

    // "for of" impl
    * [Symbol.iterator]() {
        let h: Node<T> = (this.head as Node<T>)
        while (h.right) {
            const v = h.value
            h = h.right
            yield v
        }
    }

    clear() {
        if (this.head) this.head = undefined
        if (this.tail) this.tail = undefined
        this.length = 0
    }

    connect(n1: Node<T>, n2: Node<T>) {
        n1.right = n2
        n2.left = n1
    }

    addFront(value: T) {
        const node: Node<T> = new Node(value)
        if (this.length === 0) this.tail = node
        else if (this.head) this.connect(node, this.head)
        this.head = node
        return ++this.length
    }

    addBack(value: T) {
        const node: Node<T> = new Node(value)
        if (this.length === 0) this.head = node
        else if (this.tail) this.connect(this.tail, node)
        this.tail = node
        return ++this.length
    }

    removeFront() {
        if (!this.head) return undefined
        const original = this.head
        if (this.length === 1) {
            const value = this.head.value
            this.clear()
            return value
        }
        else if (this.head?.left && original?.right) {
            this.head = original.right
            this.head.left = undefined
            this.length--
        }
        return original.value
    }

    removeBack() {
        const original: any = this.tail
        if (this.length === 0) return undefined
        else if (this.length === 1) {
            const value = original.value
            this.clear()
            return value
        }
        else {
            this.tail = original?.left || undefined
            if  (this.tail?.right) this.tail.right = undefined
            this.length--
        }
        return original.value
    }
}
