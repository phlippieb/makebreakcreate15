import processing.video.*;
import pSmile.PSmile;
import processing.serial.*;

Serial myPort;
boolean record;
int imageNo;
int v;
String buttonVal;
Capture cap;
PSmile smile;
PImage img2;
float res, factor;
PFont font;
int w, h;

void setup() {
  myPort = new Serial(this, "/dev/cu.usbmodem1411", 9600);
  size(640,480);
  w = width/2;
  h = height/2;
  background(0);
//  cap = new Capture(this, width, height, Capture.list()[1], 25);
  cap = new Capture(this, width, height);
  cap.start(); // add this to start the device
  img2 = createImage(w,h,ARGB);
  smile = new PSmile(this,w,h);
  res = 0.0;
  factor = 0.0;
  font = loadFont("SansSerif.plain-16.vlw");
  textFont(font,16);
  textAlign(CENTER);
  noStroke();
  fill(255,200,0);
  rectMode(CORNER);
  
  record = false;
  imageNo = 0;
}

void draw() {
  if ( myPort.available() > 0) 
  {  // If data is available,
  buttonVal = myPort.readStringUntil('\n');         // read it and store it in val
  myPort.clear();
    buttonVal = trim(buttonVal);
    //println(buttonVal);
    v = int(buttonVal);
    if(v == 1){
      
      println("Whoohoo");
      record = true;
    }
    

  }
      if(record){
      img2.copy(cap,0,0,width,height,0,0,w,h);
      img2.updatePixels();
      image(cap,0,0);
      res = smile.getSmile(img2);
      if (res>0) {
        factor = factor*0.8 + res*0.2;
        float t_h = factor*30;
        rect(width/2-20,height-t_h-30,40,t_h);
        if(res > 4){
          cap.read();
          PImage cp = cap.get(0, 0, width, height);
          cp.save("../../smiles/capture"+imageNo+".png");
          imageNo++;
          record = false;
        }
        
        
      }
//      String str = nf(res,1,4);
//      text(str,width/2,height-10);
//      myPort.write('1');
    } //else 
//    {                           //otherwise
//    myPort.write('0');          //send a 0
//    }
    
}

void captureEvent(Capture _c) {
  _c.read();
}
