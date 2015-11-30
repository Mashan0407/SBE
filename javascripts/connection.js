var isConnected;
function start_connection(){
	console.log("start_connection");

	var server_ip='http://sound.tedbakerpresents.com:3030/'
	// var server_ip=window.location.href;


	if(!window.socket){
		window.socket = io.connect(server_ip);
		

		window.socket.on('connect', function(data) {
			isConnected=true;
			
			startTimer(59, '.connection_status',function(){
				console.log(window.socket);

				isConnected=false;
				window.socket.disconnect();

				
				disconected_from_store();

			});

			// console.log("socket io connected")
			// console.log(window.socket);
			window.socket.emit('join', 'soundboard');
		});

		window.socket.on('messages', function(data) {
			alert(data);
		});

	}else{
		// console.log(window.socket);
		window.socket.connect(server_ip);
	}




}	