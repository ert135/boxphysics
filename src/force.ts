export default abstract class Force {

    protected forceName: string;
    protected forceVector: p5.Vector

    constructor(description: string, forceVector: p5.Vector) {
        this.forceName = description;
        this.forceVector = forceVector;
    }

    public getVector(object:any) : p5.Vector {
        return this.forceVector.copy();
    }

    public setVector(vector: p5.Vector) : void {
        this.forceVector = vector.copy();
    }

    public getName(): string {
        return this.forceName;
    }
    
}