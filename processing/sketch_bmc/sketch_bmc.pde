PImage[] pics; //i want to put all of the files in data/ in here

File[] files;

int timer = 0;
PImage ImageTop;
PImage ImageBottom;
PImage TempImageTop;
PImage TempImageBottom;
boolean innerSwitch;
int innerCounter;
boolean randomTruth;

void setup() {

  size(800, 800);

  String path = sketchPath+"../../"; 
  files = listFiles(path);

  print(path+"\n"); 
  print(files.length+"\n"); //how many files are here
  println();

  pics=new PImage[files.length];

  for (int i=0; i<files.length; i++) {
    println(files[i]); 
    pics[i]=loadImage(files[i].getName());
  }

  ImageTop = pics[int(random(files.length))];
  ImageBottom = pics[int(random(files.length))];

  innerSwitch = false;
  innerCounter = 0;
  
  randomTruth = true;
}

void draw() {
  background(0);

  timer++;

  if (innerSwitch == true) {
    if(innerCounter < width) {
      
      if (randomTruth == true) {
        pushMatrix();
        translate(0 - innerCounter, 0);  
        image(TempImageTop.get(0, 0, width, height/2), 0, 0, width, height/2);
        popMatrix();
        
        pushMatrix();
        translate(0 + innerCounter, 0); 
        image(TempImageBottom.get(0, height/2, width, height/2), 0, height/2, width, height/2);
        popMatrix();
        
        
        pushMatrix();
        translate(width - innerCounter, 0);  
        image(ImageTop.get(0, 0, width, height/2), 0, 0, width, height/2);
        popMatrix();
        
        pushMatrix();
        translate(-width + innerCounter, 0); 
        image(ImageBottom.get(0, height/2, width, height/2), 0, height/2, width, height/2);
        popMatrix();
      }
      else {
        pushMatrix();
        translate(0 + innerCounter, 0);  
        image(TempImageTop.get(0, 0, width, height/2), 0, 0, width, height/2);
        popMatrix();
        
        pushMatrix();
        translate(0 - innerCounter, 0); 
        image(TempImageBottom.get(0, height/2, width, height/2), 0, height/2, width, height/2);
        popMatrix();
        
        
        pushMatrix();
        translate(- width + innerCounter, 0);  
        image(ImageTop.get(0, 0, width, height/2), 0, 0, width, height/2);
        popMatrix();
        
        pushMatrix();
        translate(width - innerCounter, 0); 
        image(ImageBottom.get(0, height/2, width, height/2), 0, height/2, width, height/2);
        popMatrix();
      }
      
      innerCounter = innerCounter+20;
    }
    else {
      innerSwitch = false;
      innerCounter = 0;
      float rand = random(100);
      if (rand > 50) {
        randomTruth = true;
      }
      else {
        randomTruth = false;
      }
    }
  } else {
    image(ImageTop.get(0, 0, width, height/2), 0, 0, width, height/2);
    image(ImageBottom.get(0, height/2, width, height/2), 0, height/2, width, height/2);
  }

  if (timer > 100)
  {
    TempImageTop = ImageTop;
    TempImageBottom = ImageBottom;
    ImageTop = pics[int(random(files.length))];
    ImageBottom = pics[int(random(files.length))];
    
    timer = 0;
    innerSwitch = true;
  }
}


//taken from http://processing.org/learning/topics/directorylist.html
File[] listFiles(String dir) {
  File file = new File(dir);
  if (file.isDirectory()) {
    File[] files = file.listFiles();
    return files;
  } else {
    // If it's not a directory
    return null;
  }
}

