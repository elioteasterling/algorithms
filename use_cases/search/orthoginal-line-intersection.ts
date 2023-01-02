import { Comparable, Valuable } from 'contracts'
import { RedBlackTree } from 'data_structures/trees/RedBlackTree'
import { Line, Point } from 'models'

/**
 *  Orthogonal Line Intersection Requirements:
 *      - all duplicate pts have been removed prior to this calculation
 *  Goal:
 *      - Given N horizontal and vertical line segments, find all intersections
 *  Sol'ns:
 *      => Quadratic Time:
 *          - each line looks at every other line to see if an intersection exists
 *      => Quadratic Time:
 *          - use: "Sweep-Line" algorithm (sweep a vertical line from left to right)
 *              - x-coords define events
 *              - h-segment (left endpoint): insert y-coord into BST
 */


export class ComparableAny implements Comparable, Valuable {
    value: Comparable
    constructor(v: any) { this.value = v }
    compareTo( c: Comparable) { return c.compareTo(this.value) }
}

/**
 *  - Line that sweeps will find begining x coord of a line
 *      upon encountering an horizontal line:
 *          - if the end of the line is reached, remove the corresponding beginning coordinate from the tree
 *          - the line has been processed -> no hits found
 *      upon encountering a  vertical   line:                                               | yBeg
 *          - "range search" for interval of y-endpoints                                    |
 *          - e.g.                                                                          | yInBstAlready
 *               if an already discovered y-coord exists between yBegin & yEnd, then hit    |
 *               - range search from yBeg to yEnd, if result.length == 0, then no hit       | yEnd
 */                                                                                         
export class LineIntersectionDetector {
    lines: Line[] = []
    yIntersects: RedBlackTree<ComparableAny, Point> = new RedBlackTree<ComparableAny, Point>()
    constructor(lines?: Line[]) { if (lines) this.lines = lines }

    /**
     *  Psuedo Code:
     *      sort || place x-coords in a PQ   - n log n
     *      insert y's into bst              - n log n
     *      delete y's                       - n log n
     *      range search                     - n log n + r
     * 
     *  - where:
     *      n = # of line segments,
     *      r = # of line intersections
     */

    sweep() { /** Maybe I'll do this later if i'm bored and see it again */ }
}

/**
 *  2D orthogonal line search
 *      Grid Implementation:    (m x m)
 *      - space:     n + m^2
 *      - time: (1 + n / m^2) * (# of squares examined)
 * 
 *  Rule of Thumb
 *      - on avg, use an √n X √n sized grid, where n = total number of points
 *          - too small -> wastes memory
 *          - too large -> too many points per square -> wastes compute
 * 
 * 
 *  - Examples:
 *      Grid, 2D Tree, Quadtree, BSP Tree
 * 
 *  Even Distribution of Points
 *      - init   O(n)
 *      - insert O(1)
 *      - range  O(1) (for the # of points in the specified range)
 * 
 *  - applies only to non clustered data
 *      - otherwise compute is slow
 *      - adapt to clustered data by using a tree to recursively subdivide the 2D space
 * 
 *  Clustering (e.g., as is typical with geometric data sets)
 *      - demands better algorithm
 *      - need to adapt to the data
 *      - e.g., higher dimensional computations
 */
