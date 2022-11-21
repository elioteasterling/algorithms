/*
    molecular dynamics of hard discs

        =>  sim motion on N particles based on the laws of elastic collision

            use priority queues to reduce N^2 time to NlgN

    - pick a reasonable dt so that you're not missing collisions nor over computating

    change state only when something happens

        => particles move in straight lines until collisions change its vector
        => focus only on when collisions occur
        => maintain PQ of collision events, priorititzed by time
        => remove the min to get the next collision

    prediction (at time t):         => hit unless one passes the intersection point before the other arrives
                                    => ((end - start - rx) / vx)  => distance / velocity

    dt = NO COLLISION if (dv/dt * dr/dt >= 0)
       = NO COLLISION if (d < 0)
       =    COLLISION => -( (dv/dt * dr/dt + Math.sqrt(d) ) / (dv/dt ^ 2) )

    omega = omega(i) + omega(j)

    d = (dv * dr)^2 - ((dv)^2 * (dr^2 - omega^2))

    { dvx, dvy } = ( vx(i) - vx(j), (vy(i) - vy(j)) )
    { drx, dry } = ( rx(i) - rx(j), (ry(i) - ry(j)) )

    dv^2 = dvx^2 + dvy^2
    dr^2 = drx^2 + dry^2
    dv * dr = dvx * drx + dvy + dry

    resolution (at time t + dt):    => velocity after collision => change velocities upon collision

    - Newton's second law:

        dvx(i) = vx(i) + (Jx / m(i))
        dvy(i) = vy(i) + (Jy / m(i))
        dvx(j) = vx(i) - (Jx / m(i))
        dvy(j) = vy(i) - (Jy / m(i))

        J = (2 * m(i) * m(j) * (dv * dr)) / omega(m(i) + m(j))

        Jy = J * dry / omega

        Jx = J * drx / omega

 */

export class Particle {

    private radius: number = 20
    private mass:   number = 0

    constructor(radius: number, mass: number) {
        this.radius = radius
        this.mass   = mass
    }

    private collisions: number = 0

    // position
    private rx: number = 0
    private ry: number = 0

    // velocity
    private vx: number = 0
    private vy: number = 0

    move(dt: number) {
        // detect collisions with walls
        if ((this.rx + this.vx*dt < this.radius) || (this.rx + this.vx*dt > 1.0 - this.radius)) this.vx = -this.vx
        if ((this.ry + this.vy*dt < this.radius) || (this.ry + this.vy*dt > 1.0 - this.radius)) this.vy = -this.vy
        // update current position wrt to the speed of the particle at that moment // first derivative of velocity wrt time (dt)
        this.rx += this.vx*dt
        this.rx += this.vx*dt
        return this
    }

    draw() {

    }

    timeTillCollision(p: Particle) {
        if (this === p) return Infinity
        let dx:   number = p.rx - this.rx, dy:  number = p.ry - this.ry
        let dvx:  number = p.vx - this.vx, dvy: number = p.vy - this.vy

        let dvdr: number = dx*dvx + dy*dvy
        if (dvdr > 0) return Infinity

        let dvdv = dvx^2 + dvy^2
        let drdr = dx^2  + dy^2
        let sigma = 2 * this.radius

        let d = (dvdr^2 - dvdv * (drdr - sigma^2))
        if (d < 0) return Infinity

        return -(dvdr + Math.sqrt(d)) / dvdv
    }
    timeTillCollisionWithVerticalWalls() {
    }
    timeTillCollisionWithHorizontalWalls() {}

    bounce(p: Particle) {
        let dx:   number = p.rx - this.rx, dy:  number = p.ry - this.ry
        let dvx:  number = p.vx - this.vx, dvy: number = p.vy - this.vy
        let dvdr: number = dx*dvx + dy*dvy
        let dist: number = p.radius + this.radius
        let J: number = 2 * this.mass * dvdr / ((this.mass + p.mass) * dist)
        let Jx: number = J * dx / dist
        let Jy: number = J * dy / dist
        this.vx += Jx / this.mass
        this.vy += Jy / this.mass
        p.vx -= Jx / p.mass
        p.vy -= Jy / p.mass
        this.collisions++
        p.collisions++
    }
    verticalWallBounce() {}
    horizontalWallBounce() {}
}

export class Sim {
    
    particles: Particle[] = []
    n: number

    constructor(size: number) {
        this.n = size
        for (let i = 0; i < size; i++) this.particles[i] = new Particle((Math.random() * 15), (Math.random() * 20))
    }

    clear() {
        
    }

    paint() {
        
    }

    start() {
        while(true) {
            this.clear()
            for(let i = 0; i < this.n; i++) {                
                this.particles[i].move(0.5).draw()
            }
            this.paint()
        }
    }
}
