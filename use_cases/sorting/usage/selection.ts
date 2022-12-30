import { Comparable } from 'contracts/sort'
import { partition } from '../sortHelper'
import { knuthShuffle } from './shuffling'

// Hoare Quick-select
// use this if a sorted isn't necessary and you just need to find elements in linear time (instead of linearithmic (e.g., as is the case with quicksort))
export function quickSelect(a: Comparable[], k: number, from = 0, to = a. length - 1) {
    knuthShuffle(a)
    while (to > from) {
        let j = partition(a, from, to)
        if      (j < k) from = j + 1
        else if (j > k) to   = j - 1
        else return a[k]
    }
    return a[k]
}
