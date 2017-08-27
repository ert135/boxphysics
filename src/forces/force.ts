export default abstract class Force {

    protected forceName: string;
    protected forceVector: p5.Vector

    constructor(description: string, forceVector: p5.Vector) {
        this.forceName = description;
        this.forceVector = forceVector;
    }
    
    public abstract getVector(object:any) : p5.Vector

    public setVector(vector: p5.Vector) : void {
        this.forceVector = vector.copy();
    }

    public getName(): string {
        return this.forceName;
    }
    
}