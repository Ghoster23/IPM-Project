 var weekDay = ["Dom", "Seg", "Ter", "Qua",  "Qui", "Sex", "Sab"];
 var month   = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];


//Function that controls the watch"s hands and info
function clock() {
    var date  = new Date;
    var hours = (30 * ((date.getHours() % 12) + date.getMinutes() / 60) - 90);
    var min   = ( 6 * date.getMinutes() - 90);
    var sec   = ( 6 * date.getSeconds() - 90);

    rotateHand("Hour_Hand", hours);
    rotateHand( "Min_Hand",   min);
    rotateHand( "Sec_Hand",   sec);

    if (document.getElementById("Week_Day").innerHTML == "wd" ||
        (hours == 270 && min == 270 && sec == 270)){
      dateUpdate(date);
    }

    setTimeout(clock, 1000);
}


//Function that updates the clock hands' position
function rotateHand(id, angle) {
  document.getElementById(id).style.transform = "rotate(" + angle + "deg)";
}


//Function that updates the date
function dateUpdate(date) {
  changeText("Week_Day", weekDay[date.getDay()] + ",");
  changeText(     "Day", date.getDate() + " ");
  changeText(   "Month", month[date.getMonth()]);
}


//Function that changes an element in the document
function changeText(id, txt) {
  document.getElementById(id).innerHTML = txt;
}


function saveContacts() {
  var contacts = sessionStorage.getItem("contacts");
  if (contacts == null) {
    sessionStorage.setItem("contacts", JSON.stringify(["Alexandre", "Bia", "MoostAsh", "Maria", "Frown"]));
  }
}


function sendToWatch() {
  var from = document.getElementById("From");
  var message = document.getElementById("Message");

  var noName  = (from.value == "");
  var invName = (!(JSON.parse(sessionStorage.getItem("contacts")).includes(from.value)));

  var inputCorrect = true;

  if (noName || invName) {
    from.style.animation = "highlight 2s ease-in-out";
    inputCorrect = false;
    if (noName) {
      from.placeholder = "Campo Obrigatorio";
    } else {
      from.value = "";
      from.placeholder = "Tem que pertencer a lista de contactos";
    }

    setTimeout(function() {
        from.style.animation = "";
      }, 2000);
  }
  if (message.value == "") {
    inputCorrect = false;
    message.style.animation = "highlight 2s ease-in-out";
    message.placeholder = "Campo Obrigatorio";

    setTimeout(function() {
        message.style.animation = "";
      }, 2000);
  }

  if (inputCorrect) {
    var chatWithFriend = JSON.parse(sessionStorage.getItem("chat" + from.value));

    if (chatWithFriend == null) {
      chatWithFriend = [[0, message.value]];
    } else {
      chatWithFriend.push([0, message.value]);
    }
    sessionStorage.setItem("chat" + from.value, JSON.stringify(chatWithFriend));

    from.placeholder    = "De";
    message.placeholder = "Escreva aqui uma mensagem para enviar ao relogio!";

    from.value    = "";
    message.value = "";

    from.style.animation    = "GoodHighlight 1s ease-in-out";
    message.style.animation = "GoodHighlight 1s ease-in-out";

    setTimeout(function() {
      from.style.animation    = "";
      message.style.animation = "";
    }, 1000);
  }
}
