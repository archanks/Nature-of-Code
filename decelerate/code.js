Mover mover;
float c;

void setup() {
  size(960, 500);
  smooth();
  mover = new Mover(2,30, 410);
  c = 0.0001;
}

void draw() {
  background(0,0);



    PVector gravity = new PVector(0, 0.1*mover.mass);
    PVector friction = mover.velocity.get();
    friction.mult(-1); 
    friction.normalize();
    friction.mult(c);

    mover.applyForce(friction);
    mover.applyForce(gravity);
    mover.update();
    mover.display();
    mover.checkEdges();
}

void keyPressed(){
      c = 0.0001;
      if (key == CODED) {
        if(keyCode == LEFT){
          PVector wind = new PVector(-0.75, 0);
           wind.mult(10);
          mover.applyForce(wind);
        }
        else if(keyCode==RIGHT){
          PVector wind = new PVector(0.75, 0);
           wind.mult(10);
          mover.applyForce(wind);
        }
        else if(keyCode==UP){
          PVector wind = new PVector(0,-0.75);
           wind.mult(10);
          mover.applyForce(wind);
        
        }
      }
}

void keyReleased(){
    c = 0.1;
}


class Mover {

  PVector location;
  PVector velocity;
  PVector acceleration;
  float mass;

  Mover(float m, float x , float y) {
    mass = m;
    location = new PVector(x,y);
    velocity = new PVector(0,0);
    acceleration = new PVector(0,0);
  }
  
  void applyForce(PVector force) {
    PVector f = PVector.div(force,mass);
    acceleration.add(f);
  }
  
  void update() {
    velocity.add(acceleration);
    velocity.limit(5);
    location.add(velocity);
    acceleration.mult(0);
  }

  void display() {
    noStroke();
    fill(0,127);
    ellipse(location.x,location.y,mass*16,mass*16);
  }

  void checkEdges() {

    if (location.x > width) {
      location.x = width;
    } else if (location.x < 0) {
      location.x = 0;
    }

    if (location.y > 415) {
      velocity.y*=-1;
      location.y=415;
    }else if(location.y < 15) {
      velocity.y*=-1;
      location.y = 15;
    }

  }

}


