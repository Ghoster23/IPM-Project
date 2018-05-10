function chooseWriteMode() {
  var writeMode = sessionStorage.getItem("writeMode");
  var input = document.getElementById("Input");
  if (writeMode == 0) { // White Mode
    document.title += " Escrever";
    input.placeholder = "Escreva";
  } else {  // Dictate Mode
    document.title += " Ditar";
    input.placeholder = "Dite";

    var dictIcon = document.getElementById("Dictate");
    dictIcon.style.visibility = "visible";
    dictIcon.style.opacity = "1";
  }
}

function checkSMS(sms) {
  if (sms == "") {
    var input = document.getElementById("Input");
    input.style.animation = "highlight 1.5s ease-in-out";
    setTimeout(function() { input.style.animation =""; }, 1500);
  } else {
    sendSMS(sms);
    document.location.href = "../Chat/Chat.html";
  }
}
