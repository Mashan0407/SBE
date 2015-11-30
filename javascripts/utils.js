var IS_IOS = /iphone|ipad/i.test(navigator.userAgent);


//    convertDMS()
// function convertDMS( lat, lng ) {
 
//         var convertLat = Math.abs(lat);
//         var LatDeg = Math.floor(convertLat);
//         var LatSec = (Math.floor((convertLat - LatDeg) * 60));
//         var LatCardinal = ((lat > 0) ? "n" : "s");
         
//         var convertLng = Math.abs(lng);
//         var LngDeg = Math.floor(convertLng);
//         var LngSec = (Math.floor((convertLng - LngDeg) * 60));
//         var LngCardinal = ((lng > 0) ? "e" : "w");

//         console.log(LatDeg + LatCardinal + LatSec  ,  LngDeg + LngCardinal + LngSec);
//          // 51.5004437
//          // 51.5004437
//          // -0.16245769999999998
//         // return LatDeg + LatCardinal + LatSec  + "<br />" + LngDeg + LngCardinal + LngSec;
// }

nodoubletapzoom = function() {
    if (IS_IOS)
        $(this).bind('touchstart', function preventZoom(e) {
            var t2 = e.timeStamp
            , t1 = $(this).data('lastTouch') || t2
            , dt = t2 - t1
            , fingers = e.originalEvent.touches.length;
            $(this).data('lastTouch', t2);
            if (!dt || dt > 500 || fingers > 1) return; 

            e.preventDefault(); 
            $(this).trigger('click').trigger('click');
        });
};
nodoubletapzoom();


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


// // window.addEventListener("keydown", dealWithKeyboard, false);


// function dealWithKeyboard(e) {
//     console.log(e.keyCode);
//     if(e.keyCode==82)socket.emit('restart', 'restart');
// }
// document.addEventListener("touchstart", function() {},false);

// function setTextareaPointerEvents(value) {
//     var nodes = document.getElementsByTagName('textarea');
//     for(var i = 0; i < nodes.length; i++) {
//         nodes[i].style.pointerEvents = value;
//     }
// }

// document.addEventListener('DOMContentLoaded', function() {
//     setTextareaPointerEvents('none');
// });

// document.addEventListener('touchstart', function() {
//     setTextareaPointerEvents('auto');
// });

// document.addEventListener('touchmove', function(e) {
//     e.preventDefault();
//     setTextareaPointerEvents('none');
// });

// document.addEventListener('touchend', function() {
//     setTimeout(function() {
//         setTextareaPointerEvents('none');
//     }, 0);
// });


$.fn.multiline = function(text){
    this.text(text);
    this.html(this.html().replace(/\n/g,'<br/>'));
    return this;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,geoError);
    } else { 
     alert( "Geolocation is not supported by this browser.");
 }
}

function geoError(error) { 
  if (error.code == error.PERMISSION_DENIED)
      alert("user blocked geo location from this page");
}
function showPosition(position) {


  activate_fun(position);
}

function distance(lat1,lon1,lat2,lon2) {
// console.log('dist');
// console.log(lat1,lon1);
// console.log(lat2,lon2);

	var R = 6371//3959; // km (change this constant to get miles)
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
	Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	return d;
}

function startTimer(duration, display_query,onEnd) {
   var  display = document.querySelector(display_query);
   var timer = duration, minutes, seconds;

   var countDown =  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    var second_msg=" Seconds";
    if(seconds<2) second_msg=" Second";

    display.textContent = "your seesion will end in "   +   seconds      +second_msg ;

    if (--timer == 0) {

        display.innerHTML = '<a href="#" onClick=" getLocation()">CONNECT TO WINDOW?</a>';
        clearInterval(countDown);
        onEnd();
    }
}, 1000);
}
