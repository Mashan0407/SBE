

if(window.innerHeight <380){
	$('#betterPortrait').show();


	var onClick = function() {
        audio.play(); // audio will load and then play
	}
	this.getElementById("bg").addEventListener('click', onClick, false);
	
}

	window.addEventListener("orientationchange", function() {
  // Announce the new orientation number
  		if(window.innerHeight <350){
  			$('#betterPortrait').show();
	 		}
  		}else{
  			$('#betterPortrait').hide();
  		}
}, false);


function findPos(obj) {

	var curleft = curtop = 0;

	if (obj.offsetParent)
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;

		} while (obj = obj.offsetParent);

		return [curleft,curtop];
	}


	$('body').ready(function() {

		var table = [
		"VERY WELL", "1.mp3",
		"BEAUTIFUL FACE", "2.mp3",
		"DO RE MI", "3.mp3",
		"HAPPY HOLIDAY!", "4.mp3",
		"HAVE YOU BEEN GOOD?", "5.mp3",
		"HELLO SANTA!", "6.mp3",
		"LAAAA!", "7.mp3",
		"RETWEET ME!", "8.mp3",
		"MERRY CHRISTMAS!", "9.mp3",
		"SLEIGH BELLS", "10.mp3",
		"APPLAUSE", "11.mp3",
		"FIGGY PUDDING", "12.mp3"
		]

		for ( var i = 0; i < table.length; i += 2 ) {

			var button = document.createElement("div");

			var img = document.createElement("img");
			var text_div = document.createElement("div");




			text_div.className="btn_text";
			img.className="btn_image";

			button.id='btn_'+(i/2+1);
			// if(Math.random()>0.5)img.className="btn_image";
			// else img.className="btn_image flipped";

			img.src = 'images/icons/'+(i/2+1)+'.png';
			// img.src = 'images/btn.png';

			var addon_x=0;
			var addon_y=0;


			addon_x=addon_x +((i/2)%3)*33;
			addon_y=(addon_y +Math.floor((i/2)/3)*25);
			button.style.left =addon_x+"%";
			button.style.top =addon_y+"%";

			button.className = "sound_btn";
			if(addon_x>0)button.style.borderLeft="1px solid #363357";
			text_div.innerHTML  =table[i];
			button.onclick = (function(opt) {

				return function() {
					window.sendmsg(opt);
				};
			})(i);
			button.appendChild(img);
			button.appendChild(text_div);
			document.getElementById("soundboard").appendChild(button);

		}

		$(window).resize(resize_me);
		resize_me();
		function resize_me(){

			var cta_height=15; //#container height
			console.log(findPos($('.connection_status')[0]))
			console.log($('#container').height());

			var new_width=($(window).width()-$('#contentLayer').width())/4;
		// $('#contentLayer').css('margin-left','25%');
		$('#contentLayer').css('left',new_width);
		$('.popup').css('max-height',$(window).height()-140);

		var new_h=$(window).height()-$('#container').height()-50-70*$(window).height()/1000;
		if(new_h<200)new_h=200;
		$('#soundboard').height(new_h-cta_height);
		// $('#soundboard').height(new_h);

		
		$('#present').css('left',-0.01*$('#present').width());
		$('#socks').css('left',$(window).width()*0.8-$('#socks').width());
		$('#redBall').css('left',$(window).width()*0.9-$('#redBall').width()/2);
		$('#redBall').css('top',$('#container').height()*1.3);


		$('.blueBall').css('left',$(window).width()*0.1);
		$('.blueBall').css('top',$('#container').height()*0.9);

		$('#backBalls .blueBall').css('left',$(window).width()*0.30);
		$('#backBalls .blueBall').css('top',$('#container').height()/2);

		var footer_w=$(window).width()*0.90;
		if(footer_w>400)footer_w=400;

		$('#footer').css('width',footer_w);
		$('#footer').css('left',($(window).width()-footer_w)/2);


		if(window.parallax){
			$('.blueBall').css('left',$(window).width()*0.8);
			$('#redBall').css('left',$(window).width()-$('#redBall').width()/2);
			 $('#backBalls .blueBall').css('left',$(window).width()*0.30);
			$('#socks').css('left',$(window).width()*0.9-$('#socks').width());

		}



	}



	for ( var i = 0; i < table.length; i += 2 ) {


		var src = document.createElement("source");
		src.src="sounds/yeti/2/"+table[i+1];
		src.type="audio/mp3"

		var audio = document.createElement("audio");
		audio.id = "a"+i;
		audio.my_id=i;
		audio.src="sounds/yeti/2/"+table[i+1];
		audio.preload = "auto";
		audio.appendChild(src);


		document.getElementById("WhatsThatSound").appendChild(audio);



		document.getElementById("a"+i).load();



		audio.addEventListener('ended',function(){

			var btn_id="#b"+$(this)[0].my_id;
			console.log("sound_ended",$(this),btn_id);
			$(btn_id).removeClass('active');
		});


	}

	var src = document.createElement("source");
	src.src="sounds/yeti/2/bg.mp3";
	src.type="audio/mp3"
	src.autoplay="audio/mp3"
	src.loop="true"

	var audio = document.createElement("audio");
	audio.id = "bg";
	audio.my_id="bg";
	audio.src="sounds/yeti/2/bg.mp3";
	audio.preload = "auto";
	audio.loop = "true";
	audio.appendChild(src);


	document.getElementById("WhatsThatSound").appendChild(audio);


	document.getElementById("bg").load();
	document.getElementById("bg").play();


        /*iOS click event
            
        if(window.innerHeight <380){
	   var onClick = function() {
           audio.play();; // audio will load and then play
        };

        window.addEventListener('click', onClick, false);
        }
        /*end of iOS click event*/


	window.sendmsg=function(msg){
		var msg_object=new Object();
		msg_object.songId=table[msg+1];
		msg_object.storeId=myStore.id;
		
		if(isConnected)	{
			ga('send', 'pageview','user connected to store Id:'+myStore.id+ ' '+myStore.name+" played tune "+table[msg]);
			window.socket.emit('messages',JSON.stringify(msg_object));
		}
		else{
			ga('send', 'pageview','user is playing offline  tune '+table[msg]);
			document.getElementById("a"+msg).play();
		}
	}


});

function toggle_bg_sound(state){
	if(document.getElementById("bg")){
		if(state)document.getElementById("bg").play();
		else document.getElementById("bg").pause();
	}
}
