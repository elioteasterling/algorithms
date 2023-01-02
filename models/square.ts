import { Point } from "./point"

export class GridSquare {
    height: number  = 0
    width:  number  = 0
    points: Point[] = []

    constructor(h: number, w: number) {
        this.height = h
        this.width  = w
    }
}