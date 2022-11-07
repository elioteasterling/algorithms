export default class Node {
    value
    next = null
    prev = null

    constructor(v = null) {
        this.value = v
    }
}
