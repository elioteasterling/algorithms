import { Comparable } from "contracts/sort"
import { exchange   } from "helpers/array"

// worst case w/ 3x + 1 is O(N^3/2)
// h-sorted => like insertion sort (which has 1 stride) but with strides of length h
// fast for smaller arrays
export function shellSort(a: Comparable[]) {

    const sortsLeft = (h: number, arrayLength: number)  => h < Math.floor(arrayLength/3)
    const nextSort  = (h: number)                       => Math.floor(h/3)

    const L: number = a.length
    let   h: number = hSorts(L)
    
    while (sortsLeft(h, L)) {
        hSort(a, h, L)
        h = nextSort(h)
    }
}

function hSort(a: Comparable[], h: number, L: number) {
    for (let i = h; i < L; i++)
            for (let j = i; j >= h && a[j].compareTo(a[j - h]); j -= h)
                exchange(a, j, j - h)
}

// find where h should start using: the 3x + 1 strategy
function hSorts(arrayLength: number): number {
    let hSorted = 1
    while (hSorted < Math.floor(arrayLength/3)) hSorted = 3 * hSorted + 1
    return hSorted
}