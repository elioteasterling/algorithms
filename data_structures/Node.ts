import { Valuable, Comparable } from '../contracts'

// --------------------------------------------------- List / Stack / Queue
export class Node<T extends Comparable> implements Comparable, Valuable {
    value?: T       = undefined
    right?: Node<T> = undefined
    left?:  Node<T> = undefined
    
    constructor(val?: T) { this.value = val }

    compareTo(other: Node<T>) {
        if (this.value  === undefined) return -1
        if (other.value === undefined) return  1
        return other.value.compareTo(this.value)
    }
}

// ----------------------------------------------------- Binary Search Tree
export class BSTNode<K, V> implements Valuable {
    key?:    K
    value?:  V
    left?:   BSTNode<K, V>
    right?:  BSTNode<K, V>
    children = 0

    constructor(key?: K, value?: V) {
        this.key   = key
        this.value = value
    }
}

// --------------------------------------------------------- Red Black Tree
export enum Color {
    red,
    black
}

export class RedBlackNode<K, V> implements Valuable {
    children : number = 0
    color    : Color  = Color.black
    key    ? : K
    value  ? : V
    left   ? : RedBlackNode<K, V>
    right  ? : RedBlackNode<K, V>

    constructor(key?: K, value?: V, color: Color = Color.black) {
        this.key   = key
        this.value = value
        this.color = color
    }

    isRed() { return this.color === Color.red }
}

// ------------------------------------------------ K Nearest Neighbor Tree (INCOMPLETE !!!)
export class KdNode<K extends Comparable, V> implements Comparable, Valuable {
    children : number = 0
    key    ? : K
    value  ? : V
    left   ? : KdNode<K, V>
    right  ? : KdNode<K, V>
    dim      : number

    constructor(key?: K, value?: V, dim: number = 1) {
        this.key   = key
        this.value = value
        this.dim   = dim
    }

    compareTo(other: Comparable) {
        if      (!this.value) return -1
        else if (!other)      return  1
        return other.compareTo(this.value)
    }

     distance(n: KdNode<K, V>) {
        const d: number = 0
        for (let a = 0; a < (this.dim || 0); a++) {     // for each dimension
            for (let dimention = a; a < this.dim; a++) {

            }
        }
     }
}
