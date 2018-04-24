slider.scrollTop = 165;

function showContacts(startRow) {
  var contacts = JSON.parse(sessionStorage.getItem("contacts"));
  contacts.sort();

  anchors = [0];
  var lastAnchor = 0;
  for (var i = 0; i < contacts.length; i++) {
    lastAnchor += 170;
    anchors.push(lastAnchor);
  }

  var contact_Table = document.getElementById("Table");
  for (var i = 0; i < contacts.length; i++) {
    contact_Table.insertRow(i+startRow).innerHTML = "<th><img class='iconApp' draggable='false' src='Images/contact.png'><figcaption class='appSubtitle'>" + contacts[i] + "</figcaption></th>";
  }
}
