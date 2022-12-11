import { Comparable } from "contracts/data-structures"

export function exchange(a: Comparable[], i: number, j: number) {
    const temp = a[i]
    a[i] = a[j]
    a[j] = temp
}
