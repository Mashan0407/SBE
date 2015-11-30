// getLocation();

var storeId = getUrlParameter('storeId');
console.log("storeId",storeId);

if(window.innerWidth >1024){
	var scene = document.getElementById('scene');
	var parallax = new Parallax(scene);
	window.parallax=true;
}
$('#mainHeader').text('dd');
$('#ctaHeader').text('LET’s PLAY YOUR MUSIC');
$('#mainHeader').text('SHOWMAN SOUND BOARD');
$('.overlay_bg').click(hide_popups);

var geo_data = ' [' +
'{"id":0, "name":"Amsterdam" , "lat":"52.365428", "lon":"4.885157" , "address":"Leidsestraat 64, 1017 PD Amsterdam, Netherlands" },' +
'{"id":1, "name":"Regent Street" , "lat":"51.514455", "lon":"-0.141933" , "address":"245 Regent Street, London, W1B 2EN"},' +
'{"id":2, "name":"Glasgow - Buchanan Street" , "lat":"55.859440", "lon":"-4.254530" , "address":"61 Buchanan Street, Glasgow, G1 3HL"},' +
'{"id":3, "name":"Bluewater" , "lat":"51.439163", "lon":"0.267952" , "address":"L128, Lower Guild Hall, Bluewater, Bluewater Pkwy, Dartford, Greenhithe, Kent DA9 9SB, United Kingdom"},' +
'{"id":4, "name":"KNIGHTSBRIDGE" , "lat":"51.500208", "lon":"-0.162143" , "address":"75 Brompton Road SW3 1DB"},' +
'{"id":5, "name":"Floral Street" , "lat":"51.512470", "lon":"-0.124016" , "address":"9-10 Floral St, London WC2E 9HW, United Kingdom"},' +
'{"id":6, "name":"Sheffield Meadowhall" , "lat":"53.413040", "lon":"-1.412461" , "address":"Unit 69, High Street, Upper Level, Meadowhall Centre, Sheffield, S. Yorkshire, S9 1EP"},' +
'{"id":7, "name":"Liverpool One" , "lat":"53.404414", "lon":"-2.984652" , "address":"Carphone Warehouse, Peter Ln, Liverpool, Merseyside L1 3DE, United Kingdom"},' +
'{"id":8, "name":"Manchester" , "lat":"53.465849", "lon":"-2.347722" , "address":"UNIT U65, 137 REGENT CRESCENT THE TRAFFORD CENTRE MANCHESTER M17 8AR"},' +
'{"id":9, "name":"Westfield White City" , "lat":"51.507202", "lon":"-0.223242" , "address":" Unit 1011, Westfield, Aerial Way, White City, London W12 7GB, United Kingdom"},' +
'{"id":10, "name":"Dublin" , "lat":"53.340634", "lon":"-6.260591", "address":"42 Grafton Street, Dublin, Dublin 2, Ireland" }]';

var storesObj=JSON.parse(geo_data);




$('.overlay').css('visibility',"visible");
$('.overlay').hide();
var myStore=new Object();

function activate_fun(position){
	console.log('your location', position);

	// alert(position.coords.latitude+" "+position.coords.longitude);
	

	var store="";
	myStore.id=5;
	myStore.name='5thAvStore';

	var json = '{"result":true,"count":1}', obj = JSON.parse(json); 
	storesObj=JSON.parse(geo_data);
	// console.log(storesObj);
	for (var i = 0; i < storesObj.length; i++) {
		storesObj[i].distance=distance(storesObj[i].lat,storesObj[i].lon,position.coords.latitude,position.coords.longitude);
		// console.log(storesObj[i].name,storesObj[i].distance,"miles away"); 
		if(storesObj[i].distance <1){
			store=storesObj[i].name;
			myStore=storesObj[i];		
		};
	};

	

	

	if(storeId){
		
		store=storesObj[storeId].name;
		myStore=storesObj[storeId];
	}




	//sort
	function compare(a,b) {
		if (a.distance < b.distance)
			return -1;
		if (a.distance > b.distance)
			return 1;
		return 0;
	}

	storesObj.sort(compare);
	console.log("sorted");

	//else store="none";


	

	if(store!=""){
		$('#atStore').show();
		$('#storeName').multiline('YOU ARE AT\n'+ store+'\nSTORE');
	}else{
		noStoresAround();

		
	}
	

	//alert("You are "+dist+" miles away from Ted Baker 5th av store, you can play");
	// start_connection();
}



function noStoresAround(){

	$('#storesList').empty(); 

	for (var i = 0; i < storesObj.length; i++) {
		// storesObj[i].distance=distance(storesObj[i].lat,storesObj[i].lon,position.coords.latitude,position.coords.longitude);
		// // console.log(storesObj[i].name,storesObj[i].distance,"miles away"); 
		var store_address=encodeURIComponent(storesObj[i].address +" Ted Baker" );

		var d=storesObj[i].distance;

		var d_text="";

		// console.log('d',d);
		if (d>1)  d_text="    —" +Math.round(d)+ " km from you";
		else if (d<=1)d_text="    —" + Math.round(d*1000) + " m from you";

		$('#storesList').append($('<li><a href=http://maps.google.com?q='+store_address+' target="_blank">'+storesObj[i].name+d_text+'</a></li>'));


		// if(storesObj[i].distance <1)store=storesObj[i].name;
	};



	$('#notAtStore').show();


}



function showAbout(){

	$('#storesListAbout').empty(); 

	for (var i = 0; i < storesObj.length; i++) {
		// storesObj[i].distance=distance(storesObj[i].lat,storesObj[i].lon,position.coords.latitude,position.coords.longitude);
		// // console.log(storesObj[i].name,storesObj[i].distance,"miles away"); 
		var store_address=encodeURIComponent(storesObj[i].address +" Ted Baker" );

		var d=storesObj[i].distance;
		var d_text="";
		// console.log('d',d);

		if (d>1)  d_text="    —" +Math.round(d)+ " km from you";
		else if (d<=1)d_text="    —" + Math.round(d*1000) + " m from you";


		$('#storesListAbout').append($('<li><a href=http://maps.google.com?q='+store_address+' target="_blank">'+storesObj[i].name+d_text+'</a></li>'));


		// if(storesObj[i].distance <1)store=storesObj[i].name;
	};



	$('#AboutProject').show();


}




function hide_popups(){
	$('.overlay').hide();
}

function connect_to_store(){

	ga('send', 'pageview','user pressed connect to store id:'+myStore.id+" "+myStore.name);
	
	$('#ctaHeader').text('YOU ARE CONNECTed to');
	$('#mainHeader').text(myStore.name);
	start_connection();
	hide_popups();

	toggle_bg_sound(false);
}


function connect_to_store_again(){
	ga('send', 'pageview','user decided to play again, store id:'+myStore.id+" "+myStore.name);
	$('#ctaHeader').text('YOU ARE CONNECTed to');
	$('#mainHeader').text(myStore.name);
	start_connection();
	hide_popups();

	toggle_bg_sound(false);
}



function disconected_from_store(){
	$('#ctaHeader').text('LET’s PLAY YOUR MUSIC');
	$('#mainHeader').text('SHOWMAN SOUND BOARD');
	toggle_bg_sound(true);
	$('#wellPlayed').show();
}


