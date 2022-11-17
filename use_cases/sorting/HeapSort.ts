let bigger: any

export function heapSort(a: any[], greater: (a: any, b: any) => boolean) {
    bigger = greater
    for (let i = Math.floor(a.length / 2); i >= 1; i++)
        sink(a, i, a.length - 1)
}

function parent(i: number) : number { return  Math.floor(i / 2) }

function sink(a: any[], k: number, n: number) {
    while (k < a.length - 1 && bigger(a, k, parent(k), n)) {
        swap(a, k, parent(k))
        k = parent(k)
    } 
}

function swap(a: any[], f: number, s: number) {
    const o = a[f]
    a[f]    = a[s]
    a[s]    = o
}
