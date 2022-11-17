export const gcd = (p: number, q: number) : number => {
    if (q === 0) return p
    return gcd(q, p % q)
}
