var justALine;

function fixMessage(message) {
  var count = 0;
  var words = message.split(" ");
  var newMessage = "";

  justALine = true;

  for (var w of words) {
    count += w.length;

    if (count >= 15) {
      count = 0;
      newMessage += "<br>";
      justALine  = false;
    }

    newMessage += " " + w;
  }

  return newMessage;
}

function showMessages() {
  var chatTable = document.getElementById("Table");
  var friend    = sessionStorage.getItem("friend");
  var messages  = JSON.parse(sessionStorage.getItem("chat" + friend));
  var element1  = "<img class=";
  var element2  = " draggable='false' src='../Images/";
  var element3  = "<span class=";
  var element4  = " draggable='false'>";
  var element5  = "</span>";
  var imgClass;
  var spanClass;
  var image;

  document.getElementById("FriendName").innerHTML = friend;

  for (var i = 0; i < messages.length; i++) {
    var m = fixMessage(messages[i][1]);

    if (messages[i][0] == 0) {
      imgClass = "receivedTemplate";
      image    = "message template.png'>"; //recebida
      if (justALine) {
        spanClass = "'just1LineReceived'";
      } else {
        spanClass = "'receivedMessage'";
      }

    } else { //enviada
      imgClass = "sendTemplate";
      image    = "message template.png'>";
      if (justALine) {
        spanClass = "'just1LineSend'";
      } else {
        spanClass = "'sendMessage'";
      }
    }

    chatTable.insertRow(i).innerHTML = element1 + imgClass + element2 + image + element3 + spanClass + element4 + m + element5;
  }
}

function anchor2closest() { }
