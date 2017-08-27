//import typescirpt types. 
///<reference path='../p5-global-mode.d.ts'/>

//import forces
import Ball from "./ball";
import Gravity from './forces/gravity';
import airResistance from './forces/airResistance';

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
let ballAmount = 20;
let balls: Ball[] = [];
let gravityAmount = 50;
let airResistanceAmount = 600;

let setup = function() {
    let gravityForce = new Gravity('Gravity', new p5.Vector(0, gravityAmount));
    let airResistanceForce = new airResistance('airResistance', new p5.Vector(0, airResistanceAmount));
    for(var i=0; i < ballAmount; i++) {
        let randomX = Math.floor(Math.random() * 400) + 1;  
        let randomY = Math.floor(Math.random() * 300) + 1;
        let positionVector = new p5.Vector(randomX, randomY);
        let randomRadius =  Math.floor(Math.random() * 50) + 80;
        balls.push(new Ball(positionVector, [gravityForce, airResistanceForce], randomRadius));
    }
    createCanvas(800, 800);
}

let draw = function() {
    background("white");
    stroke(0);
    frameRate(50);
    balls.forEach((ball) => {
        ball.move(balls);
        ball.draw();
        ball.checkEdges();
    })  
}

let mouseClicked = function() {

}

window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
