export default class Ball {

    private position: p5.Vector;
    private velocity: p5.Vector;
    private forces: p5.Vector[];
    private radius: number;
    private magLimit: number;

    constructor() {

    }

    public addForce(force: p5.Vector): void {
        this.forces.push(force);
    }

    private draw() {
        ellipse(this.position.x, this.position.y, this.radius/2, this.radius/2);
    }

    public move() {
        this.velocity.add(this.getSumForce());
        this.position.add(this.velocity);
    }

    private getSumForce() : p5.Vector {
        return this.forces.reduce((sumOfForces: p5.Vector, value: p5.Vector) => {
            return sumOfForces.add(value);
        }, new p5.Vector(0,0))
    }

}