slider.addEventListener("scroll", function() {

  var dist2nearest = 100 - Math.abs(slider.scrollTop - closest(slider.scrollTop));
  var scale = ((dist2nearest*0.01));
  if(scale!=1){
    scale=0;
  }
  var cancel = document.getElementById('Cancel');
  cancel.style.transform = "scale("+scale+")";
  var accept = document.getElementById('Accept');
  accept.style.transform = "scale("+scale+")";

}, false);

function showNotifications(startRow) {
  var source;
  var element1 = "<th> <div class='iconApp' style='background:";
  var element2 = ";' draggable='false'> <span id ='notText'>";
  var element3 = "</span>";

  var notifications = JSON.parse(sessionStorage.getItem("notifications"));

  anchors = [];
  var contact_Table = document.getElementById("Table");

  for (var i = 0; i < notifications.length; i++) {
    var notif = notifications[i];
    anchors.push(i*138+10);
    switch(notif.function){
      case "NavigateToFriend":
        var backcolor = "#8d23c2";
      break;
      case "go2conversation":
        var backcolor = "#2bade0";
      break;
    }
    contact_Table.insertRow(i+startRow).innerHTML = element1 + backcolor + element2 + notif.text + element3;
  }
  contact_Table.insertRow(i+startRow).innerHTML = "<br>";
  slider.scrollTop = 10;
}

function acceptNotification(){
  i = closestindex(slider.scrollTop);
  var notifications= JSON.parse(sessionStorage.getItem("notifications"));
  var notif = notifications[i];

  removeNotification(i);
  var contact_Table = document.getElementById("Table");
  contact_Table.deleteRow(i);

  switch(notif.function){
    case "NavigateToFriend":
      localStorage.setItem("label", "5");
      sessionStorage.setItem("friend", notif.name);
      document.location.href = "../Navigation App/Navigation App Map.html";
    break;
    case "go2conversation":
      sessionStorage.setItem("friend",notif.name);
      document.location.href = "../Contacts App/Chat/Chat.html";
    break;
    default:
      console.log("nada");
    break;
  }
}


function denyNotification(){
  i = closestindex(slider.scrollTop);
  removeNotification(i);
  var contact_Table = document.getElementById("Table");
  contact_Table.deleteRow(i);

  var notifications = JSON.parse(sessionStorage.getItem("notifications"));
  if(!notifications){
    window.history.back();
  }
}
