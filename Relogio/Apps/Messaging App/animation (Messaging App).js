var contacts = ["Alexandre", "Antonio", "Ash", "Frost", "Frown"];

slider.scrollTop = 186;

function showContacts() {
  contacts.sort();
  var conct_Table = document.getElementById('Table');

  for (var i = 0; i < contacts.length; i++) {
    conct_Table.insertRow(i+1).innerHTML = "<th><img class='iconApp' draggable='false' src='Images/Contact Icon.png'><figcaption class='appSubtitle'>" + contacts[i] + "</figcaption></th>";
  }
}
