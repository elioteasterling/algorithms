// container for key-value pairs
export class SymbolTable<K, V> implements Iterable<V> {
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
    greaterThan(k: K, st: SymbolTable<K, V>): boolean  {
        const hash = this.hashCodeFor(k)
        if (this.vals[hash] === undefined) return false
        else if (st.vals[hash] === undefined) return true
        else if (this.vals[hash] !== undefined && st.vals[hash] !== undefined) {
            return this.vals[hash]! > st.vals[hash]!
        }
        return false
    }

    hashCodeFor(k: K): string { return JSON.stringify(k) }

    *[Symbol.iterator](): Iterator<V, any, undefined> {
        for (let v of Object.values(this.vals))
            if (v) yield v
            else continue
    }
}