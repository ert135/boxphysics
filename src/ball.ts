import Force from './forces/force';
import collision from './forces/collision'

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
            let distance = dist(this.position.x, this.position.y, ball.position.x, ball.position.y);
            //line(this.position.x, this.position.y, ball.position.x, ball.position.y)
            if (distance < this.radius + ball.radius && (distance !== 0)) {
                this.velocity.x *= -1 ;
                this.velocity.y *= -1 ;
                ball.velocity.x *= -1 ;
                ball.velocity.y *= -1 ;
            } else {


            }
        })
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

