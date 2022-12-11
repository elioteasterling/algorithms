import { exchange } from 'Helpers/array-helper'

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
export function heapSort(a: any[]) {
    const maxHeap = maxHeapedArray(a)
    while (maxHeap.length > 1) {
        exchange(heap, 1, maxHeap.length - 1)
        maxHeap.pop()
        sink(1)
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
    return l > p || r > p
}

//function parent(i: number) : number   { return  Math.floor(i / 2) }
function children(i: number) : number[] { return [Math.floor(i * 2), Math.floor(i * 2) + 1] }

function sink(parent: number) {
    let p = parent
    let c = children(p)
    const l = c[0], r = c[1]
    while (childrenAreBigger(p) && p < heap.length - 1) {
        if      (r > p) exchange(heap, r, p)
        else if (l > p) exchange(heap, l, p)
        p = r || l
    } 
}
