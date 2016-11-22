$(function() {

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
		// $('.messages_display').append('<p class="message_item">' + data.message + '</p>');
		bootbox.alert('<h2>' + data.message + '</h2>');
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

	//trigger for enter key 
	$.fn.enterKey = function(fnc) {
		return this.each(function() {
			$(this).keypress(function(ev) {
				var keycode = (ev.keyCode ? ev.keyCode : ev.which);
				if (keycode == '13') {
					fnc.call(this, ev);
				}
			});
		});
	}

	//send message for contributing
	$('.contribute').on('click', '.input_send', function(e) {
		e.preventDefault();

		var number = Math.floor(Math.random() * sentences.requestFloor.length);
		var floorBid = sentences.requestFloor[number];
		bootbox.alert('<h2>' + floorBid + '</h2>');

		var room = chatRoomName;		
		var chat_message = {
			room: room,
			socketId : socketId,
		}

		//send to server at route "/messages"
		ajaxCall('/messages', chat_message);

		// $('.input_send_holder').html('<img src="images/loader.gif"/>');
		
	});

	//prompt self to agree
	$('.agree').on('click', '.input_send', function(e) {
		e.preventDefault();

		var number = Math.floor(Math.random() * sentences.agree.length);
		var agreement = sentences.agree[number];

		bootbox.alert('<h2>' + agreement + '</h2>');
	});

	//prompt self to disagree
	$('.disagree').on('click', '.input_send', function(e) {
		e.preventDefault();

		var number = Math.floor(Math.random() * sentences.disagree.length);
		var disagreement = sentences.disagree[number];

		bootbox.alert('<h2>' + disagreement + '</h2>');
		
	});

	//send message on enter key click
	$('body').enterKey(function(e) {
		e.preventDefault();
		$('.input_send').click();
	});

});