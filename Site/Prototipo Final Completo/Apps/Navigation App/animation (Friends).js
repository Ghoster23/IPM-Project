var opened = false;
var friend = {};

function cancelFriend(){
  slider.scroll({ top: slider.scrollTop+1, left: 0, behavior: "smooth" });
}

function confirmFriend(e,name){
  friend.name           = name;
  opened                = true;
  var icon              = e.target;
  icon.style.transition = "opacity 0.5s ease-in-out";
  icon.style.opacity    = "0";

  var icondiv              = icon.closest('div');
  icondiv.style.transition = "transform 0.3s"
  icondiv.style.transform  = "scale(1.5,1.5)";
  icondiv.style.pointerEvents = "none";

  var confText = document.createElement('span');
  confText.setAttribute("id", "confText");
  confText.innerHTML = "Pedir\nlocaliza&ccedil&atildeo\na " + name + "?";
  var row = icon.closest('tr');
  row.appendChild(confText);

  var sub = row.getElementsByClassName('appSubtitle')[0];
  sub.style.opacity = "0";

  var cancel = document.getElementById('Cancel');
  cancel.style.transform = "scale(1,1)";
  var accept = document.getElementById('Accept');
  accept.style.transform = "scale(1,1)";

}


slider.addEventListener("scroll", function() {
  if(opened == true){
    opened = false;
    confText.style.transition = "opacity 0.2s ease-in-out";
    confText.style.opacity    = "0";
    var sub = confText.closest('tr').getElementsByClassName('appSubtitle')[0];
    sub.style.opacity = "1";

    var cancel = document.getElementById('Cancel');
    cancel.style.transform = "scale(0,0)";
    var accept = document.getElementById('Accept');
    accept.style.transform = "scale(0,0)";

    setTimeout(function() {
      confText.remove();
      var circles = document.getElementsByClassName('iconApp');
      var icons   = document.getElementsByClassName('iconPic');
      for(i=0; i<icons.length; i++) {
        circles[i].style.transition    = '';
        circles[i].style.pointerEvents = '';
        circles[i].style.opacity       = "1";
        icons[i].style.transition    = '';
        icons[i].style.pointerEvents = '';
        icons[i].style.opacity       = "1";
      }
    }, 400);
  }
}, false);


function showContacts(startRow) {
  var source;
  var element1 = "<th><div class='iconApp' onclick='confirmFriend(event,";
  var element2 = ")' draggable='false'><img class='iconPic' draggable='false' src=";
  var element3 = "</div></a><figcaption class='appSubtitle'> ";
  var element4 = " </figcaption></th>";

  var contacts = JSON.parse(sessionStorage.getItem("contacts"));
  contacts.sort();

  anchors = [];
  var contact_Table = document.getElementById("Table");

  for (var i = 0; i < contacts.length; i++) {
    anchors.push(i*160+10);

    var r = getRandomArbitrary(0, 100);

    if (r <= 45) {
      source = "'../Contacts App/Images/Avatars/" + contacts[i][0] + ".png'>";
    } else {
      source = "'../Contacts App/Images/Letters/" + contacts[i][0] + ".png'>";
    }

    contact_Table.insertRow(i+startRow).innerHTML = element1 + JSON.stringify(contacts[i]) + element2 + source + element3 + contacts[i] + element4;
  }

  slider.scrollTop = 10;
}

function setNavigAlert(){
  //give visual feedback that request was sent
  cancelFriend();
  setAlert(friend.name,friend.name+" aceitou\no seu pedido.\nNavegar at&eacute local?","NavigateToFriend",getRandomArbitrary(2000, 7500));
  var accept = document.getElementById('Sent');
  accept.style.transform = "scale(1,1)";
  document.getElementById("menu").style.overflow = "hidden";
  setTimeout(function() {
    document.getElementById("menu").style.overflow = "auto";
    accept.style.transform = "scale(0,0)";
  }, 1300);
}
