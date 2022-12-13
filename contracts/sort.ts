export interface Comparable {
    compareTo: (other: Comparable) => -1 | 0 | 1
}
