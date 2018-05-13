function fixMessage(message) {
  var count = 0;
  var words = message.split(" ");
  var newMessage = "";

  for (var w of words) {
    count += w.length;

    if (count >= 10) {
      count = w.length;
      newMessage += "<br>";
    }

    newMessage += " " + w;
  }

  return newMessage;
}

function showMessages() {
  var chatTable = document.getElementById("Table");
  var friend    = sessionStorage.getItem("friend");
  var messages  = JSON.parse(sessionStorage.getItem("chat" + friend));
  var element1  = "<span class=";
  var element2  = " draggable='false'>";
  var element3  = "</span>";
  var spanClass;

  document.title += " " + friend;
  document.getElementById("FriendName").innerHTML = friend;

  for (var i = 0; i < messages.length; i++) {
    var m = fixMessage(messages[i][1]);

    if (messages[i][0] == 0) { // received
        spanClass = "'receivedMessage'";
    } else { //send
        spanClass = "'sendMessage'";
    }

    chatTable.insertRow(i).innerHTML = element1 + spanClass + element2 + m + element3;
  }

  slider.scrollTop = messages.length * 150;
}

function anchor2closest() { }
