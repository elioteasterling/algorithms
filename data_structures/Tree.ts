import { BinarySearchTreeNode } from "./Node"
import { Comparable } from 'contracts/data-structures'
import { Queue } from "./Queue"

// equivocal to quick sort
export class BinarySearchTree<K extends Comparable, V extends Comparable> implements Iterable<K | undefined> {
    
    root?: BinarySearchTreeNode<K, V>

    get(key: K): V | undefined {
        let n: BinarySearchTreeNode<K, V> | undefined = this.root
        while(n !== undefined) {

            const result = n.key?.compareTo(key)

            if      (result === -1) n = n.left
            else if (result ===  1) n = n.right
            else    return n.value
        }
        return undefined
    }

    put(key: K, val: V) { this.root = this.insert(key, val, this.root) }

    private insert(key: K, val: V, n?: BinarySearchTreeNode<K, V>): BinarySearchTreeNode<K, V> | undefined {
        
        if (!n) return new BinarySearchTreeNode<K, V>(key, val)
        
        let result: number = n.key?.compareTo(key) || 0

        if      (result ===  1) n.right = this.insert(key, val, n.right)
        else if (result === -1) n.left  = this.insert(key, val, n.left)
        else                    n.value = val

        n.numberOfChildren = this.sizeOfNode(n.left) + this.sizeOfNode(n.right)
        return n
    }

    floor(key: K): K | undefined {
        const found = this.findFloor(key, this.root)
        return found?.key
    }

    private findFloor(key: K, n?: BinarySearchTreeNode<K, V>): BinarySearchTreeNode<K, V> | undefined {
        if (!n) return undefined

        const result = n.key?.compareTo(key)

        if      (result ===  0) return n
        else if (result === -1) return this.findFloor(key, n.left)
        else if (result ===  1) return this.findFloor(key, n.right)
        return undefined
    }

    ceil(key: K): K | undefined {
        const found = this.findCeil(key, this.root)
        return found?.key
    }

    private findCeil(key: K, n?: BinarySearchTreeNode<K, V>): BinarySearchTreeNode<K, V> | undefined {
        if (!n) return undefined

        const result = n.key?.compareTo(key)

        if      (result ===  0) return n
        else if (result === -1) return this.findCeil(key, n.right)
        else if (result ===  1) return this.findCeil(key, n.left)
        return undefined
    }

    size(): number {
        return this.sizeOfNode(this.root)
    }

    sizeOfNode(n?: BinarySearchTreeNode<K, V>): number {
        if (!n) return 0
        return n.numberOfChildren
    }

    rank(key: K): number {
        return this.nodeRank(key, this.root)
    }

    nodeRank(key: K, n?: BinarySearchTreeNode<K, V>): number {
        if (!n) return 0
        
        const result = n.key?.compareTo(key)

        if (result === 0)      return     this.sizeOfNode(n.left)
        else if (result == -1) return     this.sizeOfNode(n.left) + this.sizeOfNode(n.right)
        else                                return 1 + this.sizeOfNode(n.left) + this.nodeRank(key, n.right)
    }

    keys(): Queue<K> {
        const q = new Queue<K>()
        this.inOrder(q, this.root)
        return q
    }

    values(): Queue<V> {
        const v = new Queue<V>()
        const q = new Queue<K>()
        this.inOrder(q, this.root)
        for (const key of q) {
            const val = this.get(key)
            if (val !== undefined) v.enqueue(val)
        }
        return v
    }

    inOrder(q: Queue<K | undefined>, n?: BinarySearchTreeNode<K, V>) {
        if (n === undefined) return
        this.inOrder(q, n.left)
        q.enqueue(n.key)
        this.inOrder(q, n.right)
    }

    * [Symbol.iterator](): Iterator<K | undefined> {
        const queue = new Queue<K | undefined>()
        this.inOrder(queue, this.root)
        for (const key of queue) {
            if (key !== undefined) yield key
        }
    }
}
