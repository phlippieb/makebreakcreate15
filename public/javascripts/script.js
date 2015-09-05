$(document).ready(function () {
	$("#sendStory").on('click', function(){
		var text = $("#storyText").val();

		socket.emit('writeStory', text);

		$("#storyForm").addClass("hidden");
		$("#smile").removeClass("hidden");

		return false;
	});

	socket.on('showForm', function(msg){
		console.log("smile added");
		$("#smile").addClass("hidden");
		$("#storyForm").removeClass("hidden");
	});	
})