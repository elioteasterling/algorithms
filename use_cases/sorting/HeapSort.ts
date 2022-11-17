import { ComparableFunction } from './../../contracts/data-structures'

let greaterThan: ComparableFunction
let heap: any[] = []

/*
    Performance: 
        Time   - NlogN worst case (quick sort's worst case is N^2, e.g., but when shuffled is pretty decent)
        Memory - N space - in place sort
               - immutablility makes the algorithm use 2N space instead of just N

    Not used much in practicality
        - inner loop is more expensive with 2NlogN compares and 2NlogN exchanges
        - makes poor use of memory
        - not a stable sort
*/
export function heapSort(a: any[], greaterThanFunc: ComparableFunction, immutable = false) {
    greaterThan = greaterThanFunc
    const sorted: any[] = []
    const maxHeap = maxHeapedArray(a)
    while (maxHeap.length > 1) {
        swap(1, maxHeap.length - 1)
        const v = maxHeap.pop()
        sink(1)
        if (immutable) sorted.push(v)
    }
    if (immutable) {
        sorted.push(a.pop())
        return sorted
    }
    return a
}

function maxHeapedArray(a: any[]) {     // bottom up aproach
    let p = Math.floor(a.length / 2)
    for (let i = p; i >= 1; i--) sink(p)
    return a
}

function childrenAreBigger(p: number) {
    const c : number[] = children(p), l = c[0], r = c[1]
    return greaterThan(l, p) || greaterThan(r, p)
}

// function parent(i: number) : number { return  Math.floor(i / 2) }
function children(i: number) : number[] { return [Math.floor(i * 2), Math.floor(i * 2) + 1] }

function sink(parent: number) {
    let p = parent
    let c = children(p)
    const l = c[0], r = c[1]
    while (childrenAreBigger(p) && p < heap.length - 1) {
        if      (greaterThan(r, p)) swap(r, p)
        else if (greaterThan(l, p)) swap(l, p)
        p = r || l
    } 
}

function swap(f: number, s: number) {
    const o = heap[f]
    heap[f] = heap[s]
    heap[s] = o
}
