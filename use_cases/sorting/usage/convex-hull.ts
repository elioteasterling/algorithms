import { Comparable } from "contracts/data-structures"
import { Stack } from "data_structures/Stack"
import { mergeSort } from "../methods/MergeSort"

// ---------------------------- Convex Hull => the perimiter/fence of a polygon ---------------------------- 
//  e.g., 
//      - finding the convex hull of an obstacle to calculate the shortest path from a to b wrt obstacle
//      - find the two points farthest on a plane (useful in statistics)

/**
 *      geometric properties
 *          - the convex hull can be traversed using only counterclockwise turns
 *          - the polar angle of verices increase wrt point p - p having the lowest y coordinate
 */

// is going from a to b to c a clockwise turn?

interface Point_2d { x: number, y: number }
class Point implements Comparable, Point_2d {
    x = 0
    y = 0

    polarOrder(): number {
        return 0
    }

    compareTo(p: Point): number {
        if (this.y > p.y)
            if      (this.polarOrder() > p.polarOrder()) return  1
            else if (this.polarOrder() < p.polarOrder()) return -1
            else return 0
        else if (this.y < p.y)
            if      (this.polarOrder() > p.polarOrder()) return  1
            else if (this.polarOrder() < p.polarOrder()) return -1
            else return 0
        else
            if      (this.polarOrder() > p.polarOrder()) return  1
            else if (this.polarOrder() < p.polarOrder()) return -1
            else return 0
    }
}

function ccw(a: Point | undefined, b: Point | undefined, c: Point): number {
    let crossProduct: Function = () => Infinity
    if (a && b && c)
        crossProduct = () => ((b.x - a.x) * (c.y - a.y)) - ((b.y - a.y) * (c.x - a.x))
    const signedArea = crossProduct()
    if      (signedArea > 0) return  1  // counterclockwise
    else if (signedArea < 0) return -1  // clockwise
    return 0                            // collinear when 0 area
}

// NlogN sorting time, linear otherwise
export function grahamScan(p: Point[]) {
    const L = p.length
    let hull: Stack<Point | undefined> = new Stack<Point>()

    mergeSort(p)    // Point[] gets sorted because Point or any other class must implement Comparable

    for (let i = 2; i < L; i++) {
        let top = hull.pop()
        while (ccw(hull.peek(), top, p[i]) < 1) top = hull.pop()
        hull.push(top)
        hull.push(p[i])
    }
    // find the lowest y coordinate point p
    // sort points by polar angle w/ p
    // discard points unless a ccw turn is detected
}

export function convexHullFrom() {

}

function lowestPoint(p: Point[]) {
    if (!p) return undefined
    let lowestPointIndex = 0
    for (let i = 0; i < p.length; i++)
        if (p[i].y < p[lowestPointIndex].y) lowestPointIndex = i
    return p[lowestPointIndex]
}
