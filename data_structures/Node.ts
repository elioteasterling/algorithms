export default class Node<T> {
    value?: T
    next?: Node<T>
    prev?: Node<T>
    constructor(t: T) { if (t) this.value = t }
}

export class SlimNode<T> {
    value?: any
    next?:  SlimNode<T>
    constructor(v = null) { this.value = v }
}
