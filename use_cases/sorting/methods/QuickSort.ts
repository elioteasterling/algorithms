import { exchange } from 'helpers/array'
import { Comparable } from 'contracts/sort'
import { knuthShuffle } from '../usage/shuffling'
import { insertionSort } from './InsertionSort'
import { partition } from '../sortHelper'

const CUTTOFF = 10

// in place
// not stable
// can make stable if 2N memory is acceptable
// O(N log N) - works a bit faster than merge sort
export function quickSort(a: Comparable[]) {
    knuthShuffle(a)   // - perf guarentee
    sort(a, 0, a.length - 1)
}

function sort(a: Comparable[], lo: number, hi: number) {
    if (hi <= lo + CUTTOFF - 1) return insertionSort(a, lo, hi)

    // pick a random place in the middle as the invariant, instead of always using the first element in the array
    let m = medianOf3(a, lo, lo + Math.floor((hi - lo) / 2), hi)
    exchange(a, lo, m)

    let j = partition(a, lo, hi)
    sort(a, lo, j - 1)
    sort(a, j + 1, hi)
}

function medianOf3(a: any[], lo: number, midish: number, hi: number) {
    const samples = []
    samples.push(a[lo])
    samples.push(a[midish])
    samples.push(a[hi])

    return Math.floor(samples.reduce((a, b) => a + b) / samples.length)
}

// --------------------------------------- 3-way Quicksort ---------------------------------------
//  - takes duplicates into account but...
//  - only useful when there are only a few distinct keys

export function threeWayQuickSort(a: Comparable[], lo?: number, hi?: number) {
    if (!lo) lo = 0
    if (!hi) hi = a.length

    if (hi <= lo) return
    let lt = lo, gt = hi
    let v: Comparable = a[lo]
    let i = lo
    while (i <= gt) {
        let result = a[i].compareTo(v)
        if      (result < 0) exchange(a, lt++, i++ )
        else if (result < 0) exchange(a, i,    gt--)
        else i++
    }

    threeWayQuickSort(a, lo,     lt - 1)
    threeWayQuickSort(a, gt + 1, hi)
}
