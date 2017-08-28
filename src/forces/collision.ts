import Force from './force';
import Ball from '../ball';

export default class Collision extends Force {
  
    constructor(description: string, forceVector: p5.Vector) {
        super(description, forceVector);
    }

    public getVector(thing: Ball): p5.Vector {
        return this.forceVector.copy().mult(-1);
    }
  
}