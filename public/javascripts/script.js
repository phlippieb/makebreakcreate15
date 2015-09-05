$(document).ready(function () {
	$("#sendStory").on('click', function(){
		var text = $("#storyText").val();

		console.log(text);

		$.ajax({ 
			url: '/myaction',
			method: 'post',
		    data: { story : text },
		    dataType: "jsonp", 
		    jsonpCallback: "_testcb", 
		    cache: false, 
		    timeout: 5000, 
		    success: function(data) { 
		        $("#writtenText").append(data); 
		    }, 
		    error: function(jqXHR, textStatus, errorThrown) { 
		        //alert('Error connecting to the Node.js server... ' + textStatus + " " + errorThrown); 
		    } 
		});		

		return false;
	});
})