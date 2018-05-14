var maxPerLine = 9;
var nLines;
var count;

function fixMessage(message) {
  var words = message.split(" ");
  var newMessage = "";

  nLines = 1;
  count  = 0;

  for (var w of words) {
    count += w.length;

    if (count > maxPerLine) {
      nLines++;
      if (w.length > maxPerLine) {
        newMessage += (" " + w.slice(0, maxPerLine) + "<br> " + w.slice(maxPerLine));
        count = w.length - maxPerLine;
      } else {
        newMessage += "<br> " + w;
        count = w.length;
      }
    } else {
      newMessage += " " + w;
    }
  }

  return newMessage;
}

function showMessages() {
  var chatTable = document.getElementById("Table");
  var friend    = sessionStorage.getItem("friend");
  var messages  = JSON.parse(sessionStorage.getItem("chat" + friend));

  var image1 = "<img class='";
  var image2 = "' draggable='false' style='height:"; // height: (20*nLines + 10)px;
  var image3 = "px; width:"; // width: (19 + w)px
  var image4 = "px; left:";  // left: 5px / (150-w)px --> received / send
  var image5 = "px' src='../Images/";
  var image6 = "'>";
  var span1  = "<span class='";
  var span2  = "' draggable='false' style='margin-top:-";  // margin-top: -(20*nLines + 10)px;
  var span3  = "px; left:";
  var span4  = "px'>";
  var span5  = "</span>";

  var m;
  var w;
  var image;
  var span;

  document.title += " " + friend;
  document.getElementById("FriendName").innerHTML = friend;

  if (messages != null) {
    for (var i = 0; i < messages.length; i++) {
      m = fixMessage(messages[i][1]);

      w = (nLines == 1 ? 19+11.25*count : 120);

      if (messages[i][0] == 0) { // received
        image = image1 + "receivedTemplate" + image2 + (20*nLines + 10) + image3 + w + image4 + 5 + image5 + "received background.png" + image6;
        span  = span1 + "receivedMessage" + span2 + (20*nLines + 10) + span3 + 5 + span4 + m + span5;
      } else { // send
        image = image1 + "sendTemplate" + image2 + (20*nLines + 10) + image3 + w + image4 + (150-w) + image5 + "send background.png" + image6;
        span  = span1 + "sendMessage" + span2 + (20*nLines + 10) + span3 + (150-w) + span4 + m + span5;
      }

      chatTable.insertRow(i).innerHTML = image + span;
    }

    slider.scrollTop = messages.length * 120;
  }
}

function anchor2closest() { }
