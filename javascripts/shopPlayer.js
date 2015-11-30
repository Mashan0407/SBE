window.addEventListener("load", function () {


  var update_delay=2000;

  $('#more_user').hide();


  var socket = io.connect("192.168.0.133:3030" );

  socket.on('connect', function(data) {
    socket.emit('join', 'window_screen');
  });

  socket.on('messages', function(data) {
     // alert(data);
   });
  socket.on('add_fake', function(data) {
     // alert(data);
     add_fake_user();
   });

  window.sendmsg=function(msg){

    socket.emit('messages', msg);
  }







  var videos = ["comic-strip.mp4","video/portrait2.mp4","video/v_2.mp4"];
  var posters = ["","video/poster_1.png","video/poster_2.png"];


  function playArray(index,ele,array,listener){
   ele.removeEventListener(listener||0);
   ele.src = array[index];

    //ele.play();
    
    index++;
    if(index>=array.length){
      index=0;
    }
    load_listener=ele.addEventListener('loadstart',function(){
      //playArray(index,ele,array,listener);
      console.log('loaded');
      setTimeout(function(){ 
        document.getElementById('webgl_canvas').innerHTML="loaded";
        console.log('time out');
        ele.play(); 
      }, 1000);
    },false);
    listener = ele.addEventListener('ended',function(){
      playArray(index,ele,array,listener);
    },false);

    ele.load();
  }


  function playVideo(index,ele,array,array_poster){

    var vid = document.createElement("video");   

    vid.src=array[index];
    vid.width="1080" ;
    vid.height="1920" ;
    vid.class="ugc_video";
    vid.zIndex="10";
    vid.load();

    load_listener=vid.addEventListener('loadeddata',function(){

      console.log('loaded');

      console.log('document.getElementById("video_container").length',document.getElementById("video_container").childElementCount);
      if( document.getElementById("video_container").childElementCount>0){
        console.log('need to kill one');
        var prev_vid=  document.getElementById("currentVideo");

        prev_vid.pause();
        prev_vid.src="";
        document.getElementById("video_container").removeChild(prev_vid);

      }
      document.getElementById("video_container").appendChild(vid);
      vid.id="currentVideo";


      console.log('time out');
      vid.play(); 

    },false);




  }

//   setTimeout(function(){ 
//   //    playArray(0,document.getElementById("vVideo"),videos);
// }, 1000);

// when video finished   give_me_next();

// every five seconds check_user_que();



var current_state='advertising';
var user_video_que=[];
var advertising_que=["video/comic-strip.mp4","video/happy-holiday.mp4","video/jingle-bells.mp4"];

var next_ad_index=0;


var data_from_server=[];

check_user_que();
give_me_next();

function give_me_next(){
  if( current_state=='advertising') { 
    if(user_video_que.length>0 ){
      play_next_user_video();
    }else{
      play_next_advertising();
    }

  }else{   
    if(user_video_que.length>0 ){
      play_next_user_video();
    }else{
      play_next_advertising();
    }

  }

}


var check_counter=0;
function check_user_que(){
  console.log("checking server");

  check_counter++;

  if(check_counter>25){
    check_counter=0;
    if(Math.random()>0.5)add_fake_user();
  }
  // get data from server here

  if (data_from_server.length>0 ){
    for (var i = 0; i < data_from_server.length; i++) {
      console.log(i,data_from_server[i]);
      user_video_que.push(  data_from_server[i]);
    };
    data_from_server=[];
    update_footer();
    console.log("some new data",user_video_que);
  }
  setTimeout(check_user_que, update_delay);
}

function update_footer(){




  for (var i = 0; i < user_video_que.length; i++) {

   var video_obj=JSON.parse(user_video_que[i]); 

   var is_here=false;





   $('#footer').children('div').each(function () {

    if(this.uniq_id==video_obj.uniq_id)is_here=true;
  });

   if(!is_here&& document.getElementById("footer").childElementCount<5)create_thumb(video_obj);




   if( document.getElementById("footer").childElementCount>0){ 
    var next_div=$('#footer img').first()[0];
    next_div.style.visibility='visible';
    animate_next();
  }
  if( document.getElementById("footer").childElementCount>=5){ 


    $('#more_user').show();
    $('#more_user').text("+"+ int(user_video_que.length-5)+ "more");
  }else{

    $('#more_user').hide();
  }




};



function create_thumb(video_obj){
  var thumb_div = document.createElement("div");

  var thumb = document.createElement("img");
  var next = document.createElement("img");
  next.src='img/next.png' ;
  next.className ="next";



  console.log("new thumb src",video_obj.preview )
  thumb.src=video_obj.preview;
  thumb_div.uniq_id=video_obj.uniq_id;
  thumb_div.className ="thumb_div";
  thumb.className ="thumb";
  thumb_div.appendChild( next);
  thumb_div.appendChild(thumb);

  document.getElementById("footer").appendChild(thumb_div);

  $(thumb).css('top',"100px");
  $(thumb).animate({
    top: "0px",scale: "2"
  }, 100, function() { }).delay( 800 );

  $(thumb).animate({
    scale: "1"
  }, 100, function() { }).delay( 1500 );

}





}

var next_dir=1;
// animate_next();
function animate_next(){

  next_dir=-next_dir;
  console.log("animate_next");
  //var next_div = document.getElementById('next');

  // var first_thumb= document.getElementById("footer").firstChild.firstChild;
  var next_div=$('#footer img').first()[0];

  TweenMax.to(next_div, 0.4, {rotationZ:5*next_dir,ease:Sine.easeInOut,onComplete:function(){
    if($(next_div).is(':visible'))animate_next();
  }});

}


function play_next_user_video(){

    //play transform animation
    //show overlay 

    current_state='ugc';

    console.log('--------------');
    console.log('playing ugc');



    var vid = document.createElement("video");   
    var video_obj=JSON.parse(user_video_que[0]);

    vid.src=video_obj.src;
    vid.width="1080" ;
    vid.height="1920" ;
    vid.class="ugc_video";
    vid.zIndex="10";
    vid.load();


    var uid=video_obj.uniq_id
    clean_footer(uid);

    user_video_que.shift();
    update_footer();

    


    var load_listener=vid.addEventListener('loadeddata',function(){

      console.log('video loaded');

      if( document.getElementById("video_container").childElementCount>0){      
        console.log('removing prev video');
        var prev_vid=  document.getElementById("currentVideo");
        prev_vid.pause();
        prev_vid.src="";
        document.getElementById("video_container").removeChild(prev_vid);     

      }

      document.getElementById("video_container").appendChild(vid);
      vid.id="currentVideo";
      vid.play(); 
      $('#webgl_canvas').show();



    },false);

    var end_listener=vid.addEventListener('ended',function(){


      console.log('video ended');
      give_me_next();

      vid.removeEventListener(load_listener||0);
      vid.removeEventListener(end_listener||0);





    },false);




  }


  function clean_footer(id_to_kill){

    if( document.getElementById("footer").childElementCount>0){ 
     var next_div=$('#footer img').first()[0];
     next_div.style.visibility='hidden';
   }

   $('#footer').children('div').each(function () {

     if(this.uniq_id==id_to_kill)$(this).remove();
   });


 };

 function play_next_advertising(){

  current_state='advertising';
  console.log('--------------');
  console.log('playing ad', next_ad_index);

  var vid = document.createElement("video");   

  vid.src=advertising_que[next_ad_index];
  vid.width="1080" ;
  vid.height="1920" ;
  vid.class="ugc_video";
  vid.zIndex="10";
  vid.load();

  var load_listener=vid.addEventListener('loadeddata',function(){

    console.log('video loaded');

    if( document.getElementById("video_container").childElementCount>0){      
      console.log('removing prev video');
      var prev_vid=  document.getElementById("currentVideo");
      prev_vid.pause();
      prev_vid.src="";
      document.getElementById("video_container").removeChild(prev_vid);     

    }

    document.getElementById("video_container").appendChild(vid);
    vid.id="currentVideo";
    vid.play(); 
    $('#webgl_canvas').hide();



  },false);

  var end_listener=vid.addEventListener('ended',function(){
    console.log('video ended');

    next_ad_index++;
    if(next_ad_index>=advertising_que.length)next_ad_index=0;
    give_me_next();

    vid.removeEventListener(load_listener||0);
    vid.removeEventListener(end_listener||0);


  },false);




}

function add_fake_user (){

  var obj=new Object();

  if(Math.random()>0.5){
    obj.src="video/v_2.mp4";
    obj.preview="video/poster_2.png";
  }else{
    obj.src="video/v_1.mp4";
    obj.preview="video/poster_1.png";
  }

  obj.uniq_id=Math.random()*1000000;

  data_from_server.push(  JSON.stringify(obj));
  console.log(obj);


}






// var current_que=[];
// get_que();
// console.log('inited');


// function get_que(){

//   console.log('get que');

//   var que_data = '{ "[' +
//   '{ "src":"video/v_2.mp4" , "preview":"video/poster_2.png" },' +
//   '{ "src":"video/v_1.mp4" , "preview":"video/poster_1.png" },' +
//   '{ "src":"video/v_2.mp4", "preview":"video/poster_2.png" } ]}';

//   var obj = JSON.parse(que_data);
//   console.log(obj.videos[0].src) ;

//   $.each(obj.videos, function(index, value) {
//     console.log(value);
//   }); 



// }




window.onkeydown = function (e) {
  var code = e.keyCode ? e.keyCode : e.which;
 // console.log(code);
    if (code === 49) { //up key
     $('#webgl_canvas').hide();
     playVideo(0,document.getElementById("vVideo"),videos,posters);
    } else if (code === 50) { //down key
        //alert('down');
        $('#webgl_canvas').hide();
        playVideo(1,document.getElementById("vVideo"),videos,posters);
      }
      else if (code === 51) { //down key
        //alert('down');
        $('#webgl_canvas').show();
        playVideo(2,document.getElementById("vVideo"),videos,posters  );

      }
      else if (code === 65) { //down key
        //alert('down');


        add_fake_user();

       // playVideo(2,document.getElementById("vVideo"),videos,posters  );

     }
   };

 }, false);


