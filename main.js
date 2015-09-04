var five = require("johnny-five");
var board = new five.Board();
var startButtonPin = 2;
var redLEDPin = 3; // has to be digital, I think
var greenLEDPin = 4; // ditto
var servoPin = 5; // should probably be pwm pin (~ or # on board?)

// create the story file and start the story
var fs = require('fs');
fs.writeFile("story.txt", "This is the story: \n", function(err) {
	if (err) {
		return console.log(err);
	}
});
	
board.on("ready", function() {

	console.log('ready!');

	// get the buttons/LEDs/etc
	var startButton = new five.Button(startButtonPin);
	var redLED = new five.Led(redLEDPin);
	redLED.off();
	var greenLED = new five.Led(greenLEDPin);
	greenLED.off();
	var servo = new five.Servo(servoPin);
	servo.min();

	var min = function(){
		servo.min();
	}


	// start the process
	startButton.on("press", function() {
		
		// placeholder: (kry storySnippet van speech to text)
		var storySnippet = "And spaceships ";

		// placeholder: (validate storySnippet)
		if (true) {

			// placeholder: (save storySnippet to story)
			fs.appendFile('story.txt', storySnippet, function(err) {
				if (err) {
					return console.log(err);
				}
			})

			// green LED on to indicate success
			greenLED.on();
			//greenLED.blink()?

			// make coffee!
			servo.max();
			// wait x seconds:
			setTimeout(min,1000); 
			greenLED.off()

		} else {

			// red LED on to indicate problem
			redLED.on();
			//redLED.blink()?

			// display error message?

		}
		// reset components
		redLED.off();
		greenLED.off();
		servo.min();
	});
});
