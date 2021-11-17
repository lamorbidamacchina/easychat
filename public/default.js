// setup my socket client
var socket = io();
 
const generateRandomString = (length=6)=>Math.random().toString(20).substr(2, length)

window.onload = function () {
  // assegnare nome a utente
  let userid = "";
  if (localStorage.getItem("userid")) {
    userid = localStorage.getItem("userid");
  } else {
    userid = generateRandomString(8);
    localStorage.setItem("userid",userid);
  } 

  $("form").on('submit', function(event){
    event.preventDefault();
    let msg = $("#msg").val();
    msg =  msg.replace(/(<([^>]+)>)/gi, "");
    const userid = localStorage.getItem("userid");
    console.log("sending msg: " + msg + " from " + userid);
    socket.emit('message', {"msg" : msg, "userid" : userid});
    $("#msg").val("");
  });
  
  // called when the server calls socket.broadcast('message')
  socket.on('message', function (obj) {
    prevChat = $("#chatBoard").html();
    const ts = new Date().toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit'});
    $("#chatBoard").html(prevChat + '<div class="msgRow"><span class="userid">' + obj.userid + "</span><br />" + obj.msg + '<span class="ts">' + ts +'</span></div>');
    var chatboard = document.getElementById("chatBoard");
    chatboard.scrollTop = chatboard.scrollHeight;
    console.log(prevChat + obj.userid + ": " + obj.msg);
  });

  socket.on('participants', function(count) {
    $("#participants").html(count);
  });
}

