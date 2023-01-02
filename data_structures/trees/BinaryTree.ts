import { BSTNode } from "../Node"
import { Comparable } from 'contracts/sort'
import { Queue } from "../Queue"

// equivocal to quick sort
// use a Red/Black tree for solving asymetry - better for symbol table
export class BST<K extends Comparable, V> implements Iterable<K> {
    
    root = new BSTNode<K, V>()

    get(key: K): V | undefined {
        let n: BSTNode<K, V> | undefined = this.root
        while(n !== undefined) {

            const result = n.key?.compareTo(key)

            if      (result === -1) n = n.left
            else if (result ===  1) n = n.right
            else    return n.value
        }
        return undefined
    }

    put(key: K, val: V) { this.root = this.insert(key, val, this.root) }
    
    min(startingFromNode?: BSTNode<K, V>) { return this.endValue("left", startingFromNode)  }

    max(startingFromNode?: BSTNode<K, V>) { return this.endValue("right", startingFromNode) }

    private endValue(direction:    "left" | "right",    startingFromNode?:  BSTNode<K, V>) {
        let n: BSTNode<K, V> | undefined = startingFromNode || this.root
        while (n && n[direction]) n = n[direction]
        return n
    }

    del(k: K) { this.root = this.delete(k, this.root!) || new BSTNode<K, V>() }

    // hibbard deletion - asymetrical => symetry degrades over time
    delete(k: K, n?: BSTNode<K, V>) {
        if (!n || !n.key) return
        else {
            let result = n.key.compareTo(k)
            if      (result < 0) n.left  = this.delete(k, n.left)
            else if (result > 0) n.right = this.delete(k, n.right)
            else {
                if (!(n.right)) return n.left
                if (!(n.left) ) return n.right

                let t = n
                n = this.min(t.right)
                n!.right = this.delMin(t.right)
                n!.left  = t.left
            }
            n!.children = this.sizeOfNode(n!.left) + this.sizeOfNode(n!.right) + 1
            return n
        }
        
    }

    delMin(n?: BSTNode<K, V>) {
        if (!n) {
            n = this.root
            this.root = this.delMin(n) || new BSTNode<K, V>()
        }

        if (n.left === undefined) return n.right
        n.left = this.delMin(n.left)
        n.children = this.sizeOfNode(n.left) + this.sizeOfNode(n.right)
        return n
    }

    delMax(n?: BSTNode<K, V>) {
        if (!n) {
            n = this.root
            this.root = this.delMax(n) || new BSTNode<K, V>()
        }

        if (n.right === undefined) return n.left
        n.right = this.delMax(n.right)
        n.children = 1 + this.sizeOfNode(n.right) + this.sizeOfNode(n.left)
        return n
    }

    private insert(key: K, val: V, n: BSTNode<K, V>): BSTNode<K, V> {
        
        let result: number = n.key?.compareTo(key) || 0

        if      (result ===  1) n.right = this.insert(key, val, n.right || new BSTNode())
        else if (result === -1) n.left  = this.insert(key, val, n.left  || new BSTNode())
        else                    n.value = val

        n.children = this.sizeOfNode(n.left) + this.sizeOfNode(n.right)
        return n
    }

    floor(key: K): K | undefined { return this.findFloor(key, this.root)?.key }

    private findFloor(key: K, n?: BSTNode<K, V>): BSTNode<K, V> | undefined {
        if (!n) return undefined

        const result = n.key?.compareTo(key)

        if      (result ===  0) return n
        else if (result === -1) return this.findFloor(key, n.left)

        let node: BSTNode<K, V> | undefined = this.findFloor(key, n.right)
        if (node !== undefined) return node
        return n
    }

    ceil(key: K): K | undefined { return this.findCeil(key, this.root)?.key }

    private findCeil(key: K, n?: BSTNode<K, V>): BSTNode<K, V> | undefined {
        if (!n) return undefined

        const result = n.key?.compareTo(key)

        if      (result ===  0) return n
        else if (result === -1) return this.findCeil(key, n.right)
        
        let node: BSTNode<K, V> | undefined = this.findCeil(key, n.left)
        if (node !== undefined) return node
        return n
    }

    length(): number {
        if (!this.root) return 0
        return this.sizeOfNode(this.root)
    }

    private sizeOfNode(n?: BSTNode<K, V>): number {
        if (!n) return 0
        return n.children
    }

    rank(key: K): number { return this.nodeRank(key, this.root) }

    private nodeRank(key: K, n?: BSTNode<K, V>): number {
        if (!n) return 0
        const result = n.key?.compareTo(key)
        if (result)
            if      (result > 0) return                                this.nodeRank(key, n.left)
            else if (result < 0) return  1 + this.sizeOfNode(n.left) + this.nodeRank(key, n.right)
            else                 return      this.sizeOfNode(n.left)
        return 0
    }

    keys(): Queue<K> {
        const q = new Queue<K>()
        this.ascendingOrder(q, this.root)
        return q
    }

    values(): V[] {
        const v = []
        const q = new Queue<K>()
        this.ascendingOrder(q, this.root)
        for (const key of q) {
            const val = this.get(key)
            if (val !== undefined) v.push(val)
        }
        return v
    }

    ascendingOrder(q: Queue<K>, n?: BSTNode<K, V>) {
        if (n === undefined) return
        this.ascendingOrder(q, n.left)
        if(n.key !== undefined) q.enqueue(n.key)
        this.ascendingOrder(q, n.right)
    }

    decendingOrder(q: Queue<K>, n?: BSTNode<K, V>) {
        if (n === undefined) return
        this.decendingOrder(q, n.right)
        if(n.key !== undefined) q.enqueue(n.key)
        this.decendingOrder(q, n.left)
    }

    * [Symbol.iterator](): Iterator<K> {
        const queue = new Queue<K>()
        this.ascendingOrder(queue, this.root)
        for (const key of queue) {
            if (key !== undefined) yield key
        }
    }
}
