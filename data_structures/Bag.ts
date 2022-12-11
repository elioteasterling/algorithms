import List from "./List"

export default class Bag {
    list = new List()
    size = 0

    add(thing: any) { this.list.addFront(thing) }

    // "for of" impl
    * [Symbol.iterator]() {    
        for (const thing of this.list) yield thing
    }
}