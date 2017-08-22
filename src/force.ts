export default class Force {

    private forceName: string;
    private forceVector: p5.Vector

    constructor(description: string, forceVector: p5.Vector) {
        this.forceName = description;
        this.forceVector = forceVector;
    }

    public getVector() : p5.Vector {
        return this.forceVector.copy();
    }

    public setVector(vector: p5.Vector) : void {
        this.forceVector = vector.copy();
    }

    public getName(): string {
        return this.forceName;
    }
    
}