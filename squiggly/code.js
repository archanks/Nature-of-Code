Mover m;
Oscillator[] oscillators = new Oscillator[40];

void setup()  {  
  size(960, 500); 
  smooth();  
  for (int i = 0; i < oscillators.length; i++) {
    oscillators[i] = new Oscillator();
  }
  background(255);  
  m = new Mover();
}   

void draw() {     
  background(255);  
  
  for (int i = 0; i < oscillators.length; i++) {
    oscillators[i].oscillate();
    oscillators[i].display(m.returnX()+i/2,m.returnY());
  }
  fill(0);
    PVector wind = new PVector(0.01,0);
  PVector gravity = new PVector(0,0.1);
  m.applyForce(wind);
  m.applyForce(gravity);
  m.update();
  m.display();
  m.checkEdges();
  
}   

class Mover {

  PVector location;
  PVector velocity;
  PVector acceleration;
  float mass;

  Mover() {
    location = new PVector(30,30);
    velocity = new PVector(0,0);
    acceleration = new PVector(0,0);
    mass = 1;
  }
  
  void applyForce(PVector force) {
    PVector f = PVector.div(force,mass);
    acceleration.add(f);
  }
  
  float returnX(){
    return(location.x);
  }
  
  float returnY(){
    return(location.y);
  }
  
  void update() {
    velocity.add(acceleration);
    location.add(velocity);
    acceleration.mult(0);
  }

  void display() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    ellipse(location.x+12,location.y,50,20);
  }

  void checkEdges() {

    if (location.x > width) {
      location.x = width;
      velocity.x *= -1;
    } else if (location.x < 0) {
      velocity.x *= -1;
      location.x = 0;
    }

    if (location.y > height) {
      velocity.y *= -1;
      location.y = height;
    }

  }

}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Oscillator {   

  PVector angle;
  PVector velocity;
  PVector amplitude;

  Oscillator() {   
    angle = new PVector();
    velocity = new PVector(random(-0.05, 0.05), random(-0.05, 0.05));
    amplitude = new PVector(25,25);
  }   

  void oscillate() {
    angle.add(velocity);
  }   

  void display(float xPos, float yPos) {   

    float x = sin(angle.x)*amplitude.x;
    float y = sin(angle.y)*amplitude.y;

    pushMatrix();
      translate(xPos, yPos);
    stroke(0);
    strokeWeight(2);
    fill(127,127);
    line(0, 0, x, y);   
    popMatrix();
  }
}   
