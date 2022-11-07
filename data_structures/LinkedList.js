import Node from "./Node"

export default class LinkedList {
    size = 0
    head = null
    tail = null

    clear() {
        this.head = null
        this.tail = null
        this.size = 0
    }

    connect(n1, n2) {
        n1.next = n2
        n2.prev = n1
    }

    addFront(val) {
        const node = new Node(val)
        if (this.size === 0) this.tail = node
        else this.connect(node, this.head)
        this.head = node
        return ++this.size
    }

    addBack(val) {
        const node = new Node(val)
        if (this.size === 0) this.head = node
        else this.connect(this.tail, node)
        this.tail = node
        return ++this.size
    }

    removeFront() {
        const original = this.head
        if (this.size === 0) return null
        else if (this.size === 1) this.clear()
        else {
            this.head = original.next
            this.head.prev = null
            this.size--
        }
        return original.value
    }

    removeBack() {
        const original = this.tail
        if (this.size === 0) return null
        else if (this.size === 1) this.clear()
        else {
            this.tail = original.prev
            this.tail.next = null
            this.size--
        }
        return original.value
    }
}