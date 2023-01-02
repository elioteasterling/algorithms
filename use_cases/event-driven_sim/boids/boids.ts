export const x = 1

/**
 *      "Flocking Boids" - [Craig Reynolds, 1986] Simulation
 * 
 *  - rules:
 * 
 *  - collision avoidance - point away from 'k nearest' boids
 * 
 *  - flock toward center - point boid toward the flock's center of mass of 'k nearest' boids
 * 
 *  - velocity matching   - update its velocity to avg of 'k nearest' boids
 * 
 *  */ 