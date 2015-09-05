/*
	Process Sentence class. Added into function using the syntax:
		var processSentence = require('processSentence.js');
	Then after a file has been added to the 'input' folder called using:
		processSentence.readInput();

*/

var sentiment = require('sentiment') ;
var fs = require('fs');
readInput();

/* Main function, reads file and calls readFile for every file*/
function readInput() {
	// fs.readdir('input', function(err, files){
	// 	files.forEach(function(file) {
	// 		var pathto = 'input/' + file;
	// 		readFile(story.);
	// 	});

	// })
	readFile('story.txt');
}

/*Reads the file content and calls function to print the output file*/
function readFile (file) {
	fs.writeFile('output.json', '[', function(err){
		if (err) throw err;
	})
	fs.readFile(file, 'utf-8', function(err, data){
		if (err) {
			console.log(err) ;
			console.log('err') ;
		} else {
			var lines = data.split('\n') ;
			 lines.forEach( function(line) {
				process(line) ;	
			}); 
			closefile() ;
		}
	});	
}

/*Processes the sentence, writes the score and sentence json encoded to file*/
function process(data) {
	var score = sentiment(data) ;
	var scoreval = score['score'];
	var json = '{"data":"' + data + '", "score":"' + scoreval + '"},\u000A' ;
	fs.appendFile('output.json', json, function(err){
		if (err) throw err;
	})
}

function closefile() {
	var endof = '{"data":"The end.", "score":"0"}]\u000A' ;
	fs.appendFile('output.json', endof, function(err){
		if (err) throw err;
	})
}

