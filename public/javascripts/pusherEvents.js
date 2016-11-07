$(function() {

	var chatRoomNamesArray = ['DeepPink', 'LightSalmon', 'Crimson', 'Red', 'DarkOrange', 'DarkKhaki',
		'RosyBrown', 'Sienna', 'Maroon', 'LawnGreen', 'MediumAquaMarin', 'DarkGreen', 'DarkTurquoise',
		'LightSteelBlue', 'RoyalBlue', 'Thistle', 'Magenta', 'Indigo', 'DimGray'];

	var randomNumber = Math.floor(Math.random() * chatRoomNamesArray.length);
	console.log('randomNumber = ' + randomNumber);

	var chatRoomName = chatRoomNamesArray[randomNumber];

	var pusher = new Pusher('c6580e938510ff65438a', {
		cluster: 'eu',
		encrypted: true 
	});

	var socketId;

	pusher.connection.bind('connected', function() {
		socketId = pusher.connection.socket_id;
		console.log(socketId);
	});

	var channel = pusher.subscribe(chatRoomName);
	channel.bind('my_event', function(data) {
		//add new message to the container
		$('.messages_display').append('<p class="message_item">' + data.message + '</p>');
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

	//send message
	$('body').on('click', '.input_send', function(e) {
		e.preventDefault();

		var room = chatRoomName;

		bootbox.alert('<br/><p class="bg-danger">I\'d like to say something</p>');
		
		var chat_message = {
			room: room,
			socketId : socketId,
		}

		//send to server at route "/messages"
		ajaxCall('http://localhost:3000/messages', chat_message);

		$('.input_send_holder').html('<img src="images/loader.gif"/>');
		
	});

	//send message on enter key click
	$('body').enterKey(function(e) {
		e.preventDefault();
		$('.input_send').click();
	});

});