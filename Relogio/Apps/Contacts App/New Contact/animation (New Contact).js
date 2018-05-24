var writeMode;
var dictating = false;

slider.scrollTop = 190;

var anchors = [10, 190, 360]; //pls set this if you are copy pasting to make a new menu

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function updateProgress() {
    if (slider.scrollTop <= 95) {
        document.getElementById("Progress_Circles").src = "../Images/progress1.png";
    }
    if (slider.scrollTop > 95 && slider.scrollTop <= 265) {
        document.getElementById("Progress_Circles").src = "../Images/progress2.png";
    }
    if (slider.scrollTop > 265) {
        document.getElementById("Progress_Circles").src = "../Images/progress3.png";
    }
}


function hideInputOptions() {
  document.getElementById("Table").style.visibility = "hidden";
  document.getElementById("Back").style.visibility  = "hidden";
  document.getElementById("Progress_Circles").style.visibility = "hidden";
}


function showInputOptions() {
  slider.scrollTop = 180;

  document.getElementById("Table").style.visibility = "visible";
  document.getElementById("Back").style.visibility  = "visible";
  document.getElementById("Progress_Circles").style.visibility = "visible";
}


function hideInputMethod() {
  if ((writeMode == 0) || (writeMode == 1)) {
    document.getElementById("Input").style.visibility  = "hidden";
    document.getElementById("Cancel").style.visibility = "hidden";
    document.getElementById("Done").style.visibility   = "hidden";

    if (writeMode == 0) {
      document.getElementById("Dictate_Button").style.visibility = "hidden";
    } else {
      removeKeyboard();
    }
  } else {
    document.getElementById("NFC_Prompt").style.visibility = "hidden";
    document.getElementById("NFC_Cancel").style.visibility = "hidden";
    document.getElementById("SendNFC").style.visibility = "hidden";
    document.getElementById("NFCSimul").style.visibility = "hidden";
    var nfc = document.getElementById("NFC_Active");
    nfc.style.visibility = "hidden";
    nfc.style.animation = "";
  }
}


function showInputMethod() {
  if ((writeMode == 0) || (writeMode == 1)) {
    var input = document.getElementById("Input");
    input.value = "";
    input.style.visibility = "visible";
    document.getElementById("Cancel").style.visibility = "visible";
    document.getElementById("Done").style.visibility   = "visible";

    if (writeMode == 0) {
      document.getElementById("Dictate_Button").style.visibility = "visible";
    } else {
      createKeyboard("Input");
    }
  } else {
    document.getElementById("NFC_Prompt").style.visibility = "visible";
    document.getElementById("NFC_Cancel").style.visibility = "visible";
    document.getElementById("SendNFC").style.visibility = "visible";
    document.getElementById("NFCSimul").style.visibility = "visible";
    var nfc = document.getElementById("NFC_Active");
    nfc.style.visibility = "visible";
    nfc.style.animation = "pulse 1.0s ease-in infinite";
  }
}


function fadeAwayInputMethod() {
  var input  = document.getElementById("Input");
  var done   = document.getElementById("Done");
  var cancel = document.getElementById("Cancel");
  var dictButton = document.getElementById("Dictate_Button");

  input.style.animation  = "fadeAway 0.5s ease-in";
  done.style.animation   = "fadeAway 0.5s ease-in";
  cancel.style.animation = "fadeAway 0.5s ease-in";
  dictButton.style.animation = "fadeAway 0.5s ease-in";

  setTimeout(function () {
    input.style.animation  = "";
    done.style.animation   = "";
    cancel.style.animation = "";
    dictButton.style.animation = "";

    input.style.animation  = "0";
    done.style.animation   = "0";
    cancel.style.animation = "0";
    dictButton.style.animation = "0";

    input.style.visibility  = "hidden";
    done.style.visibility   = "hidden";
    cancel.style.visibility = "hidden";
    dictButton.style.visibility = "hidden";
  },
  500);
}


function appearConfElem() {
  var conf   = document.getElementById("Confirm");
  var done   = document.getElementById("Confirm_Done");
  var cancel = document.getElementById("Confirm_Cancel");

  conf.style.animation   = "appear 1s";
  done.style.animation   = "appear 1s";
  cancel.style.animation = "appear 1s";

  setTimeout(function () {
    conf.style.animation   = "";
    done.style.animation   = "";
    cancel.style.animation = "";

    conf.style.opacity   = "1";
    done.style.opacity   = "1";
    cancel.style.opacity = "1";

    conf.style.visibility   = "visible";
    done.style.visibility   = "visible";
    cancel.style.visibility = "visible";
  }, 1000);
}


function hideConfElem() {
  document.getElementById("Confirm").style.visibility = "hidden";
  document.getElementById("Confirm_Done").style.visibility   = "hidden";
  document.getElementById("Confirm_Cancel").style.visibility = "hidden";
}

function sendNFC(){
  document.getElementById("Input").value = document.getElementById("NFCSimul").value;
  saveNewFriend();
}

function optionChoosen(choosen) {
  writeMode = choosen;

  hideInputOptions();
  showInputMethod();
}

function cancelChoice() {
  hideInputMethod();
  showInputOptions();
}


function cancelConf() {
  hideConfElem();
  showInputOptions();
}


function startDictation() {
  document.getElementById("Input").value = "";

  document.getElementById("DictateSimul").style.visibility  = "visible";
  document.getElementById("Dictate_Button").style.animation = "pulse 1s ease-in infinite";
}


function endDictation() {
  var dictSimul = document.getElementById("DictateSimul");

  document.getElementById("Input").value = dictSimul.value;
  dictSimul.value = "";

  dictSimul.style.visibility = "hidden";

  document.getElementById("Dictate_Button").style.animation = "";
}


function dictationButton() {
  if(dictating) {
    endDictation();
    dictating = false;
  } else {
    startDictation();
    dictating = true;
  }
}


function saveNewFriend() {
  var input = document.getElementById("Input");
  var name  = input.value;
  var error = 0;

  if (name == "") {
    error = 1;
  } else if (!(((name[0] >= "a") && (name[0] <= "z")) || ((name[0] >= "A") && (name[0] <= "Z")))) {
      error = 2;
  } else if ((JSON.parse(sessionStorage.getItem("contacts")).indexOf(name)) != -1) {
    error = 3;
  }

  if (error != 0) {
    input.style.fontSize  = "15px";
    input.style.animation = "highlight 2s ease-in-out";

    setTimeout(function() { input.style.animation =""; }, 2000);

    switch (error) {
      case 1:
        input.placeholder = "Campo Obrigatorio";
        break;

      case 2:
        input.value = "";
        input.placeholder = "Comecar com letra";
        break;

      case 3:
        input.value = "";
        input.style.fontSize = "17px";
        input.placeholder = "Novo Contacto";
        break;
    }
  } else {
    hideInputMethod();

    if(writeMode != 2){
      document.getElementById("Confirm_Text").innerHTML = "Enviar pedido a:";
      document.getElementById("Confirm_Contact").innerHTML = name;
    }else {
      document.getElementById("Confirm_Text").innerHTML = "Adicionar:";
      document.getElementById("Confirm_Contact").innerHTML = name;
    }

    appearConfElem();
  }
}

function sendInvite() {
  var contacts = JSON.parse(sessionStorage.getItem("contacts"));
  contacts.push(document.getElementById("Confirm_Contact").innerHTML);
  sessionStorage.setItem("contacts", JSON.stringify(contacts));

  document.location.href = "../Contacts App.html";
}
