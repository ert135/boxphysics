//import typescirpt types. 
///<reference path='../p5-global-mode.d.ts'/>

//import modules
import Ball from "./ball";
import Force from './force';

//extend existing window property, we have to put the draw and setup functinos of the global window object for p5 to work in global mode
declare global {
    interface Window { 
        setup: any;
        draw: any;
        mousePressed: any;
        mouseReleased: any;
        preload: any;
        mouseClicked: any;
    }
}

let ball: Ball


let preload = function() {
    let gravityForce = new Force('Gravity', new p5.Vector(10,0));
}

let setup = function() {
    createCanvas(800, 800);

}

let draw = function() {

}

let mouseClicked = function() {

}

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
