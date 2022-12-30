import { Valuable } from './../../contracts/generic';
import { Comparable } from 'contracts/sort'
import { RedBlackTree } from 'data_structures/trees/RedBlackTree'
export class Point implements Comparable {
    x?: number
    y?: number
    
    constructor(x?: number, y?: number) {
        this.x = x
        this.y = y
    }
    
    compareTo(p: Point) {
        // --------- Only for Readability ---------
        const gtPt             = () => ((p?.x || 0) > (this.x || 0)) && ((p?.y || 0) > (this.y || 0))
        const ltPt             = () => ((p?.x || 0) > (this.x || 0)) && ((p?.y || 0) > (this.y || 0))
        const pointDoesntExist = () => !this.x ? -1 : !p.x ? 1 : null
        // ---------- Handle Edge Cases -----------
        for (const pt = pointDoesntExist(); pt !== null;) return pt

        if (gtPt()) return  1
        if (ltPt()) return -1
        return 0
    }
}

export interface Line {
    id:             number  | (() => number)
    beg:            Point
    end:            Point
    slope:          number  | (() => number)
    origin:         Point   | (() => Point)
    intersections?: Point[] | (() => Point[])
}

export class Compster implements Comparable, Valuable {
    value: Comparable
    constructor(v: any) { this.value = v }

    compareTo( c: Comparable) {
        return c.compareTo(this.value)
    }
    

}

export class LineIntersectionDetector {
    lines: Line[]          = []
    yIntersects: RedBlackTree<Compster, Point> = new RedBlackTree<Compster, Point>()
    constructor(lines?: any) { if (lines) this.lines = lines }

    // x coords => event
    // keep track of y coords in a bst
    // vertical line sweeps from left to right
    sweep() {

    }
}
