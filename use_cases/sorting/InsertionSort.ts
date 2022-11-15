// STABLE => when sorting by one key and then another, the first sort remains
// only good for small or almost completely sorted arrays
export function insertionSort(unsorted: any[], immutable = true) {
    let i = 1
    while (i < unsorted.length) {
        let x = unsorted[i]
        let j = i - 1
        while (j >= 0 && unsorted[j] > x) {
            unsorted[j + 1] = unsorted[j]
            j--
        }
        unsorted[j + 1] = x
        i++
    }
    if (immutable) return Array.from(unsorted)
    return unsorted
}
