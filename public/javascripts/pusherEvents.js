$(function() {


	var pusher = new Pusher('c6580e938510ff65438a', {
		cluster: 'eu',
		encrypted: true 
	});

	var channel = pusher.subscribe('test_channel');
	channel.bind('my_event', function(data) {
		//add new message to the container
		$('.messages_display').append('<p class="message_item">' + data.message + '</p>');
		//show the send button
		$('.input_send_holder').html('<input type = "submit" value = "Send" class = "btn btn-primary input_send" />');
		//scroll to bottom of container when new message available
		$('.messages_display').scrollTop($('.messages_display')[0].scrollHeight);
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
	$('body').on('click', '.chat_box .input_send', function(e) {
		e.preventDefault();

		var message = $('.chat_box .input_message').val();
		var name = $('.chat_box .input_name').val();

		if (name === '') {
			bootbox.alert('<br /><p class = "bg-danger">Please enter a name.</p>');

		} else if (message !== '') {
			var chat_message = {
				name: $('.chat_box .input_name').val(),
				message: '<strong>' + $('.chat_box .input_name').val() + '</strong>' + message
			}

			//send to server at route "/messages"
			ajaxCall('http://localhost:3000/messages', chat_message);

			$('.chat_box .input_message').val('');

			$('.input_send_holder').html('<input type = "submit" value = "Send" class = "btn btn-primary" disabled /> &nbsp;<img src = "images/loader.gif"/>');
		}
	});

	//send message on enter key click
	$('.chat_box .input_message').enterKey(function(e) {
		console.log('enter pressed');
		e.preventDefault();
		$('.chat_box .input_send').click();
	});

});