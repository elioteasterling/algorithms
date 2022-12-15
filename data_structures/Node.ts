export default class Node<T> {
    value?: T
    next?:  Node<T>
    prev?:  Node<T>
    constructor(t:  T) { if (t) this.value = t }
}

// lower values on the left, higher on the right
export class BSTNode<K, V> {
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

export enum Color {
    gray,
    red,
    black
}

export class RedBlackNode<K, V> {
    children : number = 0
    color    : Color  = Color.gray
    key    ? : K
    value  ? : V
    left   ? : RedBlackNode<K, V>
    right  ? : RedBlackNode<K, V>

    constructor(key?: K, value?: V, color: Color = Color.red) {
        this.key   = key
        this.value = value
        this.color = color
    }

    isRed() {
        return this.color === Color.red
    }
}
