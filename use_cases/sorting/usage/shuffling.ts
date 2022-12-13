import { exchange } from "helpers/array"

// O(N) & in-place
// - number of permutations = Math.factorial(L)
export function knuthShuffle(a: any[]) {
    const L = a.length
    for (let i = 0; i < L; i++) {
        const rand = Math.round(Math.random() * (i + 1))
        exchange(a, i, rand)
    }
}

/**
 *      knuth shuffle used for:
 *      - an online poker variation
 *          - assert a.length % 52 === 0
 *          - number of decks = a.length / 52
 */