var writeMode;

function chooseWriteMode() {
  writeMode = sessionStorage.getItem("writeMode");
  var input = document.getElementById("Input");

  if (writeMode == 0) { // White Mode
    document.title += " Escrever";
    input.placeholder = "Escreva";
  } else {  // Dictate Mode
    document.title += " Ditar";
    input.placeholder = "Dite";

    var dict = document.getElementById("Dictate");
    dict.style.visibility = "visible";
    dict.style.opacity = "1";

    dict = document.getElementById("DictateSimul");
    dict.style.visibility = "visible";
    dict.style.opacity = "1";
  }
}

function checkSMS() {
  var input = document.getElementById("Input");
  var sms;

  if (writeMode == 0) {
    sms = input.value;
  } else {
    var simul = document.getElementById("DictateSimul");
    sms = simul.value;
  }

  if (sms == "") {
    input.style.animation = "highlight 1.5s ease-in-out";
    input.value = "";

    if (writeMode == 1) { simul.style.animation = "highlight 1.5s ease-in-out"; }

    setTimeout(function() {
      input.style.animation = "";
      simul.style.animation = "";
    }, 1500);
  } else {
    sendSMS(sms);
    document.location.href = "../Chat/Chat.html";
  }
}
