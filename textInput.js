var express = require('express');
var bodyParser = require('body-parser');
var app     = express();


//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 

// Use public/index.html as index page
app.use('/', express.static(__dirname + '/public'));

// Get POST requests that were sent to /writeText
app.post('/writeText', function(req, res) {
	// Get the text ($_POST['story']) and add newline before
  	var writeStr = "\r\n" + req.body.story;

  	// Write new story text to story.txt
	var fs = require('fs');
	fs.appendFile("story.txt", writeStr, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The text has been added to story.txt");
	}); 
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});