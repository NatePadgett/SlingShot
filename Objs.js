function Target(targetNumber, xRelativeLocation, yRelativeLocation){
	this.targetNum = targetNumber;
	this.xRelativeLoc = xRelativeLocation;
	this.yRelativeLoc = yRelativeLocation;
  this.hitSplats = [];
	this.beenHit = 0;


    this.drawMyTarget = function() {
 // console.log("hi!");
  //for (tx = 100; tx <= (width-100); tx += 100) {
    // if (tx < width-100) {
    //   tx = 100;
    // } 
    
    //Outer ring
  //  push();
  ellipseMode(RADIUS);
    stroke(200, 200, 200);
    strokeWeight(3);
    // fill(243, 241, 241);
    fill(2, 58, 133);
    ellipse(this.xRelativeLoc, this.yRelativeLoc, outerRadius, outerRadius);
   // pop();
    
    //Bullseye
   // push();
    noStroke();
    // fill(208, 7, 7);
    fill(243, 241, 241);
    ellipse(this.xRelativeLoc, this.yRelativeLoc, outerRadius/2-2, outerRadius/2-2);
  //  pop();
  if(this.hitSplats.length !== 0 && this.hitSplats.length !== null ) {
  for (i = 0; i < this.hitSplats.length; i++) {
   image(splatPics[this.hitSplats[i][0]],this.hitSplats[i][1]-0.5*splatWidth,this.hitSplats[i][2]-0.5*splatHeight,splatWidth,splatHeight);
   }
  }
};


this.checkHit = function (xHitLoc, yHitLoc) {
  var paintTarget = 0;
  targetTest = dist(this.xRelativeLoc + travel, this.yRelativeLoc, xHitLoc, yHitLoc);
  if (targetTest <= outerRadius) {
  		this.beenHit = 1;
      paintTarget = 1;
      //this.hitSplats.push(round(random(0,2)), xHitLoc, yHitLoc);
      this.hitSplats = this.hitSplats.concat( [[Math.floor(random(0,100)%3), xHitLoc-travel, yHitLoc]] );
      console.log(this.hitSplats[this.hitSplats.length-1]);
      console.log(this.hitSplats.length);
  }

  return (paintTarget);
};


}
   


      console.log(this.hitSplats.length);
  }

  return (paintTarget);
};


}
   

