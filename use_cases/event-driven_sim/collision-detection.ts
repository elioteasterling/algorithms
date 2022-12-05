import { PriorityQueue } from './../../data_structures/Queue'

/*
    Example: molecular dynamics of hard discs

        => Priority queues allow dynamic events to be processed in large numbers (N^2 to NlgN time)
            - change state only when something happens

        => Relates observable phenomenon to phyical dynamics
            - e.g. : Maxwell-Boltzmann: distribution of speeds as a function of temperature
            - e.g. : Einstein:          explained Brownian motion of pollen grains 

        Note:
            - pick a reasonable dt so that you're not missing collisions nor over computating

        Example: elastic collision
            - particles move in straight lines until collisions change their vector
            - focus only on when collisions occur
            - maintain PQ of collision events, priorititzed by time
            - remove the min to get the next collision

            - prediction (at time t):   => hit unless one passes the intersection point before the other arrives
                                        => ((end - start - rx) / vx)  => distance / velocity

                dt = NO COLLISION if (dv/dt * dr/dt >= 0)
                   = NO COLLISION if (d < 0)
                   =    COLLISION => -( (dv/dt * dr/dt + Math.sqrt(d) ) / (dv/dt ^ 2) )

                omega = omega(i) + omega(j)

                d = (dv * dr)^2 - ((dv)^2 * (dr^2 - omega^2))

                { dvx, dvy } = ( vx(i) - vx(j), (vy(i) - vy(j)) )
                { drx, dry } = ( rx(i) - rx(j), (ry(i) - ry(j)) )

                dvdv = dvx^2 + dvy^2
                drdr = drx^2 + dry^2
                dvdr = dvx * drx + dvy + dry

            - resolution (at time t + dt):
            
                - velocity after collision => change velocities upon collision

                - Newton's second law:

                    dvx(i) = vx(i) + (Jx / m(i))
                    dvy(i) = vy(i) + (Jy / m(i))
                    dvx(j) = vx(j) - (Jx / m(j))
                    dvy(j) = vy(j) - (Jy / m(j))

                    J = (2 * m(i) * m(j) * (dv * dr)) / omega(m(i) + m(j))

                    Jy = J * dry / omega

                    Jx = J * drx / omega

 */
                    
const width: number = 500, height: number = 500

export class Particle {

    private radius: number = 20
    private mass:   number = 1
    lowestTime:     number = Infinity

    constructor(radius: number, mass: number, initialPosition: { x: number, y: number }) {
        this.px = initialPosition.x
        this.py = initialPosition.y
        this.radius = radius
        this.mass   = mass
    }

    get time() {
        const ballCollisionTime  = this.timeTillCollision(this)
        const wallCollisionTimeY = this.timeTillCollisionWithVerticalWall(this)
        const wallCollisionTimeX = this.timeTillCollisionWithHorizontalWall(this)
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

    timeTillCollision(p: Particle) {
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

    timeTillCollisionWithVerticalWall(p: Particle) {
        // detect time until collision wrt the top and bottom walls
        if (p === this) return Infinity
        const sigma = p.radius
        const dt    = (height - sigma - p.py) / p.vy
        
        if (p.py + p.vy*dt < p.radius) {                // hit top wal
            p.vy = -p.vy
            p.py = 0 + sigma
            p.px = p.px + p.vx*dt
            return dt
        } else if (p.py + p.vy*dt > height - p.radius) { // hit bottom wal
            p.vx = -p.vx
            p.px = width - sigma
            p.py = p.py + p.vy*dt
            return dt
        }
        return Infinity
    }

    timeTillCollisionWithHorizontalWall(p: Particle) {
       // detect time until collision wrt the top and bottom walls
       if (p === this) return Infinity
       const sigma = p.radius
       const dt    = (width - sigma - p.px) / p.vx
       
       if (p.px + p.vx*dt < sigma) {                // hit left wal
           p.vx = -p.vx
           p.px = 0 + sigma
           p.py = p.py + p.vy*dt
           return dt
       } else if (p.px + p.vx*dt > width - sigma) { // hit right wal
           p.vx = -p.vx
           p.px = width - sigma
           p.py = p.py + p.vy*dt
           return dt
       }
       return Infinity
    }

    bounce(p: Particle) {
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
    verticalWallBounce() {}
    horizontalWallBounce() {}
}

export class Sim {
    
    particles = new PriorityQueue<Particle>()
    n: number

    constructor(balls: number) {
        this.n = balls
        for (let i = 0; i < balls; i++) this.particles.add(new Particle(
            (Math.random() * 15),   // radius
            (Math.random() * 20),   // mass
            {                       // initial x & y position
                x: Math.round(Math.ceil(Math.random()) * width), 
                y: Math.round(Math.ceil(Math.random()) * height)
            }
        ))
    }

    clear() {
        
    }

    paint() {
        
    }

    start() {
        while(true) {
            this.clear()
            for(let i = 0; i < this.n; i++) {                
                const min: Particle = this.particles.min() || new Particle(1, 1, { x: 1, y: 1 })
                if(min) min.move(0.5).draw()
            }
            this.paint()
        }
    }
}
