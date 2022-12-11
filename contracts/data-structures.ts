export type ComparableFunction = (a: any, b: any) => boolean

export interface Comparable {
    compareTo: (other: any) => number
}

export interface Valuable {
    value: () => any
}
