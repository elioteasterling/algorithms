import { Comparable } from './../../contracts/sort';
import { Color, RedBlackNode } from 'data_structures/Node';
import { Queue } from 'data_structures/Queue';
/**
 *      invariants:
 *          - no node has two red links connected to it
 *          - red links lean left
 *          - every path from root to leaf has the same number of black links (perfect black balance)
 * 
 *      1. represent 2-3 tree as bst
 *      2. use internal left-leaning links as "glue" for 3-nodes
 * 
 *      Note:
 *          - most ops are same as for BSTs
 */

export class RedBlackTree<K extends Comparable, V extends Comparable> implements Iterable<V> {

    root?: RedBlackNode<K, V>
    get(key: K): V | undefined {
        let n: RedBlackNode<K, V> | undefined = this.root
        while(n !== undefined) {

            const result = n.key?.compareTo(key)

            if      (result === -1) n = n.left
            else if (result ===  1) n = n.right
            else    return n.value
        }
        return undefined
    }
    
    min(startingFromNode?: RedBlackNode<K, V>) { return this.endValue("left", startingFromNode)  }

    max(startingFromNode?: RedBlackNode<K, V>) { return this.endValue("right", startingFromNode) }

    private endValue(direction:    "left" | "right",    startingFromNode?:  RedBlackNode<K, V>) {
        let n: RedBlackNode<K, V> | undefined = startingFromNode || this.root
        while (n && n[direction]) n = n[direction]
        return n
    }

    del(k: K) { this.root = this.delete(k, this.root!) || new RedBlackNode<K, V>() }

    // hibbard deletion - asymetrical => symetry degrades over time
    delete(k: K, n?: RedBlackNode<K, V>) {
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

    delMin(n?: RedBlackNode<K, V>) {
        if (!n) {
            n = this.root
            this.root = this.delMin(n) || new RedBlackNode<K, V>()
            return n
        }

        if (n.left === undefined) return n.right
        n.left = this.delMin(n.left)
        n.children = this.sizeOfNode(n.left) + this.sizeOfNode(n.right)
        return n
    }

    delMax(n?: RedBlackNode<K, V>) {
        if (!n) {
            n = this.root
            this.root = this.delMax(n) || new RedBlackNode<K, V>()
            return n
        }

        if (n.right === undefined) return n.left
        n.right = this.delMax(n.right)
        n.children = 1 + this.sizeOfNode(n.right) + this.sizeOfNode(n.left)
        return n
    }

    floor(key: K): K | undefined { return this.findFloor(key, this.root)?.key }

    private findFloor(key: K, n?: RedBlackNode<K, V>): RedBlackNode<K, V> | undefined {
        if (!n) return undefined

        const result = n.key?.compareTo(key)

        if      (result ===  0) return n
        else if (result === -1) return this.findFloor(key, n.left)

        let node: RedBlackNode<K, V> | undefined = this.findFloor(key, n.right)
        if (node !== undefined) return node
        return n
    }

    ceil(key: K): K | undefined { return this.findCeil(key, this.root)?.key }

    private findCeil(key: K, n?: RedBlackNode<K, V>): RedBlackNode<K, V> | undefined {
        if (!n) return undefined

        const result = n.key?.compareTo(key)

        if      (result ===  0) return n
        else if (result === -1) return this.findCeil(key, n.right)
        
        let node: RedBlackNode<K, V> | undefined = this.findCeil(key, n.left)
        if (node !== undefined) return node
        return n
    }

    length(): number {
        if (!this.root) return 0
        return this.sizeOfNode(this.root)
    }

    private sizeOfNode(n?: RedBlackNode<K, V>): number {
        if (!n) return 0
        return n.children
    }

    rank(key: K): number { return this.nodeRank(key, this.root) }

    private nodeRank(key: K, n?: RedBlackNode<K, V>): number {
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

    values(): Queue<V> {
        const v = new Queue<V>()
        const q = new Queue<K>()
        this.ascendingOrder(q, this.root)
        for (const key of q) {
            const val = this.get(key)
            if (val !== undefined) v.enqueue(val)
        }
        return v
    }

    ascendingOrder(q: Queue<K | undefined>, n?: RedBlackNode<K, V>) {
        if (n === undefined) return
        this.ascendingOrder(q, n.left)
        q.enqueue(n.key)
        this.ascendingOrder(q, n.right)
    }

    decendingOrder(q: Queue<K | undefined>, n?: RedBlackNode<K, V>) {
        if (n === undefined) return
        this.decendingOrder(q, n.right)
        q.enqueue(n.key)
        this.decendingOrder(q, n.left)
    }

    * [Symbol.iterator](): Iterator<V> {
        let val: V | undefined
        const queue = new Queue<K | undefined>()
        this.ascendingOrder(queue, this.root)
        for (const key of queue) {
            if (key === undefined) continue
            val = this.get(key)
            if (val !== undefined) yield val
        }
    }

    private rotateLeft(n: RedBlackNode<K, V>) {     // maintains symmetric order and perfect black balance
        if (n.right?.isRed()) {
            const r = n.right
            n.right = r.left
            r.left  = n
            r.color = n.color       
            n.color = Color.red
            n.children = r.children
            r.children = 1 + this.sizeOfNode(n.right) + this.sizeOfNode(n.left)
        }
        return n
    }

    put(k: K, v: V) { 
        this.root = this.insert(k, v, this.root)
        this.root.color = Color.black
    }

    private insert(k: K, v: V, n?: RedBlackNode<K, V>) {
        if (!n) return new RedBlackNode<K, V>(k, v, Color.red)
        let result: number = n.key?.compareTo(k) || 0

        if      (result ===  1)                         n.right = this.insert(k, v, n.right || new RedBlackNode<K, V>())
        else if (result === -1)                         n.left  = this.insert(k, v, n.left  || new RedBlackNode<K, V>())
        else                                            n.value = v

        if (n.right?.isRed() && !n.left?.isRed())       n = this.rotateLeft(n)
        if ( n.left?.isRed() &&  n.left?.left?.isRed()) n = this.rotateRight(n)
        if ( n.left?.isRed() &&  n.right?.isRed())          this.flipColors(n)

        return n
    }

    // temporary right-leaning, red link
    private rotateRight(n: RedBlackNode<K, V>) {     // maintains symmetric order and perfect black balance
        if (n.left?.isRed()) {
            const l    = n.left
            n.left     = l.right
            l.right    = n
            l.color    = n.color       
            n.color    = Color.red
            n.children = l.children
            l.children = 1 + this.sizeOfNode(n.left) + this.sizeOfNode(n.right)
        }
        return n
    }

    private flipColors(n: RedBlackNode<K, V>) {
        if (!n.isRed() && n.left?.isRed() && n.right?.isRed()) {
            n.color       = Color.red
            n.left.color  = Color.black     // part 1 of the 4-node split in 2-3 trees
            n.right.color = Color.black     // part 2 of the 4-node split in 2-3 trees
        }
    }
}
