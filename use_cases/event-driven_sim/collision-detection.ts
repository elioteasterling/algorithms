import { Comparable }    from 'contracts/data-structures'
import { PriorityQueue } from 'data_structures/Queue'
import { Drawable }      from './drawable'

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
                    
export const width:  number = 512
export const height: number = 512
export const radius: number = 16
export const mass:   number = 32

export class CollisionEvent implements Comparable {
    a: Drawable
    b: Drawable
    time: number

    constructor(time: number, p1?: Drawable, p2?: Drawable) {
        this.time = time
        if (p1) this.a = p1 
        else this.a = new Drawable(1, 1, { x: 1, y: 1 })
        if (p2) this.b = p2
        else this.b = new Drawable(1, 1, { x: 1, y: 1 })
    }

    compareTo(e: CollisionEvent) {
        if (this.time > e.time) return  1
        if (this.time < e.time) return -1
                                return  0
    }

    isValid() {
        return true
    }
}

export class CollisionSystem {
    private pq        = new PriorityQueue<CollisionEvent>()
    private time      = Date.now()
    private drawables = new Array<Drawable> ()

    constructor(elements: number) {
        for (let i = 0; i < elements; i++) this.calcCollisionsFor(this.drawables[i])
        this.clear()
    }

    clear() {
        
    }

    paint() {
        
    }

    simulate() {
        while(!this.pq.isEmpty()) {
            // next event
            const event = this.pq.min()
            if(!event?.isValid()) continue
            const a = event.a
            const b = event.b

            // update position and time
            for(let d of this.drawables) d.move(event.time - this.time)
            this.time = event.time

            // process event
            if (a && b) a.bounce(b)
            else if (a && !b) a.verticalWallBounce()
            else if (!a && b) b.horizontalWallBounce()
            else this.paint()

            // add the next collisions wrt their new position & velocity
            this.calcCollisionsFor(a)
            this.calcCollisionsFor(b)
        }
    }

    main() {
        // get and delete min drawable
        // if invalid -> ignore
        // update each drawable's position
        // update velocities upon collision
        // recalc all collisions for the aforementioned removed drawable and put them all back into the pq
    }

    calcCollisionsFor(d: Drawable) {
        if (!d) return null
        for (let i = 0; i < this.pq.size(); i++) {
            const dt: number = d.timeTillCollision(this.drawables[i])
            // calc all of this Drawable collisions wrt every other particles
            this.pq.add(new CollisionEvent(this.time + dt, d, this.drawables[i]))
        }
        const e1 = new CollisionEvent(this.time + d.timeTillCollisionWithVerticalWall())
        const e2 = new CollisionEvent(this.time + d.timeTillCollisionWithHorizontalWall())
        this.pq.add(e1)
        this.pq.add(e2)
    }
}
