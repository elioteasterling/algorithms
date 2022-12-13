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
    length = 0

    constructor(key?: K, value?: V) {
        this.key   = key
        this.value = value
    }
}
