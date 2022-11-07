export default class Node {
    value
    next = null
    prev = null

    constructor(v = null) {
        this.value = v
    }
}

export class SlimNode {
    value
    next = null

    constructor(v = null) {
        this.value = v
    }
}
