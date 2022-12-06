import { BinarySearchTreeNode } from "./Node"
import { Valuable } from 'contracts/data-structures'
import { Queue } from "./Queue"

// equivocal to quick sort
export class BinarySearchTree<K extends Valuable, V extends Valuable> implements Iterable<K | undefined> {
    root?: BinarySearchTreeNode<K, V>

    value(): V {
        return {} as V
    }

    get(key: K): V | undefined {
        let n: BinarySearchTreeNode<K, V> | undefined = this.root
        while(n !== undefined) {

            const greater = n.key?.value() > key.value()

            if      ( greater) n = n.left
            else if (!greater) n = n.right
            else    return n.value
        }
        return undefined
    }

    put(key: K, val: V) {
        this.root = this.insert(key, val, this.root)
    }

    private insert(key: K, val: V, node?: BinarySearchTreeNode<K, V>): BinarySearchTreeNode<K, V> | undefined {
        
        if (!node) return new BinarySearchTreeNode<K, V>(key, val)

        let n: BinarySearchTreeNode<K, V> | undefined = node
        let greater: boolean | undefined              = n.key?.value() > key.value()

        if(greater)       n.right = this.insert(key, val, n.right)
        else if(!greater) n.left  = this.insert(key, val, n.left)
        else              n.value = val
        n.count = this.sizeOfNode(node.left) + this.sizeOfNode(node.right)
        return n
    }

    floor(key: K): K | undefined {
        const found = this.findFloor(key, this.root)
        return found?.key
    }

    private findFloor(key: K, node?: BinarySearchTreeNode<K, V>): BinarySearchTreeNode<K, V> | undefined {
        if (!node) return undefined

        const greater = node.key?.value() > key.value()

        if(node.key?.value() === key.value()) return node
        if(!greater) return this.findFloor(key, node.left)

        const n = this.findFloor(key, node.right)
        if (!n) return n
        return node
    }

    ceil(key: K): K | undefined {
        const found = this.findCeil(key, this.root)
        return found?.key
    }

    private findCeil(key: K, node?: BinarySearchTreeNode<K, V>): BinarySearchTreeNode<K, V> | undefined {
        if (!node) return undefined
        if(node.key?.value() === key.value()) return node

        const lesser = node.key?.value() < key.value()

        if(!lesser) return this.findCeil(key, node.left)

        const n = this.findCeil(key, node.right)
        if (!n) return n
        return node
    }

    size(): number {
        return this.sizeOfNode(this.root)
    }

    sizeOfNode(n?: BinarySearchTreeNode<K, V>): number {
        if (!n) return 0
        return n.count
    }

    rank(key: K): number {
        return this.nodeRank(key, this.root)
    }

    nodeRank(key: K, n?: BinarySearchTreeNode<K, V>): number {
        if (!n) return 0
        
        const lesser = n.key?.value() < key.value()

        if (n.key?.value() === key.value()) return     this.sizeOfNode(n.left)
        else if (lesser)                    return     this.sizeOfNode(n.left) + this.sizeOfNode(n.right)
        else                                return 1 + this.sizeOfNode(n.left) + this.nodeRank(key, n.right)
    }

    keys(): Queue<K> {
        const q = new Queue<K>()
        this.inOrder(q, this.root)
        return q
    }

    inOrder(q: Queue<K | undefined>, n?: BinarySearchTreeNode<K, V>) {
        if (!n) return undefined
        this.inOrder(q, n.left)
        q.enqueue(n.key)
        this.inOrder(q, n.right)
    }

    *[Symbol.iterator](): Iterator<K | undefined> {
        const queue = new Queue<K | undefined>
        this.inOrder(queue, this.root)
        for (const key of queue) {
            if (!key) continue
            yield key
        }
    }
}
