Random generator;
Walker walker;
void setup(){
	 size(940,500);
	 walker = new Walker();
	 background(0, 0);  
	 generator = new Random();
}

void draw(){

		walker.step();
  		walker.display();

}

		

class Walker {
	int x;
	int y;
	int timerStart;
	int interval;
	int direction;

	Walker() {
    	x = width/2;
    	y = height/2;
    	timerStart = millis();
    	interval=3;
    	direction =0;//0 - upwards, 1 - right, 2 - downwards, 3 - left
  	}

  	void display() {
  		background(0,0);
    	fill(204, 102, 0);
	 	noStroke();
    	ellipse(x,y,10,10);
  	}

  	void step() {
  	
  		 int num = (int) generator.nextGaussian();
  		 int sd = 2;
  		 int mean = 3;
  		 int speed = sd * num + mean;
  		 
		if(direction==0){
			y-=speed;
		}
		if(direction==1){
			x+=speed;
		}
		if(direction==2){
			y+=speed;
		}
		if(direction==3){
			x-=speed;
		}
		int currentTime = millis();
		if(currentTime>=(timerStart+interval)&&currentTime>=(timerStart+interval+500)){
			changeDirection();
			timerStart=currentTime;
		}
		if(x>=width-11 || x<=11 || y>=height-11|| y<=11){
			changeDirection();
		}
		
  	}
  	void changeDirection(){
  		interval = int(random(3));
		interval = interval*1000;
		direction = int(random(4));
  	
  	}
}