import { Comparable } from './../../contracts/sort'
import { BST } from './BinaryTree'

export class IntervalTree<K extends Comparable, V> {
    tree: BST<K, V> = new BST<K, V>()

    constructor() {}
    put(       lo: K, hi: K, v: V) {}
    get(       lo: K, hi: K)       {}
    delete(    lo: K, hi: K)       {}
    intersects(lo: K, hi: K): V[]  { return [] }
}
