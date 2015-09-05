$(document).ready(function () {
	$("#sendStory").on('click', function(){
		var text = $("#storyText").val();

		/**
		$.ajax({ 
			url: '/writeText',
			method: 'post',
		    data: { story : text },
		    dataType: "jsonp", 
		    jsonpCallback: "_testcb", 
		    cache: false, 
		    timeout: 5000, 
		    success: function(data) { 
		    	console.log(text + " sent to be written to story.txt")
		        $("div#writtenText").append(text); 
		    }, 
		    error: function(jqXHR, textStatus, errorThrown) { 
		        //alert('Error connecting to the Node.js server... ' + textStatus + " " + errorThrown); 
		    } 
		});		
		**/	

		socket.emit('writeStory', text);

		return false;
	});
})