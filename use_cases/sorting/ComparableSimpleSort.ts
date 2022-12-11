import { Comparable } from 'contracts/data-structures'
import { exchange   } from 'Helpers/array-helper'

export function sort(a: Comparable[]) {
    for (let i = 0; i < a.length; i++)
        for (let j = i; j > 0; j--)
            if (a[j].compareTo(a[j - 1]) < 0) exchange(a, j, j - 1)
            else break
}