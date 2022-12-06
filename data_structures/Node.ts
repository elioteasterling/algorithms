export default class Node<T> {
    value?: T
    next?:  Node<T>
    prev?:  Node<T>
    constructor(t:  T) { if (t) this.value = t }
}

export class SlimNode<T> {
    value?: any
    next?:  SlimNode<T>
    constructor(v = null) { this.value = v }
}

// lower values on the left, higher on the right
export class BinarySearchTreeNode<K, V> {
    key?:   K
    value?: V
    left?:  BinarySearchTreeNode<K, V>
    right?: BinarySearchTreeNode<K, V>
    count   = 0

    constructor(key?: K, value?: V) {
        this.key   = key
        this.value = value
    }
}
