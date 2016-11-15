$(function() {

	/*
	instantiate a new pusher object and bind it to the index channel on the homepage
	currently the best way I could think of to make sure all the buttons that get generated
	are the same across all screens
	*/
	// var pusher = new Pusher('c6580e938510ff65438a', {
	// 	cluster: 'eu',
	// 	encrypted: true 
	// });

	// var channel = pusher.subscribe('convoHelperIndex');
	// channel.bind('my_event', function(data) {
	// 	console.log('subscribed to convoHelperIndex');
	// 	//display buttons as generated 
	// });

	var chatRoomNamesArray = ['DeepPink', 'LightSalmon', 'Crimson', 'Red', 'DarkOrange', 'DarkKhaki',
		'RosyBrown', 'Sienna', 'Maroon', 'LawnGreen', 'MediumAquaMarine', 'DarkGreen', 'DarkTurquoise',
		'LightSteelBlue', 'RoyalBlue', 'Thistle', 'Magenta', 'Indigo', 'DimGray'];

	var openChatRooms = [];

	$('.btn-create').on('click', function() {
		generateRoomCode();
	});

	function joinChatRoom(chatRoomName) {
		var url = 'http://localhost:3000/messages?room=' + chatRoomName;
		window.location.href = url;
	}

	function generateRoomCode() {
		var newCode = Math.floor(Math.random() * 10000);
		
		$('.group_pin').html('<p>' + newCode + '</p>');
		$('#' + chatRoomName).on('click', function() {
			console.log('joining' + chatRoomName);
			joinChatRoom(chatRoomName);
		});

	}

});