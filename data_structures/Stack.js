import List from "./List.js"

// quicker access but total time is slower and more memory is used 
export class Stack {

    list = new List()

    push(value) { this.list.addFront(value) }

    pop() { return this.list.removeFront() }

    isEmpty() { return this.list.size === 0 }

    // "for of" impl
    [Symbol.iterator]() {   
        return this.list
    }
}

// total time is better and uses less memory but quick access isn't guarenteed due to array resizing
export class ArrayStack {

    list = []                             // overflow guard - resizing array
    n = 0

    push(value) { this.list[n++] = value }

    pop () { 
        if (this.isEmpty()) return null   // underflow guard - return null if there's nothing to pop
        const result = this.list[--n]
        this.list[n] = null               // garbage collect whatever's inside the array at position n
        return result
    }

    isEmpty() { return this.n === 0 }

    // "for of" impl
    [Symbol.iterator]() {   
        return this.list
    }
}
