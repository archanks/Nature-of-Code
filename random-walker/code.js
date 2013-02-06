Walker walker;
void setup(){
	 size(940,500);
	 walker = new Walker();
	 background(0, 0);
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
		if(direction==0){
			y--;
		}
		if(direction==1){
			x++;
		}
		if(direction==2){
			y++;
		}
		if(direction==3){
			x--;
		}
		int currentTime = millis();
		if(currentTime>=(timerStart+interval)&&currentTime>=(timerStart+interval+500)){
			interval = int(random(3));
			interval = interval*1000;
			direction = int(random(4));
			timerStart=currentTime;
		}
                 x = constrain(x, 0, width-11);
                 y = constrain(y, 0, height-11);

		
  	}
}