export interface Comparable {
    compareTo: (other: Comparable) => 1 | -1 | 0
}
