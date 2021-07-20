let particles = [];
let dance =[];
let num = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  background(random(150, 250), 50, 100);
  num = height*0.04
  for (let i = 0; i < num; i++){
    dance.push(new Lattice());
}
}

function draw() {
  background(random(150, 250), random(100), 100, 0.5);
  if (frameCount%3== 0){
  for (let i = 0; i < dance.length; i++) {
  dance[i].edges();
 dance[i].step();
  dance[i].display();
  
  
  }
  }
  particles.push(new Element(createVector(random(width), random(height))));

  for(let i = particles.length - 1; i >= 0; i--){
    let p = particles[i];
    p.run();
    if (p.ghost()){
      particles.splice(i, 1);
    }
  }
}

class Element {
  constructor(loc) {
    this.accel = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.vel = createVector(random(-1,1), random(-1,1));
    this.loc = loc.copy();
    this.len = random(20);
    this.lifespan = 255.0;
    this.H1 = 300;
  }

  run(){
    this.update();
    this.display();
  }

  update(){
    this.vel.add(this.accel);
    this.loc.add(this.vel);
    this.lifespan -= random(1,2);
    this.H1 += random(5);
  }

  display(){
    noStroke();
    rectMode(CENTER)
    fill(this.H1, random(100), random(100), this.lifespan);
    //fill(random(30,50), random(50), 100, 50);
    push();
    translate(width / 2, height / 2);
    //scale(map(mouseX, 0, width, 0.2, 1));
    scale(0.3)
    beginShape();
    let a = atan2(mouseY - height / 2, mouseX - width / 2);
  rotate(a);
    vertex(this.loc.x + random(-2,2), this.loc.y+this.len*0.5 + random(-2,2));
    vertex(this.loc.x + this.len + random(-2,2), this.loc.y + this.len + random(-2,2));
    vertex(this.loc.x + this.len + random(-2,2), this.loc.y + 2*this.len + random(-2,2));
    vertex(this.loc.x + random(-2,2), this.loc.y + this.len*2.5 + random(-2,2));
    vertex(this.loc.x - this.len + random(-2,2), this.loc.y + 2 * this.len + random(-2,2));
    vertex(this.loc.x - this.len + random(-2,2), this.loc.y + this.len + random(-2,2));
    endShape(CLOSE);
    pop();

    if (this.H1 >= 360){
      this.H1 = 300;
    }
  }
  ghost(){
    if (this.lifespan < 0.0){
      return true;
    } else {
      return false;
    }
  }
}
class Lattice{
  constructor(){
  //this.loc = createVector(width/2,height/2);
    this.loc = createVector(width/2, height/2);
    this.len = random(20, 60);
    this.H = 0;
  }

  display(){
    //lines
    strokeWeight(random(1, 5));
    //fill(H-50, random(100), random(360), 0.2);
    //stroke(this.H);
    stroke(random(20))
    noFill();
    beginShape();
    vertex(this.loc.x, this.loc.y);
    vertex(this.loc.x + this.len + random(5), this.loc.y + random(5));
    vertex(this.loc.x + this.len + random(5), this.loc.y + this.len + random(5));
    endShape();
  }

  edges(){
    if (this.loc.x <= 0){
        this.loc.x += 5
    }
    if (this.loc.x >= width){
        this.loc.x -= 5
    }
    if (this.loc.y <= 0){
        this.loc.y += 5
    }
    if (this.loc.y >= height){
      this.loc.y -= 5
      }
    if (this.H >= 150){
      this.H = 0;
    }
    }

  step(){
    this.H += random(10);
    let choice = floor(random(4));
    if (choice == 0){
        this.loc.x+= random(5,20);
    }
    else if (choice == 1){
        this.loc.x -= random(5,20);
    }
    else if (choice == 2){
        this.loc.y += random(5,20);
    } else {
      this.loc.y -= random(5,20);
      }
    }
}
