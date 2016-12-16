int stretchSensor = 0;          //Global variable to hold analog sensor values. 
//int state = 0;

void setup() {
  Serial.begin(9600);           //Initialize serial output
}

void loop() {
  stretchSensor = analogRead(A0); //Set stretch sensor to input pin A0
  Serial.println(stretchSensor);  //Print stretch sensor output.
  delay(150);

}

