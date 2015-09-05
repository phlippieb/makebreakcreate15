var express = require('express');
var bodyParser = require('body-parser');
var app     = express();


//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/', express.static(__dirname + '/public'));


//app.use(express.bodyParser());

// app.get('/', function(req, res) {
//     res.render('views/textForm.html');
// });

//app.use(express.static(__dirname + '/public'));

app.post('/myaction', function(req, res) {
  	//res.send('You sent the name "' + req.body.story + '".');

  	var writeStr = "\r\n" + req.body.story;

	var fs = require('fs');
	fs.appendFile("story.txt", writeStr, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	}); 

});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});