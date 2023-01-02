import { Comparable } from "contracts"
import { KdNode } from "data_structures/Node"
import { Point } from "models"
import { BST } from "./BinaryTree"

/** **************** 2d Range Search ****************
 *  - Goal : Check if a point is in some given rectangle
 *      - search returns a rectangle containing the point(s)
 *      - insert further subdivides the plane
 * 
 *  - Solution:
 *      - recursively partition a plane into halves
 *          - even levels - partition using a  vertical   line
 *          - odd  levels - partition using an horizontal line
 *          - for vertical lines:
 *                  /      ( | )      \
 *              left of p      right of p
 *          - for horizontal lines:
 *                  /      ( _ )      \
 *              below p          above p
 * 
 *      - stop adding points once the next point makes it impossible to continue
 * 
 *  - Analysis
 *      - Typical case:                 r + log n
 *      - Worst case (when balanced):   r +   √ n
 */

export class K2DTree<V extends Comparable> extends BST<Point, V> {
    // ---------------------- Nearest Neighbor ----------------------
    distance() {
        // pythagarus
    }
    /**
     *  - Analysis of nearest neighbor search
     *      - typical:    log n
     *      - worst:          n
     */
    nearestNeighbor(n: KdNode<Point, V>) {
        this.findQueryNode(n)
        // Psuedo Code:
        //  - start at root (will not have to search once root is reached again if found (can't be on the other side))
        //  - keep track of the lowest distanced point (disregard larger points)
        //  - recursively search left  / bottom (to find a closer point)
        //  - recursively search right / top    (to find a closer point)

        // Running time:
        //  - typical log  n    where R == # of points returned
        //  - worst        n    (even if tree is balanced)
    }
    findQueryNode(n: KdNode<Point, V>) {}

    // ------------------------ Range Search ------------------------
    rangeSearch() {
        /**
         *  - use a kd tree 
         *      - cyclical and other abnormalities may occur, given the problem space
         * 
         *  - insert all of the points during initialization
         * 
         *  - just change the comparison function to make decisions in relation to the rectangle's position
         * 
         *  - check if point is in the rectangle
         *  - recursively search left  / bottom (to find any more point(s) that might be in rectangle)
         *  - recursively search right / top    (to find any more point(s) that might be in rectangle)
         * 
         *  Running time
         *      - typical R + log  n    where R == # of points returned
         *      - worst   R + sqrt(n)
         */
    }
}