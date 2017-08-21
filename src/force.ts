export default class Force {

    private forceName: string;
    private forceVector: p5.Vector

    constructor(description: string, forceVector: p5.Vector) {
        this.forceName = description;
        this.forceVector = forceVector;
    }

    public getVector() {
        return this.forceVector;
    }

    public setVector(vector: p5.Vector) {
        this.forceVector = vector.copy();
    }
    
}