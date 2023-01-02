export const x = 1

/**
 *      "Flocking Boids" - [Craig Reynolds, 1986] Simulation
 * 
 *  - rules:
 * 
 *    1. collision avoidance - point away from 'k nearest' boids
 * 
 *    2. flock toward center - point boid toward the flock's center of mass of 'k nearest' boids
 * 
 *    3. velocity matching   - update its velocity to avg of 'k nearest' boids
 * 
 *  - See Also: "Appel's N-body algorithm"
 *      - 3d tree with n particles as nodes
 *      - store center of mass of subtree in each node
 *      - compute force acting on a particle, traverse tree, but stop as soon as 
 *        the distance, from particle to subdivision, is sufficiently large
 * 
 *      - led to a bunch of other cool shit
 * 
 *  */ 