import List from "./List"

export default class Bag {
    list = new List()
    size = 0

    add(thing) { this.list.addFront(thing) }

    // "for of" impl
    [Symbol.iterator]() {    
        return this.list
    }
}