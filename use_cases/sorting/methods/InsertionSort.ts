// STABLE => when sorting by one key and then another, the first sort remains

import { Comparable } from "contracts/sort"
import { exchange   } from "helpers/array"

// only good for small or almost completely sorted arrays
export function insertionSort(a: Comparable[], lo: number = 1, hi: number = a.length) {
    for (let i = lo; i < hi; i++)
        for (let j = i; j > 0; j--)
            if (a[j].compareTo(a[j - 1]) < 0) exchange(a, j, j - 1)
            else break
}
