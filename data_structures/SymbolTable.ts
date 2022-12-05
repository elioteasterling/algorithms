// container for key-value pairs
export class SymbolTable<K, V> implements Iterable<V> {
    keys = new Array<K>()
    vals = new Array<V>()

    put(k: K, v: V) {}
    get(k: K): V { return this.vals[0] }

    del(k: K) {}
    has(k: K) {}
    isEmpty(): boolean { return this.size() > 0 }
    size(): number    { return 0 }

    [Symbol.iterator](): Iterator<V, any, undefined> {
        let i = 0
        return {
            next: (): IteratorResult<V> => {
                let v   = this.vals[i--]
                return {
                    value: v,
                    done:  (this.size() - i--) > 0
                }
            }
        }
    }
}