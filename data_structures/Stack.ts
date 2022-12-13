import List from "./List"

// quicker access but total time is slower and more memory is used 
export class Stack<T> {

    list = new List<T>()

    push(value: T) { this.list.addFront(value) }

    pop():  T | undefined { return this.list.removeFront() }
    peek(): T | undefined { return this.list.head?.value }

    isEmpty() { return this.list.size === 0 }

    // "for of" impl
    * [Symbol.iterator]() {   
        for (const thing of this.list) yield thing
    }
}

// total time is better and uses less memory but quick access isn't guarenteed due to array resizing
export class ArrayStack<T> {

    list: T[] = []                          // overflow guard - resizing array
    n = 0

    push(value: T) { this.list[this.n++] = value }

    pop () { 
        if (this.isEmpty()) return null     // underflow guard - return null if there's nothing to pop
        const result = this.list[--this.n]
        this.list[this.n] = null as T       // garbage collect whatever's inside the array at position n
        return result
    }

    isEmpty() { return this.n === 0 }

    // "for of" impl
    * [Symbol.iterator]() {   
        for (const thing of this.list) yield thing
    }
}
