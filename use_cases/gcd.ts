export const gcd = (p: number, q: number) => {
    if (q === 0) return p
    else return gcd(q, p % q)
}
