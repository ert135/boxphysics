import Force from './forces/force';

export default class World {

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

    constructor(initialPosition: p5.Vector, radius: number) {
        this.radius = radius;
        this.mass = radius / 1.4;
        this.position = initialPosition.copy();
        this.velocity = new p5.Vector(0,0);
        this.acceleration = new p5.Vector(0,0);
    }

}

