// STABLE => when sorting by one key and then another, the first sort remains

import { Comparable } from "contracts/data-structures"
import { exchange } from "Helpers/array-helper"

// only good for small or almost completely sorted arrays
export function insertionSort(unsorted: Comparable[]) {
    const L = unsorted.length
    for (let i = 0; i < L; i++)
        for (let j = i; j > 0; j--)
            if (unsorted[j].compareTo(unsorted[j - 1]) < 0) exchange(unsorted, j, j - 1)
            else break
}
