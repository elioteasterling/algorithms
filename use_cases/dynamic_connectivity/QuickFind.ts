// eager
// int[] of size N
// connected iff they have the same id => thus they are part of the same connected component

// find: check if p and q have same id

// union: merge comonents containing p and q => change q and every node of it's connected component to the number == to q

export class QuickFind {
    ids: number[] = []

    connected(p: number, q: number) { return this.ids[p] === this.ids[q] } // 2 array accesses

    union(p: number, q: number) {                                // 2n + 2 array accesses, worst case
        p = this.ids[p]
        q = this.ids[q]
        for (let id of this.ids)
            if (id === p) id = q
    }
}

