import { Comparable } from 'contracts/sort';
import { List } from "./List"

export class Bag<T extends Comparable> implements Comparable {
    val: any
    list = new List<T>()
    size = 0

    add(thing: T) { this.list.addFront(thing) }

    compareTo(other: Comparable) { return other.compareTo(this.val) }

    // "for of" impl
    * [Symbol.iterator]() { for (const thing of this.list) yield thing }
}