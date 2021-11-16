// setup my socket client
var socket = io();
 
const generateRandomString = (length=6)=>Math.random().toString(20).substr(2, length)

window.onload = function () {
  // assegnare nome a utente
  let userid = "";
  if (localStorage.getItem("userid")) {
    console.log(localStorage.getItem("userid"));
    userid = localStorage.getItem("userid");
  } else {
    console.log(2222);
    //userid = Math.random().toString(36).slice(2);
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
    $("#chatBoard").html(prevChat + '<div class="msgRow">' + obj.userid + ": " + obj.msg + '</div>');
    console.log(prevChat + obj.userid + ": " + obj.msg);
  });

  socket.on('participants', function(count) {
    $("#participants").html(count);
  });
}

