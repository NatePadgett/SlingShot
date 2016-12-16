// Setup Leap loop with frame callback function


var number;
var mano;
var xPos;
var yPos;
var mappedX;
var mappedY;

function leapShow() {
	
  if(number !== undefined){
  	  // textSize(32);
     //  fill(0, 100, 150);
		 
		  mappedX =  map( xPos, -75, 75, 0, width);
		  mappedY = map( yPos, 50, 200, height, 0);

       //data printing
		  //  text("XPosition: "+ xPos,20,100);
		  // text("XRemapped: "+ mappedX,20,150);
		  //  text("YPosition: "+ yPos,20,200);
		  // text("YRemapped: "+ mappedY,20,250);
		  
		  //dot to follow around
		  ellipseMode(RADIUS);  // Set ellipseMode to CENTER
        fill(50);  // Set fill to gray
        ellipse(mappedX, mappedY, 10, 10);  // Draw gray ellipse using CENTER mode
		   
		 }
		 };	
//	}



Leap.loop(function(frame) {
  // Body of callback function
	if(frame.hands.length !== undefined){
		 for (var i = 0; i < frame.hands.length; i++) {
		 	number = frame.hands.length;
         mano = frame.hands[i];
		   xPos = mano.palmPosition[0];
		   yPos = mano.palmPosition[1];
		   //console.log(xPos);
		 }	
	}
	
  //number = frame.hands.blah.blah;
});

