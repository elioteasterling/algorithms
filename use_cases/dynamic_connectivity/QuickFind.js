// eager
// int[] of size N
// connected iff they have the same id => thus they are part of the same connected component

// find: check if p and q have same id

// union: merge comonents containing p and q => change q and every node of it's connected component to the number == to q

class QuickFind {
    ids = []

    constructor(numberOFEntries) {
        for (let i = 0; i < numberOFEntries; i++) ids[i] = i
    }

    static connected(p, q) { return ids[p] === ids[q] } // 2 array accesses

    static union(p, q) {                                // 2n + 2 array accesses, worst case
        p = ids[p]
        q = ids[q]
        for (id of ids)
            if (id === p) id = q
    }
}

