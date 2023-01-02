import { Comparable } from "contracts/sort";
import { Point } from "models/line";
import { BST } from "./BinaryTree"

/** **************** 2d Range Search ****************
 *  - Goal
 *      - find out which points are inside some rectangle
 *  - Solution
 *      - recursively partition a plane into halves
 *      - stop adding points once the next point makes it impossible to continue
 *  - Analysis
 *      - Typical case:                 r + log n
 *      - Worst case (when balanced):   r +   √ n
 */

export class K2DTree<V extends Comparable> extends BST<Point, V> {
    distance() {
        // pythagarus
    }

    /**
     *  - Analysis of nearest neighbor search
     *      - typical:    log n
     *      - worst:          n
     */
    nearestNeighbor() {
        this.findQueryNode()
        // start at root (will not have to search once root is reached again if found (can't be on the other side))
        // keep track of the lowest distanced point
        // recursively search left  / bottom (to find a closer point)
        // recursively search right / top    (to find a closer point)
    }

    findQueryNode() {}
}