export default class Node {
    value: any
    next?: Node
    prev?: Node
    constructor(v = null) { this.value = v }
}

export class SlimNode {
    value: any
    next?: Node
    constructor(v = null) { this.value = v }
}
