import { Comparable } from "contracts/data-structures"
import { exchange } from "Helpers/array-helper"

export function partition(a: Comparable[], lo: number, hi: number) {
    let i = lo, j = hi + 1
    while (true) {
        while (a[++i].compareTo(a[lo])  < 0) if (i === hi) break
        while (a[ lo].compareTo(a[--j]) < 0) if (j === lo) break

        if (i >= j) break
        exchange(a, i, j)
    }
    exchange(a, lo, j)
    return j
}
