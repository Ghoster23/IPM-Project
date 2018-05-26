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
  var table = document.getElementById("Table");
  var back  = document.getElementById("Back");
  var prog  = document.getElementById("Progress_Circles");

  table.style.opacity = "0";
  back.style.opacity  = "0";
  prog.style.opacity  = "0";

  table.style.visibility = "hidden";
  back.style.visibility  = "hidden";
  prog.style.visibility  = "hidden";
}


function showInputOptions() {
  var table = document.getElementById("Table");
  var back  = document.getElementById("Back");
  var prog  = document.getElementById("Progress_Circles");

  table.style.opacity = "1";
  back.style.opacity  = "1";
  prog.style.opacity  = "1";

  table.style.visibility = "visible";
  back.style.visibility  = "visible";
  prog.style.visibility  = "visible";

  slider.scrollTop = 180;
}


function hideInputMethod() {
  if ((writeMode == 0) || (writeMode == 1)) {
    var input  = document.getElementById("Input");
    var cancel = document.getElementById("Cancel");
    var done   = document.getElementById("Done");

    input.style.opacity  = "1";
    cancel.style.opacity = "1";
    done.style.opacity   = "1";

    input.style.visibility  = "hidden";
    cancel.style.visibility = "hidden";
    done.style.visibility   = "hidden";

    if (writeMode == 0) {
      var dictButton = document.getElementById("Dictate_Button");
      dictButton.style.opacity = "0";
      dictButton.style.visibility = "hidden";
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
    var input  = document.getElementById("Input");
    var cancel = document.getElementById("Cancel");
    var done   = document.getElementById("Done");

    input.value = "";

    input.style.opacity  = "1";
    cancel.style.opacity = "1";
    done.style.opacity   = "1";

    input.style.visibility  = "visible";
    cancel.style.visibility = "visible";
    done.style.visibility   = "visible";

    if (writeMode == 0) {
      var dictButton = document.getElementById("Dictate_Button");
      dictButton.style.opacity = "1";
      dictButton.style.visibility = "visible";
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

  input.style.animation  = "fadeAway 0.5s ease-in";
  done.style.animation   = "fadeAway 0.5s ease-in";
  cancel.style.animation = "fadeAway 0.5s ease-in";

  switch (writeMode) {
    case 0:
      var dictButton = document.getElementById("Dictate_Button");
      dictButton.style.animation = "fadeAway 0.5s ease-in";
      break;

    case 1:
      //cenas de escrever
      break;

    case 2:
      // cenas do nfc
      break;
  }

  setTimeout(function () {
    input.style.animation  = "";
    done.style.animation   = "";
    cancel.style.animation = "";

    input.style.opacity  = "0";
    done.style.opacity   = "0";
    cancel.style.opacity = "0";

    input.style.visibility  = "hidden";
    done.style.visibility   = "hidden";
    cancel.style.visibility = "hidden";

    switch (writeMode) {
      case 0:
        dictButton.style.animation  = "";
        dictButton.style.opacity    = "0";
        dictButton.style.visibility = "hidden";
        break;

      case 1:
        //cenas de escrever
        break;

      case 2:
        // cenas do nfc
        break;
    }

  }, 500);
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


function fadeAwayConfElem() {
  var conf   = document.getElementById("Confirm");
  var done   = document.getElementById("Confirm_Done");
  var cancel = document.getElementById("Confirm_Cancel");

  conf.style.animation   = "fadeAway 0.5s ease-in";
  done.style.animation   = "fadeAway 0.5s ease-in";
  cancel.style.animation = "fadeAway 0.5s ease-in";

  setTimeout(function () {
    conf.style.animation   = "";
    done.style.animation   = "";
    cancel.style.animation = "";

    conf.style.opacity   = "0";
    done.style.opacity   = "0";
    cancel.style.opacity = "0";

    conf.style.visibility   = "hidden";
    done.style.visibility   = "hidden";
    cancel.style.visibility = "hidden";
  }, 500);
}


function showConfElem() {
  var conf   = document.getElementById("Confirm");
  var done   = document.getElementById("Confirm_Done");
  var cancel = document.getElementById("Confirm_Cancel");

  conf.style.opacity   = "1";
  done.style.opacity   = "1";
  cancel.style.opacity = "1";

  conf.style.visibility   = "visible";
  done.style.visibility   = "visible";
  cancel.style.visibility = "visible";
}


function hideConfElem() {
  var conf = document.getElementById("Confirm");
  var done = document.getElementById("Confirm_Done");
  var cancel = document.getElementById("Confirm_Cancel");

  conf.style.opacity = "0";
  done.style.opacity = "0";
  cancel.style.opacity = "0";

  conf.style.visibility   = "hidden";
  done.style.visibility   = "hidden";
  cancel.style.visibility = "hidden";
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
  hideInputMethod();
  showInputOptions();
}


function startDictation() {
  var dictSimul = document.getElementById("DictateSimul");

  document.getElementById("Input").value = "";

  dictSimul.style.opacity = "1";
  dictSimul.style.visibility = "visible";
  document.getElementById("Dictate_Button").style.animation = "pulse 1s ease-in infinite";
}


function endDictation() {
  var dictSimul = document.getElementById("DictateSimul");

  document.getElementById("Input").value = dictSimul.value;
  dictSimul.value = "";

  dictSimul.style.opacity = "0";
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
    document.getElementById("Input").style.opacity  = "0.5";
    document.getElementById("Cancel").style.opacity = "0.5";
    document.getElementById("Done").style.opacity   = "0.5";

    switch (writeMode) {
      case 0:
        document.getElementById("Dictate_Button").style.opacity = "0.5";
        break;

      case 1:
        document.getElementById("Keyboard").style.opacity = "0.5";
        break;
    }

    if(writeMode != 2){
      document.getElementById("Confirm_Text").innerHTML = "Enviar pedido a:";
      document.getElementById("Confirm_Contact").innerHTML = name;
    }else {
      document.getElementById("Confirm_Text").innerHTML = "Adicionar:";
      document.getElementById("Confirm_Contact").innerHTML = name;
    }

    showConfElem();

    var conf = document.getElementById("Confirm");
    conf.style.animation = "boing 300ms ease-in-out";
    setTimeout(function () { conf.style.animation = ""; }, 300);
  }
}

function sendInvite() {
  var mafrensname = document.getElementById("Confirm_Contact").innerHTML;
  setAlert(mafrensname,mafrensname+" foi\nadicionado aos\nseus contactos.","newcontact",5000);

  hideConfElem();
  document.getElementById("Sent").style.transform = "scale(1,1)";
  setTimeout(function(){
    document.getElementById("Sent").style.transform = "scale(0,0)";
    document.location.href = "../Contacts App.html";
  }, 1300);
}
