// lazy

// array as a forest (multiple trees)

// find: x = id[i] | id[x], etc., until the last entry's value isn't different than the current value
//   =>  p and q are connected if they share the same root (same connected component)

// union: find rootOf(p) and rootOf(q) => ids[rootOf(q)] = ids[rootOf(p)]

export class QuickUnion {
    ids: number[] = []

    root(i: number): number {
        while (i != this.ids[i]) i = this.ids[i]
        return i
    }

    connected(p: number, q: number) {
        return this.root(p) === this.root(q)
    }

    union(p: number, q: number) {
        let rp = this.root(p)
        let rq = this.root(q)
        this.ids[rp] = rq
    }
}

/*
    IMPROVEMENTS

    weighting => don't allow trees to become too big
              => when swapping ids during union, place smaller tree under bigger tree
              => keep track of tree sizes

*/

// depth of any node is at most lg (log base 2) n
export class WeightedQuickUnionWithPathCompression {
    ids: number[] = []
    sz: any []  = []

    root(i: number) {
        while (i !== this.ids[i]) {         // path compression -> two-pass => every node points to root
            this.ids[i] = this.ids[this.ids[i]]   // path compression -> one pass -> every other node points to it's grandparent => 1/2 the path length
            i = this.ids[i]
        }
        return i
    }

    connected(p: number, q: number) {
        return this.root(p) === this.root(q)
    }

    union(p: number, q: number) {
        let rp = this.root(p)
        let rq = this.root(q)
        if (rp === rq) return
        if (this.sz[rp] < this.sz[rq]) {    // q's tree is bigger
            this.ids[rp] = rq
            this.sz[rq] += this.sz[rp]
        } else {                            // p's tree is bigger
            this.ids[rq] = rp
            this.sz[rp] += this.sz[rq]
        }
    }
}