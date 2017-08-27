import Force from './force';
import Ball from '../ball';

export default class AirResistance extends Force {
  
    constructor(description: string, forceVector: p5.Vector) {
        super(description, forceVector);
    }

    public getVector(thing: Ball): p5.Vector {
        let friction = thing.getVelocity();
        let normalForce = 5;
        let frictionCoefficient = 0.5 * normalForce;
        friction.mult(-1)
        friction.normalize();
        return friction.mult(frictionCoefficient).copy();
    }
  
}