slider.scrollTop = 165;

function showContacts(startRow) {
  var element1 = "<th><div class='iconApp' draggable='false'><img class='iconApp' draggable='false' src='../Messaging App/Images/Letters/";
  var element2 = ".png'></div><figcaption class='appSubtitle'> ";
  var element3 = " </figcaption></th>";

  var contacts = JSON.parse(sessionStorage.getItem("contacts"));
  contacts.sort();

  anchors = [];
  var contact_Table = document.getElementById("Table");

  for (var i = 0; i < contacts.length; i++) {
    anchors.push(i*165);

    contact_Table.insertRow(i+startRow).innerHTML = element1 + contacts[i][0] + element2 + contacts[i] + element3;
  }
}
