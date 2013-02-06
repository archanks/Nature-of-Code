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
    	direction =0; //0 = N, 1 = NE, 2 = E, 3 = SE, 4 = S, 5=SW, 6 = W, 7=NW
  	}

  	void display() {
  		background(0,0);
    	fill(204, 102, 0);
	 	noStroke();
    	ellipse(x,y,10,10);
  	}

  	void step() {
		if(direction==0){ //North
			y--;
			x=x;
		}
		if(direction==1){ //North East
			x++;
			y--;
		}
		if(direction==2){ //East
			y=y;
			x++;
		}
		if(direction==3){ //South East
			x++;
			y++;
		}
		
		if(direction==4){ //South
			x=x;
			y++;
		}
		if(direction==5){ //South West
			x--;
			y++;
		}
		if(direction==6){ //West
			y=y;
			x--;
		}
		if(direction==7){ //North West
			y--;
			x--;
		}
		
		if(random(2)<1)//50% chance
		{
		
			if(mouseX>x && mouseY<y){ // mouse exists in the first quadrant with respect to x&y 
				direction = 1;
			}
			else if(mouseX>x && mouseY==y){ // mouse is on the positive X axis with respect to x&y 
				direction=2;			
			}
			else if(mouseX>x && mouseY>y){ //mouse exists in the fourth quadrant with respect to x&y 
				direction=3;
			}
			else if(mouseX==x && mouseY>y){//mouse exists on the negative Y axis with respect to x&y 
				direction=4;
			}
			else if(mouseX<x && mouseY<y){//mouse exists in the third quadrant with respect to x&y 
				direction=5;
			}
			else if(mouseX<x && mouseY==y){//mouse exists on the negative X quadrant with respect to x&y 
				direction=6;
			}
			else if(mouseX<x && mouseY<y){//mouse exists in the second quadrant with respect to x&y 
				direction=7;
			}
			else if(mouseX==x && mouseY<y){ //mouse exists on the positive Y axis
				direction=0;
			}
			
		
		}
		x = constrain(x, 0, width-11);
        y = constrain(y, 0, height-11);

		
  	}
}