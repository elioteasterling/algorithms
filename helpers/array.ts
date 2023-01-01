export function exchange(a: any[], i: number, j: number) {
    const temp = a[i]
    a[i] = a[j]
    a[j] = temp
}

export function swap(a: any, b: any) {
    const temp = a
    a = b
    b = temp
}
