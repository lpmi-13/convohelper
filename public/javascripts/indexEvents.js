$(function() {

	var chatRoomNamesArray = ['DeepPink', 'LightSalmon', 'Crimson', 'Red', 'DarkOrange', 'DarkKhaki',
		'RosyBrown', 'Sienna', 'Maroon', 'LawnGreen', 'MediumAquaMarine', 'DarkGreen', 'DarkTurquoise',
		'LightSteelBlue', 'RoyalBlue', 'Thistle', 'Magenta', 'Indigo', 'DimGray'];

	var openChatRooms = [];

	$('.btn-create').on('click', function() {
		generateRoom();
	});

	function joinChatRoom(chatRoomName) {
		var url = 'http://localhost:3000/messages?room=' + chatRoomName;
		window.location.href = url;
	}

	function generateRoom() {
		if (openChatRooms.length == chatRoomNamesArray.length) {
			return false;
		}
		
		var randomNumber = (function() {
			var number = Math.floor(Math.random() * chatRoomNamesArray.length);
			while (openChatRooms.indexOf(number) > -1) {
				number = Math.floor(Math.random() * chatRoomNamesArray.length);
			}
			return number;
		})();

		var chatRoomName = chatRoomNamesArray[randomNumber];
		openChatRooms.push(randomNumber);
		
		
		$('.group_buttons').append('<input type="submit" value="join ' + chatRoomName + '" id="' + chatRoomName + '" class="btn btn-primary btn-join">');
		$('#' + chatRoomName).on('click', function() {
			console.log('joining' + chatRoomName);
			joinChatRoom(chatRoomName);
		});

	}

});