import Node from "./Node"

export default class List extends Node {
    size = 0
    head?: Node
    tail?: Node

    // "for of" impl
    [Symbol.iterator]() {
        if (!this.head) return []
        let current: Node = (this.head as unknown as Node)
        return {
            next: () => {
                let value: any = current.value
                if (current && current.next) current = current.next
                return { 
                    value, 
                    done: !current
                }
            }
        }
    }

    clear() {
        if (this.head) this.head = undefined
        if (this.tail) this.tail = undefined
        this.size = 0
    }

    connect(n1: Node, n2: Node) {
        n1.next = n2
        n2.prev = n1
    }

    addFront(value: any) {
        const node: Node = new Node(value)
        if (this.size === 0) this.tail = node
        else if (this.head) this.connect(node, this.head)
        this.head = node
        return ++this.size
    }

    addBack(value: any) {
        const node = new Node(value)
        if (this.size === 0) this.head = node
        else if (this.tail) this.connect(this.tail, node)
        this.tail = node
        return ++this.size
    }

    removeFront() {
        if (!this.head) return undefined
        const original = this.head
        if (this.size === 1) {
            const value = this.head.value
            this.clear()
            return value
        }
        else if (this.head?.prev && original?.next) {
            this.head = original.next
            this.head.prev = undefined
            this.size--
        }
        return original.value
    }

    removeBack() {
        const original: any = this.tail
        if (this.size === 0) return undefined
        else if (this.size === 1) {
            const value = original.value
            this.clear()
            return value
        }
        else {
            this.tail = original?.prev || undefined
            if  (this.tail?.next) this.tail.next = undefined
            this.size--
        }
        return original.value
    }
}
