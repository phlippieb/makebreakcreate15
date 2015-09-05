$(document).ready(function () {
	$("form").hide();


	$("#sendStory").on('click', function(){
		var text = $("#storyText").val();
		$("#storyText").val('');
		$("#smile").text('Press the button...');

		socket.emit('writeStory', text);

		$("#storyForm").addClass("hidden");
		$("#smile").removeClass("hidden");

		return false;
	});

	socket.on('buttonPress', function(){
		$("#smile").text('Smile...');
	});

	socket.on('showForm', function(msg){
		console.log("smile added");
		$("#smile").addClass("hidden");
		$("#storyForm").removeClass("hidden");
	});	
})
