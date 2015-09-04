var sentiment = require('sentiment') ;
var fs = require('fs');
readInput();

/* Main function, reads file and calls readFile for every file*/
function readInput() {
	fs.readdir('input', function(err, files){
		files.forEach(function(file) {
			var pathto = 'input/' + file;
			readFile(pathto);
		});

	})
}

/*Reads the file content and calls function to print the output file*/
function readFile (file) {
	fs.readFile(file, 'utf-8', function(err, data){
		if (err) {
			console.log(err) ;
			console.log('err') ;
		} else {
			var testext = data ;
			fs.writeFile('output.json', '', function(args){
				if (err) throw err;
			})
			process(testext) ;
			
		}
	});	
}

/*Processes the sentence, writes the score and sentence json encoded to file*/
function process(data) {
	var score = sentiment(data) ;
	var scoreval = score['score'];
	var json = '{"data":"' + data + '", "score":"' + scoreval + '"}\u000A' ;
	fs.appendFile('output.json', json, function(err){
		if (err) throw err;
	})
}