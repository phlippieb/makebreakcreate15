var five = require("johnny-five");
var board = new five.Board();
var startButtonPin = 2;

// create the story file and start the story
var fs = require('fs');
fs.writeFile("story.txt", "This is the story: ", function(err) {
	if (err) {
		return console.log(err);
	}
});
	
board.on("ready", function() {

	console.log('ready!');
	// the start button
	var startButton = new five.Button(startButtonPin);
	button.on("press", function() {
		fs.appendFile('story.txt', 'One day there was', function(err) {
			if (err) {
				return console.log(err);
			}
		});
	});
});
