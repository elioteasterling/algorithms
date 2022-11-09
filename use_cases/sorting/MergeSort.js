import { insertionSort } from './InsertionSort.js'

/*  MERGE SORT

    STABLE => when sorting by one key and then another, the first sort remains

    UPPER BOUND === LOWER BOUND for performance => thus performance is optimal

    O(N lg N)
       - N - 1 compares, 6N lg N array accesses
       - 3N lg N memory
*/
export function mergeSort(unsorted, immutable = true) {
    const sorted = sort(unsorted, [], 0, unsorted.length - 1)
    if (immutable) return Array.from(sorted)
    return sorted
}

function merge(unsorted, aux, lo, mid, hi) {

    for (let i = lo; i <= hi; i++)  aux[i] = unsorted[i]     // copy

    let i = lo, j = mid + 1
    for (let k = lo; k <= hi; k++) {
        if (i > mid)                unsorted[k] = aux[j++]   // merge
        else if (j > hi)            unsorted[k] = aux[i++]
        else if (aux[i] > aux[j])   unsorted[k] = aux[j++]
        else                        unsorted[k] = aux[i++]
    }
}

const CUTOFF = 8
function sort(unsorted, aux, lo, hi) {

    if (hi <= lo + CUTOFF - 1) return insertionSort(unsorted, false)
    
    const mid = lo + Math.floor((hi - lo) / 2)
    sort(unsorted, aux, lo, mid)
    sort(unsorted, aux, mid + 1, hi)
    if (a[mid + 1] >= a[mid]) return    // already in order => do nothing // brings N lg N compares down to N - 1
    merge(unsorted, aux, lo, mid, hi)
    return unsorted
}

/*  FAST MERGE SORT
        - takes up more memory than merge sort
        - removes the copy time for each merge
*/
export function fastMergeSort(unsorted) {
    let aux = []
    for (let i = 0; i < unsorted.length; i++) aux[i] = unsorted[i]  // copy
    const sorted = fastSort(unsorted, [], 0, unsorted.length - 1)
    if (immutable) return Array.from(sorted)
    return sorted
}

function fastMerge(unsorted, aux, lo, mid, hi) {
    let i = lo, j = mid + 1
    for (let k = lo; k <= hi; k++) {
        if (i > mid)                aux[k] = unsorted[j++]          // merge
        else if (j > hi)            aux[k] = unsorted[i++]
        else if (aux[i] > aux[j])   aux[k] = unsorted[j++]
        else                        aux[k] = unsorted[i++]
    }
}

function fastSort(aux, unsorted, lo, mid) {

    if (hi <= lo + CUTOFF - 1) return insertionSort(unsorted, false)
    
    const mid = lo + Math.floor((hi - lo) / 2)
    fastSort(aux, unsorted, lo, mid)
    fastSort(aux, unsorted, mid + 1, hi)

    if (a[mid + 1] >= a[mid]) return    // already in order => do nothing

    fastMerge(unsorted, aux, lo, mid, hi)
    return unsorted
}

/*  BOTTOM UP MERGE SORT
        - takes up more memory
        - removes recursivity - industrial grade perf
*/
export function bottomUpMergeSort(unsorted, immutable = true) {
    let aux = []
    for (let i = 0; i < unsorted.length; i++) aux[i] = unsorted[i]      // copy
    const sorted = bottomUpSort(unsorted, aux)
    if (immutable) return Array.from(sorted)
    return sorted
}

function bottomUpMerge(unsorted, aux, lo, mid, hi) {
    let i = lo, j = mid + 1
    for (let k = lo; k <= hi; k++) {
        if (i > mid)                aux[k] = unsorted[j++]              // merge
        else if (j > hi)            aux[k] = unsorted[i++]
        else if (aux[i] > aux[j])   aux[k] = unsorted[j++]
        else                        aux[k] = unsorted[i++]
    }
}

function bottomUpSort(unsorted, aux) {
    let n = unsorted.length
    for (let size = 1; size < n; size = size + size)
        for (let lo = 0; lo < n - size; lo += size + size)
            bottomUpMerge(unsorted, aux, lo, lo + size - 1, Math.min(lo + size + size, n) - 1)
}
