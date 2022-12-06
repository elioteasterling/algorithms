export type ComparableFunction = (a: any, b: any) => boolean

export interface Comparable {
    greater: (a: any) => boolean
}

export interface Valuable {
    value: () => any
}
