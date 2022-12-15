import { RedBlackTree } from './trees/RedBlackTree'
import { Comparable   } from "contracts/sort"

// container for key-value pairs
export class SymbolTable<K extends Comparable, V extends Comparable> implements Iterable<V> {
    
    tree = new RedBlackTree<K, V>()

    get length() { return this.tree.length }

    add(k: K, v?: V) {
        if (!v) return this.del(k)
        this.tree.put(k, v)
    }                         // same key => overides value
    get(k: K): V | undefined  { return this.tree.get(k) }    // returns val || undefined if nonexistent
    // lazy delete => let gc handle it
    del(k: K)               { return this.tree.del(k) }
    has(k: K)               { return this.tree.get(k) !== undefined }
    isEmpty(): boolean      { return this.tree.length() > 0 }
    size(): number          { return this.length() }
    greaterThan(k: K, v: V): boolean  {
        const result = this.tree.get(k)
        if      (result === undefined) return false
        else if (v      === undefined) return true
        else if (result !== undefined) return result.compareTo(v) > 0
        return false
    }

    * [Symbol.iterator](): Iterator<V> { for (const v of this.tree) if (v !== undefined) yield v }
}

export class OrderedSymbolTable<K extends Comparable, V extends Comparable> implements Iterable<V> {

    tree = new RedBlackTree<K, V>()

    put(k: K,  v?: V)        { if (v) this.tree.put(k, v) } // same key    => overide current value
    get(k: K): V | undefined { return this.tree.get(k) }
    del(k: K)                { this.put(k) }                // lazy delete => let gc handle it
    has(k: K)                { return this.get(k) !== undefined }
    isEmpty(): boolean       { return this.size() > 0 }
    size():    number        { return 0 }
    greaterThan(k: K, v: V): boolean {
        const possibleValue: V | undefined = this.get(k)
        return !!possibleValue && possibleValue.compareTo(v) > 0
    }

    min()    {}
    max()    {}
    floor()  {}
    ceil()   {}
    rank()   {}
    select() {}
    delMin() {}
    delMax() {}

    hashCodeFor(k: K): string { return JSON.stringify(k) }

    *[Symbol.iterator](): Iterator<V> { for (const v of this.tree) if (v !== undefined) yield v }
}
