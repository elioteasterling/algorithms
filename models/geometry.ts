import { Comparable } from 'contracts/sort'

export class Point implements Comparable {
    x?: number
    y?: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    compareTo(p: Point) {
        // --------- Only for Readability ---------
        const gtPt = () => ((p.x || 0) < (this.x || 0)) && ((p.y || 0) < (this.y || 0))
        const ltPt = () => ((p.x || 0) > (this.x || 0)) || ((p.y || 0) > (this.y || 0))
        const pointDoesntExist = () => !this.x ? -1 : !p.x ? 1 : null
        // ---------- Handle Edge Cases -----------
        for (const pt = pointDoesntExist(); pt !== null;) return pt

        if (gtPt()) return  1
        if (ltPt()) return -1
        return 0
    }
}

// Point => the Point is NOT Storing a Value
export class Line implements Comparable {
    id?:            number             | (() => number)
    beg?:           Point
    end?:           Point
    slope?:         number             | (() => number)
    origin?:        Point   | (() => Point)
    intersections?: Point[] | (() => Point[])

    compareTo(l: Line) {
        // --------- Only for Readability ---------
        const gtPt = () => ((l.beg || 0) < (this.beg || 0)) && ((l.end || 0) < (this.end || 0))
        const ltPt = () => ((l.beg || 0) > (this.beg || 0)) || ((l.end || 0) > (this.end || 0))
        const lineDoesntExist = () => !this.beg ? -1 : !l.beg ? 1 : null
        // ---------- Handle Edge Cases -----------
        for (const line = lineDoesntExist(); line !== null;) return line

        if (gtPt()) return  1
        if (ltPt()) return -1
        return 0
    }
}
