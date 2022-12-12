import { Comparable } from 'contracts/data-structures'
import { exchange   } from 'Helpers/array-helper'

// n^2/2 compares, N exchanges - EVEN IF SORTED lol
export function selectionSort(a: Comparable[]) {
    const L = a.length
    for (let i = 0; i < L; i++) {
        let min = i
        for (let j = i + 1; j < L; j++) {
            if (a[j].compareTo(a[min]) > 0) {
                min = j
                exchange(a, j, min)
            }
        }
    }
}