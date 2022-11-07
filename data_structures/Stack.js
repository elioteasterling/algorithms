import LinkedList from "./LinkedList.js"

// quicker access but total time is slower and more memory is used 
export class Stack {
    list = new LinkedList()

    push(value) { this.list.addFront(value) }

    pop() { return this.list.removeFront() }

    isEmpty() { return this.list.size === 0 }
}

// total time is better and uses less memory but quick access isn't guarenteed due to array resizing
export class ArrayStack {

    list = []
    n = 0

    push(value) { this.list[n++] = value }

    pop () { 
        const result = this.list[--n]
        this.list[n] = null             // collect whatever's inside the array at position n
        return result
    }

    isEmpty() { return this.n === 0 }
}
