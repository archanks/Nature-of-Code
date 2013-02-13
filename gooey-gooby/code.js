Bag bag;
Resistance[] resistance = new Resistance[2];

void setup(){
  size(960,500);
  smooth();
  bag = new Bag(0.15, 0, 0);
  resistance[0] = new Resistance(85,55,210,140,0.002);
  resistance[1] = new Resistance(590,150,290,150,0.035);
}

void draw(){
  background(0,0);
  for(int i=0;i<2;i++){
    if (resistance[i].contains(bag)) {
      PVector dragForce = resistance[i].drag(bag);
      bag.applyForce(dragForce);
    }
  }
   PVector wind = new PVector(random(-0.1,0.1),random(-0.075,0.05));
  PVector gravity = new PVector(0, 0.1*bag.mass);
  bag.applyForce(gravity);
  bag.applyForce(wind);
  bag.update();
  bag.display();
  bag.checkEdges();
}

class Bag {


  PVector location;
  PVector velocity;
  PVector acceleration;
  PImage img;
  float mass, angle,jitter;

  Bag(float m, float x, float y) {
    mass = m;
    location = new PVector(x, y);
    velocity = new PVector(0, 0);
    acceleration = new PVector(0, 0);
    img = loadImage("bag.png");
  }


  void applyForce(PVector force) {
    
    PVector f = PVector.div(force, mass);
    acceleration.add(f);
  }

  void update() {
    
    velocity.add(acceleration);
    velocity.limit(3);
    location.add(velocity);
    acceleration.mult(0);
  }
  
  
  void display() {
 
    if (second() % 2 == 0) {  
      jitter = random(-0.01, 0.01);
    }
    angle = angle + jitter;
    float c = cos(angle);
    translate(location.x, location.y);
    rotate(c);
    image(img,0,0); 
  }
  
  void checkEdges() {

    if (location.x > width) {
      location.x = width;
      velocity.x *= -1;
    } else if (location.x < 70) {
      location.x = 70;
      velocity.x *= -1;
    }

    if (location.y > height-140) {
      velocity.y *= 0;
      location.y = height-140;
    }else if (location.y < 0) {
      location.y = 0;
      velocity.y *= -1;
    }

  }

}


 class Resistance {

  
  float x,y,w,h;
  float c;

  Resistance(float x_, float y_, float w_, float h_, float c_) {
    x = x_;
    y = y_;
    w = w_;
    h = h_;
    c = c_;
  }
  
  
  boolean contains(Bag m) {
    PVector l = m.location;
    if (l.x > x && l.x < x + w && l.y > y && l.y < y + h) {
      return true;
    }  
    else {
      return false;
    }
  }
  
  PVector drag(Bag b) {
    
    float speed = b.velocity.mag();
    float dragMagnitude = c * speed * speed;
    PVector dragForce = b.velocity.get();
    dragForce.mult(-1);
    dragForce.normalize();
    dragForce.mult(dragMagnitude);
    return dragForce;
  }
  
  void display() {
    noStroke();
    fill(50);
    rect(x,y,w,h);
  }

}
