import { Point } from './point'
import { GridSquare } from './square'

const sz: [number, number] = [1, 1]

export const UnitGrid_10x10 = [
    [new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz)],
    [new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz)],
    [new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz)],
    [new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz)],
    [new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz)],
    [new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz)],
    [new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz)],
    [new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz)],
    [new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz)],
    [new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz),new GridSquare(...sz)],
]

export class Grid {

    grid: GridSquare[][] = []
    size: number
    
    constructor(rows: number, cols?: number, size: number = 1) {
        this.size = Math.round(size)
        for (let i = 0; i < rows; i++) {
            this.grid[i] = []
            for (let j = 0; j < (cols || rows); j++)
                this.grid[i][j] = new GridSquare(size, size)
        }
    }

    get() {
        throw Error('/models/grid.ts, class grid, method get() - not implemented!')
    }

    add(pt: Point, needsScaled = false) {
        const row = needsScaled ? (Math.ceil(pt.y!) * this.size) : Math.ceil(pt.y!)
        const col = needsScaled ? (Math.ceil(pt.x!) * this.size) : Math.ceil(pt.x!)
        this.grid[row][col].points.push(pt) 
    }
}
