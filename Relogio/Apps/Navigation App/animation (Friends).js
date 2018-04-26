
function saveFriendName(name) {
  sessionStorage.setItem("friend", name);
}

function showContacts(startRow) {
  var element1 = "<th><a href='Navigation App Map.html' onclick='saveFriendName(";
  var element2 = ")'><div class='iconApp' draggable='false'><img class='iconApp' draggable='false' src='../Messaging App/Images/Letters/";
  var element3 = ".png'></div></a><figcaption class='appSubtitle'> ";
  var element4 = " </figcaption></th>";

  var contacts = JSON.parse(sessionStorage.getItem("contacts"));
  contacts.sort();

  slider.scrollTop = 10;
  anchors = [];
  var contact_Table = document.getElementById("Table");

  for (var i = 0; i < contacts.length; i++) {
    anchors.push(i*170 + 10);

    contact_Table.insertRow(i+startRow).innerHTML = element1 + JSON.stringify(contacts[i]) + element2 + contacts[i][0] + element3 + contacts[i] + element4;
  }
  console.log(anchors);
}