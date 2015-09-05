var five = require("johnny-five");
var scroll = require('lcd-scrolling');
var board = new five.Board();
var startButtonPin = 10;
var redLEDPin = 11; // has to be digital, I think
var greenLEDPin = 12; // ditto

/**
 * Servo
 */
var servoPin = 9; // should probably be pwm pin (~ or # on board?)



// create the story file and start the story
var fs = require('fs');
/*fs.writeFile("story.txt", "This is the story: \n", function(err) {
	if (err) {
		return console.log(err);
	}
});*/

/**
 * Start the process
 */
board.on("ready", function() {


	console.log('ready!');

	// get the buttons/LEDs/etc
	var startButton = new five.Button(startButtonPin);
	var redLED = new five.Led(redLEDPin);
	redLED.off();
	var greenLED = new five.Led(greenLEDPin);
	greenLED.off();
	var servo = new five.Servo({pin: servoPin, range:[50,90]});
	servo.max();

	/**
	 *  LCD
	 */
	var lcd = new five.LCD({
		// LCD pin name  RS  EN  DB4 DB5 DB6 DB7
		// Arduino pin # 12  11   5   4  3  2
		pins: [ 7, 6, 5, 4, 3, 2 ],
		rows: 2,
		cols: 16
	});

	var min = function(){
		 servo.min();
		//servo.max();
	}

	var greenLEDOn = function() {
		greenLED.on();
	}

	var greenLEDOff = function() {
		greenLED.off();
	}

	var redLEDOn = function() {
		redLED.on();
	}

	var redLEDOff = function() {
		redLED.off();
	}

	var redLEDStop = function(cb) {
		redLED.stop().off();
		if(cb !== undefined)
		cb();
	}

	var brewCoffee = function(ledOff) {
		servo.max();
		greenLED.off();
	}

	var timer = function(count, cb){
		lcd.print(count+" ");
		if(cb !== undefined)
		cb();
	}

	// wys die laaste stuk van die dag se storie
	fs.readFile('story.txt', 'utf8', function(err, data) {
		if (err) return console.log("problemo muchacho!");
		var lines = data.split(/\r?\n/);
		lines.pop();
		var numOfLinesToPrint = 5;
		var toPrint = "";
		if (lines.length < 5) {
			for (var i = 0; i < lines.length; i++) {
				toPrint += lines[i];
				toPrint += ' ';
			}
		} else {
			for (var i = lines.length - numOfLinesToPrint; i < lines.length; i++) {
				toPrint += lines[i];
				toPrint += ' ';
			}
		}

		scroll.setup({
	    lcd: lcd, /* Required */
		    // Optional parameters defaults 
		    // debug: false, - true will enable console.log() 
		    // char_length: 16, - Number of characters per line on your LCD 
		    // row: 2, - Number of rows on your LCD 
		    // firstCharPauseDuration: 4000, - Duration of the pause before your text start scrolling. Value in ms 
		    // lastCharPauseDuration: 1000, - Duration to wait before restarting the animation 
		    // scrollingDuration: 300, - Time per step (speed of the animation). 
		    // full: true - Extend text with white space to be animated out of the screen completely 
		    scrollingDuration: 300,
		});
		scroll.line( 0, toPrint);
	});

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
			scroll.clear();
			lcd.cursor(0, 0);
			lcd.print("Whadup?")
			lcd.cursor(1,0);
			setTimeout(function(){
				timer(5);
				setTimeout(function(){
					timer(4);
					setTimeout(function(){
						timer(3);
						setTimeout(function(){
							timer(2);
							setTimeout(function(){
								timer(1);
							},1000);
						},1000);
					},1000);
				},1000);
			},1000);



			// green LED on to indicate success
			greenLED.on();
			//greenLED.blink()?

			// make coffee!
			servo.min();
			// wait x seconds, then servo to min and LED off:
			setTimeout(brewCoffee,1000);

		} else {

			// red LED on to indicate problem
			redLED.blink();
			lcd.cursor(1, 0).print("Error? ");
			setTimeout(function(){
				redLEDStop(function(){
					lcd.clear().cursor(0, 0);
				});
			}, 3000);

			// display error message?
			

		}
		// reset components
		// redLED.off();
		// greenLED.off();
		// servo.min();
	});
});
