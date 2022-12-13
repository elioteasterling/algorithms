import { Comparable } from 'contracts/data-structures'
import { partition } from '../sortHelper'
import { knuthShuffle } from './shuffling'

// Hoare Quick-select
// use this if a sorted isn't necessary and you just need to find elements in linear time (instead of linearithmic (e.g., as is the case with quicksort))
export function quickSelect(a: Comparable[], k: number) {
    knuthShuffle(a)
    let lo = 0, hi = a. length - 1
    while (hi > lo) {
        let j = partition(a, lo, hi)
        if      (j < k) lo = j + 1
        else if (j > k) hi = j - 1
        else return a[k]
    }
    return a[k]
}
