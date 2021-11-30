// setup my socket client
var socket = io();


// read room in querystring
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const room = urlParams.get('room');

const generateRandomString = (length=6) => Math.random().toString(20).substr(2, length);

const generateRandomDarkColor = () => {
  var color = '#';
  for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
  }
  return color;
}


window.onload = function () {
  socket.emit('room', room);
  let userid = "";
  if (localStorage.getItem("userid")) {
    userid = localStorage.getItem("userid");
  } else {
    userid = generateRandomString(8);
    localStorage.setItem("userid",userid);
    localStorage.setItem("userColor",generateRandomDarkColor());
  } 

  $("form").on('submit', function(event){
    event.preventDefault();
    let msg = $("#msg").val();
    msg =  msg.replace(/(<([^>]+)>)/gi, "");
    const userid = localStorage.getItem("userid");
    const userColor = localStorage.getItem("userColor");
    console.log("sending msg: " + msg + " from " + userid);
    socket.emit('message', {"msg" : msg, "userid" : userid, "room": room, "userColor": userColor});
    $("#msg").val("");
  });
  
  // called when the server calls socket.broadcast('message')
  socket.on('message', function (obj) {
    let prevChat = $("#chatBoard").html();
    const ts = new Date().toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit'});
    $("#chatBoard").html(prevChat + '<div class="msgRow"><span class="userid" style="color:'+obj.userColor+'">' + obj.userid + "</span><br />" + obj.msg + '<span class="ts">' + ts +'</span></div>');
    var chatboard = document.getElementById("chatBoard");
    chatboard.scrollTop = chatboard.scrollHeight;
    console.log(prevChat + obj.userid + ": " + obj.msg);
  });

  socket.on('participants', function(count) {
    $("#participants").html(count);
  });
}

