$(function() {

	$('#selection').on('click', function() {
		$('#none').attr('disabled', true);
		var numberOfGroups = $('#selection').find(':selected').val();
		generateRoomCode(numberOfGroups);
	});

	$('.btn-join').on('click', function() {
		var chatRoomName = $('.enter-pin').val();
		if (chatRoomName.length > 4) {
			console.log('joining' + chatRoomName);
			joinChatRoom(chatRoomName);
		} else {
			//send some alert to enter a room pin
			console.log('computer says no');
		}
	});

	function joinChatRoom(chatRoomName) {
		var url = '/messages?room=' + chatRoomName;
		window.location.href = url;
	}

	function FYShuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	function generateRoomCode(numberOfGroups) {
		$('.group_pin').empty();

		var newCode = Math.floor(Math.random() * 9999);
		var chatRoomNamesArray = ['crimson', 'orange', 'maroon', 'green', 'blue', 'gray'];
		var openChatRooms = [];

		FYShuffle(chatRoomNamesArray);	

		for (i = 0; i < numberOfGroups; i++) {
			openChatRooms.push(chatRoomNamesArray[i]);
		}

		for (i = 0; i < numberOfGroups; i++) {
			$('.group_pin').append('<p class="pin-code">' + newCode + '-' + openChatRooms[i] + '</p>');		
		}

	}

});