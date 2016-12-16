var serial; //variable to hold an instance of the serial port library
var portName = '/dev/cu.usbmodemFD121'; //port for Arduino
var sensorValue = 0; //for incoming serial
var freeState = 0;
var tautState = 1;
var tautThreshold = 715;
var prevState = freeState;
var wallSplats = [];
var targets = [];
var travel = 100;
var maxTravel = 200;
var minTravel = 0;
var direction = 1;
var outerRadius = 42;
var targetTest = 1000;
var numberHit = 0;
var brickWall;
var splatPics = [];
var splatWidth = 25;
var splatHeight = 25;
var targetPainted = 0;
var beginPlaying = 1;
var timeStart = 0;
var timeEnd = 0;
var timeDif = 0;
var promptStart = 0;
var promptDelay = 1;
var starting = 0;
var currentTime = 0;
var pause = 1000;
var timeCount1 = 0;
var timeCount2 = 0;
var timeCount3 = 0;
var timeCount4 = 0;
var messageClear = 0;
var message1var
var message2var;
var message3var;
var message4var;
var finalTime = 0;
var displayFinal = 0;

function preload() {
  brickWall = loadImage("brick_wall.jpg");
  for (i = 1; i <= 3; i++){
    splatPics[i-1] = loadImage("splat"+i+"-2.png");
  }
}

function setup() {
  serial = new p5.SerialPort();            //make a new instance of the serialport library
  serial.on('list', printList);            //set a callback function for the serialport list event
  serial.on('connected', serverConnected); //callback for connecting to the server
  serial.on('open', portOpen);             //callback for the port opening
  serial.on('data', serialEvent);          //callback for when new data arrives
  serial.on('error', serialError);         //callback for errors
  serial.on('close', portClose);           //callback for the port closing
  serial.list();                           //list the serial ports
  serial.open(portName);                   //open a serial port

  createCanvas(600, 400);
  targets.push(new Target(1, 100, 100));
  targets.push(new Target(2, 200, 100));
  targets.push(new Target(3, 300, 100));
  targets.push(new Target(4, 100, 200));
  targets.push(new Target(5, 200, 200));
  targets.push(new Target(6, 300, 200));

}

function draw() {
  frameRate(60);

  //background(150);
  //Target box
 background(220);
  image(brickWall,0,0,width,height);
  image(splatPics[1], width/6, height/4, splatWidth, splatHeight);
  image(splatPics[2], width *2/6, height * 2/4, splatWidth, splatHeight);
  textSize(height/20);

  //if(starting === 0 ){

  //message1var =setTimeout(message1, 0);
  //message2var =setTimeout(message2, 1000);
  //message3var =setTimeout(message3, 2000);
  //message4var =setTimeout(message4, 3000);
  //setTimeout(endMessage, 1000);

  
if (beginPlaying==0){
   startTime();
    }
fill(255);
currentTime = round((frameCount - timeStart) / 60); 
text("Time: " +currentTime, width/20, height/20);



   if(wallSplats.length !== 0 && wallSplats.length !== null ) {
    for (i = 0; i < wallSplats.length; i++) {
    image(splatPics[wallSplats[i][0]],wallSplats[i][1]-0.5*splatWidth,wallSplats[i][2]-0.5*splatHeight,splatWidth,splatHeight);
    }
    }
  push();
  if (frameCount%1 == 0) {
    if (travel > maxTravel || travel < minTravel) {
     direction = -1*direction;
   }
    travel += direction;
    }

  translate(travel,0);
  for (var i = targets.length - 1; i >= 0; i--) {
    targets[i].drawMyTarget();
  }
  pop();
  //var px;                          //x position for painted stripes
  //var th = height-50;              //thickness of painted stripes
  // var tx = width-105;              //x position for targets
  //var tx;

 //for (tx = 100; tx <= (width-100); tx += 100) {
    // if (tx < width-100) {
    //   tx = 100;
    // }
    
    //Outer ring

  //}
   leapShow();
   
   if (endGame()){
      direction = 0;
        textSize(height/10);
    textAlign(CENTER);
    fill(255);
    text("You got them all!!!", width/2, height/3);
    text("It took you: " + finalTime + " seconds!",width/2, height*2/3);
   }
  
  // textSize(20);
  // text(sensorValue, 20, 20);

  var currentState;
  
  if (sensorValue <= tautThreshold) {
    currentState = tautState;
  } else {
    currentState = freeState;
    if (prevState == tautState) {
      slingShot();
      //  fill(255, 0, 0);
      // //     image(splat, 175, 200);
      //  ellipse(random(100,(width-100)), (height*0.4255), 50, 50);     
    }
  }
  prevState = currentState;

}

function mouseClicked() {
  if (beginPlaying !==0 && number !== undefined){
  targetPainted = 0;
  for (var i = targets.length - 1; i >= 0; i--) {
    targetPainted += targets[i].checkHit(mappedX,mappedY);
  }

if(!(targetPainted)){
 wallSplats = wallSplats.concat( [[Math.floor(random(0,100)%3), mappedX, mappedY]] );
}
}
  return false;

}

function slingShot() {
  if (beginPlaying !==0 && number !== undefined){
  targetPainted = 0;
  for (var i = targets.length - 1; i >= 0; i--) {
    targetPainted += targets[i].checkHit(mappedX,mappedY);
  }

if(!(targetPainted)){
 wallSplats = wallSplats.concat( [[Math.floor(random(0,100)%3), mappedX, mappedY]] );
}
}
  return false;


}

function endGame() {

  numberHit = 0
  for (var i = targets.length - 1; i >= 0; i--) {
    numberHit += targets[i].beenHit;
  }

  if (numberHit == targets.length) {
   if (displayFinal === 0){
      finalTime = currentTime;
      displayFinal = 1;
  }
    return true;
  } else {
    return false;
  }

}


function message1 () {
  text("Get ready to shoot the targets in 3...", width/50, height/5);
  clearTimeout(message1var);
}

function message2 () {
  text("Get ready to shoot the targets in 3... 2...",width/50, height/5);
  clearTimeout(message2var);
}

function message3 () {
 text("Get ready to shoot the targets in 3... 2... 1...",width/50, height/5);
 clearTimeout(message3var);
}


function message4 () {
text("GO!!! ", width/25, height/10);
clearTimeout(message4var);
beginPlaying = 1;
timeStart = frameCount;
}

function startTime(){
   timeStart = frameCount;
   beginPlaying = 1;

}

// get the list of ports:
function printList(portList) {
  //portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    //Display the list in the console: 
    console.log(i + " " + portList[i]);
  }
}

function serialEvent() {
  //read a string from the serial port:
  var inString = serial.readLine();
  //check to see that there's actually a string there:
  if (inString.length > 0) {
    //convert it to a number:
    sensorValue = Number(inString);
  }
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.');
}


function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}








function draw() {
  //background(150);
  //Target box
 background(220);
  image(brickWall,0,0,width,height);
  image(splatPics[1], 100, 100, 50, 50);
  image(splatPics[2], 200, 200, 50, 50);
   if(wallSplats.length !== 0 && wallSplats.length !== null ) {
    for (i = 0; i < wallSplats.length; i++) {
    image(splatPics[wallSplats[i][0]],wallSplats[i][1]-0.5*splatWidth,wallSplats[i][2]-0.5*splatHeight,splatWidth,splatHeight);
    }
    }
  push();
  if (frameCount%1 == 0) {
    if (travel > maxTravel || travel < minTravel) {
     direction = -1*direction;
   }
    travel += direction;
    }

  translate(travel,0);
  for (var i = targets.length - 1; i >= 0; i--) {
    targets[i].drawMyTarget();
  }
  pop();
  //var px;                          //x position for painted stripes
  //var th = height-50;              //thickness of painted stripes
  // var tx = width-105;              //x position for targets
  //var tx;

 //for (tx = 100; tx <= (width-100); tx += 100) {
    // if (tx < width-100) {
    //   tx = 100;
    // }
    
    //Outer ring

  //}
   leapShow();
   if (endGame()){
      direction = 0;
   }
  
  // textSize(20);
  // text(sensorValue, 20, 20);

  var currentState;
  
  if (sensorValue <= tautThreshold) {
    currentState = tautState;
  } else {
    currentState = freeState;
    if (prevState == tautState) {
      slingShot();
      //  fill(255, 0, 0);
      // //     image(splat, 175, 200);
      //  ellipse(random(100,(width-100)), (height*0.4255), 50, 50);     
    }
  }
  prevState = currentState;
}



function slingShot() {
  targetPainted = 0;
  for (var i = targets.length - 1; i >= 0; i--) {
    targetPainted += targets[i].checkHit(mappedX,mappedY);
  }

if(!(targetPainted)){
 wallSplats = wallSplats.concat( [[Math.floor(random(0,100)%3), mappedX, mappedY]] );
}
  return false;

}

function endGame() {

  numberHit = 0
  for (var i = targets.length - 1; i >= 0; i--) {
    numberHit += targets[i].beenHit;
  }

  if (numberHit == targets.length) {
    console.log("You Won In: " + frameCount);
    return true;
  } else {
    return false;
  }

}

// get the list of ports:
function printList(portList) {
  //portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    //Display the list in the console: 
    console.log(i + " " + portList[i]);
  }
}

function serialEvent() {
  //read a string from the serial port:
  var inString = serial.readLine();
  //check to see that there's actually a string there:
  if (inString.length > 0) {
    //convert it to a number:
    sensorValue = Number(inString);
  }
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.');
}


function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}






