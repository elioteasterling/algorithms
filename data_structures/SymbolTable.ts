import { Valuable } from "contracts/data-structures"

// container for key-value pairs
export class SymbolTable<K extends Valuable, V extends Valuable> implements Iterable<V> {
    keys: Record<string, K> = {}
    vals: Record<string, V | undefined> = {}

    put(k: K, v?: V) {
        if (!v) return this.del(k)
        const h = this.hashCodeFor(k)
        this.keys[h] = k
        this.vals[h] = v
    }                         // same key => overides value
    get(k: K): V | undefined  { return this.vals[this.hashCodeFor(k)] }    // returns val || undefined if nonexistent
    // lazy delete => let gc handle it
    del(k: K)               { this.put(k) }
    has(k: K)               { return this.get(k) !== undefined }
    isEmpty(): boolean      { return this.size() > 0 }
    size(): number          { return 0 }
    greaterThan(k: K, v: V): boolean  {
        const hash = this.hashCodeFor(k)
        if (this.vals[hash] === undefined)  return false
        else if (v === undefined)           return true
        else                                return this.vals[hash]?.value() > v.value()
    }

    hashCodeFor(k: K): string { return JSON.stringify(k) }

    *[Symbol.iterator](): Iterator<V> {
        for (const v of Object.values(this.vals))
            if (v !== undefined) yield v
    }
}

export class OrderedSymbolTable<K, V extends Valuable> implements Iterable<V> {
    keys: Record<string, K> = {}
    vals: Record<string, V | undefined> = {}

    put(k: K, v?: V) {
        if (!v) return undefined
        const h = this.hashCodeFor(k)
        this.keys[h] = k
        this.vals[h] = v
    }                         // same key => overides value
    get(k: K): V | undefined  { return this.vals[this.hashCodeFor(k)] }    // returns val || undefined if nonexistent
    // lazy delete => let gc handle it
    del(k: K)               { this.put(k) }
    has(k: K)               { return this.get(k) !== undefined }
    isEmpty(): boolean      { return this.size() > 0 }
    size(): number          { return 0 }
    greaterThan(k: K, v: V): boolean  {
        const hash = this.hashCodeFor(k)
        if (this.vals[hash] === undefined)  return false
        else if (v === undefined)           return true
        else                                return this.vals[hash]?.value() > v.value()
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

    *[Symbol.iterator](): Iterator<V> {
        for (const v of Object.values(this.vals))
            if (v !== undefined) yield v
    }
}
