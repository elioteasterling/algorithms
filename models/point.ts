import { Comparable } from "contracts"

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
