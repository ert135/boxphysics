import Force from './forces/force';

export default class Ball {

    public position: p5.Vector;
    private velocity: p5.Vector;
    private forces: Force[];
    private radius: number;
    private magLimit: number;
    private mass: number;
    private acceleration: p5.Vector;
    private r: number;
    private g: number;
    private b: number;

    constructor(initialPosition: p5.Vector, initialForces: Force[], radius: number) {
        this.radius = radius;
        this.mass = radius / 1.4;
        this.position = initialPosition.copy();
        this.velocity = new p5.Vector(0,0);
        this.acceleration = new p5.Vector(0,0);
        this.setColor()

        //copy forces sso we dont get reference problems;
        this.forces = initialForces.map((force: Force) => {
            return force;
        });
    }

    public addForce(forceToAdd: Force) : void {
        //check for duplicate forces here
        this.getForceNames().forEach((force: string) => {
            if(force === forceToAdd.getName()){
                return;
            }
        })

        this.forces.push(forceToAdd);
    }

    private getForceNames() : string[]{
        return this.forces.map((force) => {
            return force.getName();
        })
    }

    private setColor(): void {
        this.r = random(255,1);
        this.g = random(255,1);
        this.b = random(255,1);
    }

    public move() : void {
        this.acceleration.add(this.getSumForce());
        this.velocity.add(this.acceleration.copy());
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    public intersects(balls: Ball[]): void {
        balls.forEach((ball: Ball) => {
            this.checkCollision(ball)
        })
    }

    private checkCollision(other: Ball) : void {
        
        // Get distances between the balls components
        let distanceVect = other.position.copy().sub(this.position);

        // Calculate magnitude of the vector separating the balls
        let distanceVectMag = distanceVect.copy().mag();

        // Minimum distance before they are touching
        let minDistance = this.radius + other.radius;
        
        if (distanceVectMag < minDistance) {

            let distanceCorrection = (minDistance-distanceVectMag)/2.0;
            let d = distanceVect.copy();
            let correctionVector = d.normalize().mult(distanceCorrection);
            other.position.add(correctionVector);
            this.position.sub(correctionVector);

            // get angle of distanceVect
            let theta  = distanceVect.heading();
            let sine = sin(theta);
            let cosine = cos(theta);

            /* bTemp will hold rotated ball positions. You 
            just need to worry about bTemp[1] position*/
            let bTemp = [];
            bTemp.push(new p5.Vector());
            bTemp.push(new p5.Vector());

            /* this ball's position is relative to the other
            so you can use the vector between them (bVect) as the 
            reference point in the rotation expressions.
            bTemp[0].position.x and bTemp[0].position.y will initialize
            automatically to 0.0, which is what you want
            since b[1] will rotate around b[0] */
            bTemp[1].x  = cosine * distanceVect.x + sine * distanceVect.y;
            bTemp[1].y  = cosine * distanceVect.y - sine * distanceVect.x;

            // rotate Temporary velocities
            let vTemp = [];
            vTemp.push(new p5.Vector());
            vTemp.push(new p5.Vector());

            vTemp[0].x  = cosine * this.velocity.x + sine * this.velocity.y;
            vTemp[0].y  = cosine * this.velocity.y - sine * this.velocity.x;
            vTemp[1].x  = cosine * other.velocity.x + sine * other.velocity.y;
            vTemp[1].y  = cosine * other.velocity.y - sine * other.velocity.x;

            /* Now that velocities are rotated, you can use 1D
            conservation of momentum equations to calculate 
            the final velocity along the x-axis. */
            let vFinal = [];
            vFinal.push(new p5.Vector());
            vFinal.push(new p5.Vector());

            // final rotated velocity for b[0]
            vFinal[0].x = ((this.mass - other.mass) * vTemp[0].x + 2 * other.mass * vTemp[1].x) / (this.mass + other.mass);
            vFinal[0].y = vTemp[0].y;

            // final rotated velocity for b[0]
            vFinal[1].x = ((other.mass - this.mass) * vTemp[1].x + 2 * this.mass * vTemp[0].x) / (this.mass + other.mass);
            vFinal[1].y = vTemp[1].y;

            // hack to avoid clumping
            bTemp[0].x += vFinal[0].x;
            bTemp[1].x += vFinal[1].x;

            /* Rotate ball positions and velocities back
            Reverse signs in trig expressions to rotate 
            in the opposite direction */
            // rotate balls
            let bFinal = [];
            bFinal.push(new p5.Vector());
            bFinal.push(new p5.Vector());

            bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
            bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
            bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
            bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

            // update balls to screen position
            other.position.x = this.position.x + bFinal[1].x;
            other.position.y = this.position.y + bFinal[1].y;

            this.position.add(bFinal[0]);

            // update velocities
            this.velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
            this.velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
            other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
            other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
        }
    }

    public removeForce(forceName: string) : void {
        this.forces = this.forces.filter((force: Force) => {
            return forceName === force.getName();
        });
    }

    public getSumForce() : p5.Vector {
        return this.forces.reduce((sumOfForces: p5.Vector, currentForce: Force) => {
            return sumOfForces.add(currentForce.getVector(this)).div(this.mass);
        }, new p5.Vector(0,0).copy());
    }

    public draw() : void {
        fill(this.r, this.g, this.b, 127);
        ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2);
    }

    public checkEdges() : void {
        //need to change this to use collision detection
        if (this.position.x < (0 + this.radius)) {
            this.position.x = (0 + this.radius);
            this.velocity.x *= -1;
        }
        if (this.position.x > (800 - this.radius)) {
            this.position.x = (800 - this.radius);
            this.velocity.x *= -1;
        }

        if (this.position.y < 0) {
            this.velocity.y = this.velocity.y * 1;
        } else if (this.position.y > (800 - this.radius)) {
            this.velocity.y = this.velocity.y * -1;
            this.position.y = (800 - this.radius)
        }
    }

    public getMass(): number {
        return this.mass;
    }

    public getAcceleration(): p5.Vector {
        return this.acceleration.copy();
    }

    public getObjectForce(): p5.Vector   {
        //newtons first law bitch
        return this.acceleration.copy().mult(this.mass);
    }

    public getVelocity(): p5.Vector {
        return this.velocity.copy();
    }

}

