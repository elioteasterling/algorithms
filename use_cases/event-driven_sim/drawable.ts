import { height, width } from "./collision-detection"

export class Drawable {

    private radius: number = 20
    private mass:   number = 1
    collisions:     number = 0

    constructor(radius: number, mass: number, initialPosition: { x: number, y: number }) {
        this.px = initialPosition.x
        this.py = initialPosition.y
        this.radius = radius
        this.mass   = mass
    }

    soonestEvent(p: Drawable) {
        const ballCollisionTime  = this.timeTillCollision(p)
        const wallCollisionTimeY = this.timeTillCollisionWithVerticalWall()
        const wallCollisionTimeX = this.timeTillCollisionWithHorizontalWall()
        const times: number[] = []
        if (ballCollisionTime  !== Infinity) times.push(ballCollisionTime)
        if (wallCollisionTimeX !== Infinity) times.push(wallCollisionTimeX)
        if (wallCollisionTimeY !== Infinity) times.push(wallCollisionTimeY)
        return Math.min(...times)
    }

    // position
    private px: number = 0
    private py: number = 0

    // velocity
    private vx: number = 0
    private vy: number = 0

    move(dt: number) {
        // detect collisions with walls
        if ((this.px + this.vx*dt < this.radius) || (this.px + this.vx*dt > 1.0 - this.radius)) this.vx = -this.vx
        if ((this.py + this.vy*dt < this.radius) || (this.py + this.vy*dt > 1.0 - this.radius)) this.vy = -this.vy
        // update current position wrt to the speed of the particle at that moment // first derivative of velocity wrt time (dt)
        this.px += this.vx*dt
        this.py += this.vy*dt
        return this
    }

    draw() {}

    timeTillCollision(p: Drawable) {
        if (this === p) return Infinity
        let dx:   number = p.px   - this.px,
            dy:   number = p.py   - this.py,
            dvx:  number = p.vx   - this.vx,
            dvy:  number = p.vy   - this.vy,
            dvdr: number = dx*dvx + dy*dvy
        if (dvdr > 0) return Infinity

        let dvdv  = dvx^2 + dvy^2
        let drdr  = dx^2  + dy^2
        let sigma = 2 * this.radius

        let d = (dvdr^2 - dvdv * (drdr - sigma^2))
        if (d < 0) return Infinity

        return -(dvdr + Math.sqrt(d)) / dvdv
    }

    timeTillCollisionWithVerticalWall() {
        // detect time until collision wrt the top and bottom walls
        const sigma = this.radius
        const dt    = (height - sigma - this.py) / this.vy
        
        if (this.py + this.vy*dt < this.radius) {                // hit top wall
            this.vy = -this.vy
            this.py = 0 + sigma
            this.px = this.px + this.vx*dt
            return dt
        } else if (this.py + this.vy*dt > height - this.radius) { // hit bottom wall
            this.vx = -this.vx
            this.px = width - sigma
            this.py = this.py + this.vy*dt
            return dt
        }
        return Infinity
    }

    timeTillCollisionWithHorizontalWall() {
       // detect time until collision wrt the top and bottom walls
       const sigma = this.radius
       const dt    = (width - sigma - this.px) / this.vx
       
       if (this.px + this.vx*dt < sigma) {                // hit left wall
           this.vx = -this.vx
           this.px = 0 + sigma
           this.py = this.py + this.vy*dt
           return dt
       } else if (this.px + this.vx*dt > width - sigma) { // hit right wall
           this.vx = -this.vx
           this.px = width - sigma
           this.py = this.py + this.vy*dt
           return dt
       }
       return Infinity
    }

    bounce(p: Drawable) {
        let dx:   number = p.px - this.px, dy:  number = p.py - this.py
        let dvx:  number = p.vx - this.vx, dvy: number = p.vy - this.vy
        let dvdp: number = dx*dvx + dy*dvy
        let dist: number = p.radius + this.radius
        let J:    number = 2 * this.mass * dvdp / ((this.mass + p.mass) * dist)
        let Jx:   number = J * dx / dist
        let Jy:   number = J * dy / dist
        this.vx += Jx / this.mass
        this.vy += Jy / this.mass
        p.vx -= Jx / p.mass
        p.vy -= Jy / p.mass
    }

    verticalWallBounce() {
        throw Error("not implemented")
    }

    horizontalWallBounce() {
        throw Error("not implemented")
    }
}

/**
 * 
 *      new Drawable(
            (Math.random() * radius),
            (Math.random() * mass),
            {                       // initial x & y position
                x: Math.round(Math.ceil(Math.random()) * width), 
                y: Math.round(Math.ceil(Math.random()) * height)
            }
        ))
 * 
 * 
 */