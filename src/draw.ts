//import typescirpt types. 
///<reference path='../p5-global-mode.d.ts'/>

//import modules
import Ball from "./ball";
import Gravity from './gravity';

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
let ballAmount = 10;
let balls: Ball[] = [];
let gravityAmount = 0.5;

let preload = function() {

}

let setup = function() {
    let gravityForce = new Gravity('Gravity', new p5.Vector(0,gravityAmount));
    for(var i=0; i < ballAmount; i++){
        let randomX = Math.floor(Math.random() * 400) + 1;  
        let randomY = Math.floor(Math.random() * 300) + 1;
        let positionVector = new p5.Vector(randomX, randomY);
        let randomRadius =  Math.floor(Math.random() * 140) + 80;
        balls.push(new Ball(positionVector, [gravityForce], randomRadius));
    }
    createCanvas(800, 800);
}

let draw = function() {
    background("white");
    stroke(0);
    frameRate(50);
    balls.forEach((ball) => {
        ball.move();
        ball.draw();
        ball.checkEdges();
    })  
}

let mouseClicked = function() {

}

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
