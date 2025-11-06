/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new Frankystein(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class Frankystein {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    
    // add properties for your dancer here:
    this.amplitude = 10; // 幅度
    this.speed = 0.03;   // 速度
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
      this.t = frameCount * this.speed;

    this.eyeOffset = sin(this.t * 6) * 1.6;
    this.mouthOffset = sin(this.t * 8) * 1.3;
    this.armWave = sin(this.t * 3) * 50;
    this.float = sin(this.t * 2);
  }
  display() {

    push();
    translate(this.x + this.float * 10, this.y + this.float * 20);

    let t = frameCount * this.speed;
    let amp = this.amplitude;
    let headOffset = sin(t * 3) * amp * 0.6; 
    let bodyOffset = cos(t * 3) * amp *4; 
    let pointSize = 4;

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    
    strokeWeight(2);

    //skull
    push();
    stroke(255, 200, 0);
    noFill();           
    
    let skullStartX = 0;
    let skullStartY = -30 + headOffset * 0.5;
    
    beginShape();
    vertex(skullStartX, skullStartY);
    circle(skullStartX, skullStartY, pointSize);

    let headAnchorX1 = 0;
    let headAnchorY1 = -75 + headOffset;
    bezierVertex(-amp * 2, -50 + sin(t + 1) * 5 , -50 + sin(t + 2) * 5, -80 , headAnchorX1, headAnchorY1);
    circle(headAnchorX1, headAnchorY1, pointSize);
    
    let headAnchorX2 = 0;
    let headAnchorY2 = -30 + headOffset * 0.5;
    bezierVertex(50 + sin(t + 3) * 5, -80 , amp * 2, -50 + sin(t + 4) * 5 , headAnchorX2, headAnchorY2);
    endShape();
    circle(headAnchorX2, headAnchorY2, pointSize);
    circle(-12, -60 + this.eyeOffset, 8 + this.eyeOffset * 0.2);
    circle(12, -60 + this.eyeOffset, 8 + this.eyeOffset * 0.2);
    line(-9, -45 + this.mouthOffset, 7, -43 - this.mouthOffset);
    pop();

    //body
    stroke(255);
    noFill();
    
    let bodyStartX = 0;
    let bodyStartY = -25 + headOffset * 1.5; 
    
    beginShape();
    vertex(bodyStartX, bodyStartY);
    circle(bodyStartX, bodyStartY, pointSize);
    
    let bodyAnchorX = 0;
    let bodyAnchorY = 40;
    bezierVertex(bodyOffset + amp * 2, -10 , -bodyOffset - amp * 2, 20 , bodyAnchorX, bodyAnchorY);
    endShape();
    circle(bodyAnchorX, bodyAnchorY, pointSize);

    //semi-transparent body
    push();
    noStroke();
    fill(225, 225, 225, 80);
    rect(-15, -22, 30, 70, 8);
    pop();

    //arms
    stroke(80, 255, 255);
    noFill();

    //left goes up when right goes down
    let armOffsetL = -this.armWave;
    let armOffsetR =  this.armWave;

    //armL
    let armLStartX = -15;
    let armLStartY = -8;
    beginShape();
    vertex(armLStartX, armLStartY);
    circle(armLStartX, armLStartY, pointSize);

    let armLAnchorX = armLStartX - 6 + armOffsetL * 0.55;
    let armLAnchorY = -20 + armOffsetL * 1.2;
    bezierVertex(
      armLStartX - 10, armLStartY - 10,
      armLStartX - 5, armLStartY - 5,
      armLAnchorX, armLAnchorY
    );
    endShape();
    circle(armLAnchorX, armLAnchorY, pointSize);

    //armR
    let armRStartX = 15;
    let armRStartY = -8;
    beginShape();
    vertex(armRStartX, armRStartY);
    circle(armRStartX, armRStartY, pointSize);

    let armRAnchorX = armRStartX + 6 + armOffsetR * 0.55;
    let armRAnchorY = -20 + armOffsetR * 1.2;
    bezierVertex(
      armRStartX + 10, armRStartY - 10,
      armRStartX + 5, armRStartY - 5,
      armRAnchorX, armRAnchorY
    );
    endShape();
    circle(armRAnchorX, armRAnchorY, pointSize);
    
    
    //legs
    stroke(255, 0, 0);
    noFill();
    let legOffsetL = sin(t * 2.5) * amp * 1.8;
    let legOffsetR = sin(t * 2.5 + PI) * amp * 2.3;

    //legL
    let legLStartX = -10;
    let legLStartY = 42;
    beginShape();
    vertex(legLStartX, legLStartY);
    circle(legLStartX, legLStartY, pointSize);
    
    let legLAnchorX = -10 + legOffsetL * 0.5;
    let legLAnchorY = 85 + legOffsetL * 0.7;
    bezierVertex(-10 + legOffsetL * 2, 50 , -10 - legOffsetL * 1.5, 60 , legLAnchorX, legLAnchorY);
    endShape();
    circle(legLAnchorX, legLAnchorY, pointSize);

    //legR
    let legRStartX = 10;
    let legRStartY = 38;
    beginShape();
    vertex(legRStartX, legRStartY);
    circle(legRStartX, legRStartY, pointSize);
    
    let legRAnchorX = 10 - legOffsetR * 0.5;
    let legRAnchorY = 85 + legOffsetR * 0.7;
    bezierVertex(10 - legOffsetR * 2, 50 , 10 + legOffsetR * 1.5, 60 , legRAnchorX, legRAnchorY);
    endShape();
    circle(legRAnchorX, legRAnchorY, pointSize);

    //change back
    fill(255);
    stroke(0);

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    //this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}

// Global function (usually defined outside the class)
function drawFloor() {
  noStroke();
  fill(100);
  rect(0, height - 50, width, 50);
}


/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/