var opened = false;

slider.addEventListener("scroll", function() {
  if(opened == true){
    opened = false;
    confText.style.transition = "opacity 0.2s ease-in-out";
    confText.style.opacity    = "0";
    var sub = confText.closest('tr').getElementsByClassName('appSubtitle')[0];
    sub.style.opacity = "1";


    setTimeout(function() {
      confText.remove();
      var icons = document.getElementsByClassName('iconPic');
      for(i=0; i<icons.length; i++) {
          icons[i].style.transition    = '';
          icons[i].style.pointerEvents = '';
          icons[i].style.opacity       = "1";
      }
    }, 400);
  }
}, false);

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function saveName(friendName) {
  sessionStorage.setItem("friend", friendName);
}

function showContacts(startRow) {
  var source;
  var element1 = "<th><a href='Chat/Chat.html'><div class='iconApp' draggable='false' onclick='saveName(";
  var element2 = ")'><img class='iconPic' draggable='false' src=";
  var element3 = "</div></a><figcaption class='appSubtitle'> ";
  var element4 = " </figcaption></th>";

  var contacts = JSON.parse(sessionStorage.getItem("contacts"));
  contacts.sort();

  anchors = [10];
  var contact_Table = document.getElementById("Table");

  for (var i = 0; i < contacts.length; i++) {
    anchors.push(i*161+190);

    if (getRandomArbitrary(0, 10) <= 5) {

      switch (contacts[i]) {
        case "Alexandre":
        case "Benjamin":
        case "Catarina":
        case "Rui":
        case "Tobias":
          source = "'Images/Avatars/" + contacts[i][0] + ".png'>";
          break;

        default:
          source = "'Images/contact.png'>";
      }
    } else {
      source = "'Images/Letters/" + contacts[i][0] + ".png'>";
    }

    contact_Table.insertRow(i+startRow).innerHTML = element1 + JSON.stringify(contacts[i]) + element2 + source + element3 + contacts[i] + element4;
  }

  slider.scrollTop = 190;
}
