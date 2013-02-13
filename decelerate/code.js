Mover mover;
float c;

void setup() {
  size(960, 500);
  smooth();
  mover = new Mover(2,30, 100);
  c = 0.0001;
}

void draw() {
  background(255);



    PVector friction = mover.velocity.get();
    friction.mult(-1); 
    friction.normalize();
    friction.mult(c);

    mover.applyForce(friction);
    mover.update();
    mover.display();
    mover.checkEdges();
}

void keyPressed(){
      c = mover.acceleration.get().mag();
      if (key == CODED) {
        if (keyCode == UP) {
           PVector wind = new PVector(0,-0.5);
           mover.applyForce(wind);
        } else if (keyCode == DOWN) {
          PVector wind = new PVector(0, 0.5);
          mover.applyForce(wind);
        } else if(keyCode == LEFT){
          PVector wind = new PVector(-0.5, 0);
          mover.applyForce(wind);
        }
        else if(keyCode==RIGHT){
          PVector wind = new PVector(0.5, 0);
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
    location.add(velocity);
    acceleration.mult(0);
  }

  void display() {
    stroke(0);
    strokeWeight(2);
    fill(0,127);
    ellipse(location.x,location.y,mass*16,mass*16);
  }

  void checkEdges() {

    if (location.x > width) {
      location.x = width;
      velocity.mult(0);
    } else if (location.x < 0) {
      location.x = 0;
      velocity.mult(0);
    }

    if (location.y > height) {
      velocity.y *= -1;
      velocity.mult(0);
    }else if(location.y < 0) {
      location.y = 0;
      velocity.mult(0);
    }

  }

}


