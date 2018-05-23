var writeMode;
var dictating = false;

function showInputMethod(){
  var newName = document.getElementById("Input");
  var cancel  = document.getElementById("Cancel");
  var done    = document.getElementById("Done");

  newName.style.animation = "appear 0.5s ease-in";
  cancel.style.animation  = "appear 0.5s ease-in";
  done.style.animation    = "appear 0.5s ease-in";

  if (writeMode == 1) {
    var button = document.getElementById("Dictate_Button");
    button.style.animation    = "appear 0.5s ease-in";
  } else {
    createKeyboard("Input");
  }

  setTimeout(function (){
    newName.style.animation    = "";
    cancel.style.animation     = "";
    done.style.animation       = "";

    newName.style.visibility = "visible";
    cancel.style.visibility  = "visible";
    done.style.visibility    = "visible";

    newName.style.opacity = "1";
    cancel.style.opacity  = "1";
    done.style.opacity    = "1";

    if (writeMode == 1) {
      button.style.animation  = "";
      button.style.visibility = "visible";
      button.style.opacity    = "1";

    }
  },
  500);
}

function chooseWriteMode() {
  writeMode = sessionStorage.getItem("writeMode");
  var input = document.getElementById("Input");

  if (writeMode == 0) { // Write Mode
    document.title += " Escrever";
    input.placeholder = "Escreva";

  } else {  // Dictate Mode
    document.title += " Ditar";
    input.placeholder = "Dite";
  }

  showInputMethod();
}

function startDictation(){
  var dictSimul = document.getElementById("DictateSimul");
  var dictationButton = document.getElementById("Dictate_Button");
  dictSimul.style.animation = "appear 0.5s ease-in";
  dictationButton.style.animation = "pulse 1s ease-in infinite";

  var input = document.getElementById("Input");
  input.value = "";

  setTimeout(function(){
    dictSimul.style.animation  = "";
    dictSimul.style.visibility = "visible";
    dictSimul.style.opacity    = "1";
  }
  ,500);
}

function endDictation(){
  var dictSimul = document.getElementById("DictateSimul");
  var dictationButton = document.getElementById("Dictate_Button");
  dictSimul.style.animation = "fadeAway 0.5s ease-in";
  dictationButton.style.animation = "";
  dictating = false;

  setTimeout(function(){
    dictSimul.style.animation  = "";
    dictSimul.style.visibility = "hidden";
    dictSimul.style.opacity    = "0";
  }
  ,500);
}

function dictationButton(){
  if(dictating){
    endDictation();
    dictating = false;
  }else {
    startDictation();
    dictating = true;
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
