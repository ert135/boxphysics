import Force from './force';

export default class Ball {

    private position: p5.Vector;
    private velocity: p5.Vector;
    private forces: Force[];
    private radius: number;
    private magLimit: number;

    constructor(initialPosition: p5.Vector, initialForces: Force[]) {
        this.position = initialPosition.copy();
        this.forces = initialForces.map((force: Force) => {
            return force.getVector();
        });
    }

    public addForce(force: Force): void {
        this.forces.push(force);
    }

    public move() : void {
        this.velocity.add(this.getSumForce());
        this.position.add(this.velocity);
    }

    public removeForce(forceName: string): void {
        this.forces = this.forces.filter((force: Force) => {
            return forceName === force.getName();
        });
    }

    private getSumForce() : p5.Vector {
        return this.forces.reduce((sumOfForces: p5.Vector, currentForce: Force) => {
            return sumOfForces.add(currentForce.getVector());
        }, new p5.Vector(0,0));
    }

    private draw() {
        ellipse(this.position.x, this.position.y, this.radius/2, this.radius/2);
    }

}