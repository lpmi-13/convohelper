$(function() {

	$('.home-button').on('click', function() {
		window.location.href='/';
	});

	$('#modal1').modal();

	$.urlParam = function(param) {
		var results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(window.location.href);
		if (results == null){
			return null;
		} else {
			return results[1] || 0;
		}
	}

	var pusher = new Pusher('c6580e938510ff65438a', {
		cluster: 'eu',
		encrypted: true 
	});

	var socketId;
	var chatRoomName = $.urlParam('room');
	console.log(chatRoomName);

	pusher.connection.bind('connected', function() {
		socketId = pusher.connection.socket_id;
		console.log(socketId);
	});

	var channel = pusher.subscribe(chatRoomName);
	channel.bind('my_event', function(data) {
		console.log('subscribed to ' + chatRoomName);
		//add new message to the container
		showModal('somebody else wants to say something', data.message);
	});

	function ajaxCall(ajax_url, ajax_data) {
		$.ajax({
			type: 'POST',
			url: ajax_url,
			dataType: 'json',
			data: ajax_data,
			success: function(response, textStatus, jqXHR) {
				console.log(jqXHR.responseText);
			},
			error: function(msg){}
		});
	}

	//send message for contributing
	$('.contribute').on('click', function(e) {
		e.preventDefault();

		var number = Math.floor(Math.random() * sentences.requestFloor.length);
		var floorBid = sentences.requestFloor[number];

		showModal('Say this:', floorBid);

		var room = chatRoomName;		
		var chat_message = {
			room: room,
			socketId : socketId,
		}

		//send to server at route "/messages"
		ajaxCall('/convohelpermessages', chat_message);
		
	});

	//prompt self to agree
	$('.agree').on('click', function(e) {
		e.preventDefault();

		var number = Math.floor(Math.random() * sentences.agree.length);
		var agreement = sentences.agree[number];

		showModal('Say this:', agreement);
	});

	//prompt self to disagree
	$('.disagree').on('click', function(e) {
		e.preventDefault();

		var number = Math.floor(Math.random() * sentences.disagree.length);
		var disagreement = sentences.disagree[number];

		showModal('Say this:', disagreement);		
	});

	//prompt self to confirm
	$('.confirm').on('click', function(e) {
		e.preventDefault();

		var number = Math.floor(Math.random() * sentences.confirmation.length);
		var confirm = sentences.confirmation[number];

		showModal('Say this:', confirm);		
	});

	//prompt self to clarify
	$('.clarify').on('click', function(e) {
		e.preventDefault();

		var number = Math.floor(Math.random() * sentences.clarification.length);
		var clarify = sentences.clarification[number];

		showModal('Say this:', clarify);

	});

	//prompt self to review
	$('.review').on('click', function(e) {
		e.preventDefault();

		console.log('pressed review');

		var number = Math.floor(Math.random() * sentences.reviewing.length);
		var review = sentences.reviewing[number];

		showModal('Say this:', review);		
	});

	function showModal(prompt, sentence) {
		$('#prompt').text('');
		$('#text-to-say').text('');
		$('#prompt').text(prompt);
		$('#text-to-say').text('"' + sentence + '"');
		$('#modal1').modal('open');
	}

});
