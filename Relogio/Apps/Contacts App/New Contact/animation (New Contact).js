var writeMode;
var dictating = false;

slider.scrollTop = 165;

var anchors = [0, 165, 340];//pls set this if you are copy pasting to make a new menu

function updateProgress() {
    if (slider.scrollTop <= 82.5) {
        document.getElementById("Progress_Circles").src = "../Images/progress1.png";
    }
    if (slider.scrollTop > 82.5 && slider.scrollTop <= 247.5) {
        document.getElementById("Progress_Circles").src = "../Images/progress2.png";
    }
    if (slider.scrollTop > 247.5 && slider.scrollTop <= 427.5) {
        document.getElementById("Progress_Circles").src = "../Images/progress3.png";
    }
}

function hideInputOptions(){
  var newName = document.getElementById("Input");
  var table   = document.getElementById("Table");
  var prog    = document.getElementById("Progress_Circles");
  var back    = document.getElementById("Back");

  newName.value = "";

  table.style.animation = "fadeAway 0.5s ease-in";
  prog.style.animation  = "fadeAway 0.5s ease-in";
  back.style.animation  = "fadeAway 0.5s ease-in";

  setTimeout(function (){
    table.style.animation = "";
    prog.style.animation  = "";
    back.style.animation  = "";

    table.style.animation = "0";
    prog.style.animation  = "0";
    back.style.opacity    = "0";

    table.style.visibility = "hidden";
    prog.style.visibility  = "hidden";
    back.style.visibility  = "hidden";
  },
  500);
}

function showInputOptions(){
  var table = document.getElementById("Table");
  var prog  = document.getElementById("Progress_Circles");
  var back  = document.getElementById("Back");

  table.style.animation = "appear 0.5s ease-in";
  prog.style.animation  = "appear 0.5s ease-in";
  back.style.animation  = "appear 0.5s ease-in";

  setTimeout(function (){
    table.style.animation = "";
    prog.style.animation  = "";
    back.style.animation  = "";

    table.style.animation = "1";
    prog.style.animation  = "1";
    back.style.opacity    = "1";

    table.style.visibility = "visible";
    prog.style.visibility  = "visible";
    back.style.visibility  = "visible";
  },
  500);
}

function showInputMethod(){
  var newName = document.getElementById("Input");
  var cancel  = document.getElementById("Cancel");
  var done    = document.getElementById("Done");

  newName.style.animation = "appear 0.5s ease-in";
  cancel.style.animation  = "appear 0.5s ease-in";
  done.style.animation    = "appear 0.5s ease-in";

  if (writeMode == 0) {
    var button    = document.getElementById("Dictate_Button");
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

    if (writeMode == 0) {
      button.style.animation  = "";
      button.style.visibility = "visible";
      button.style.opacity    = "1";

    }
  },
  500);
}

function hideInputMethod(){
  var newName = document.getElementById("Input");
  var cancel  = document.getElementById("Cancel");
  var done    = document.getElementById("Done");

  newName.value = "";

  newName.style.animation = "fadeAway 0.5s ease-in";
  cancel.style.animation  = "fadeAway 0.5s ease-in";
  done.style.animation    = "fadeAway 0.5s ease-in";

  if (writeMode == 0) {
    var dictSimul = document.getElementById("DictateSimul");
    var button    = document.getElementById("Dictate_Button");
    if(dictSimul.style.visibility != "hidden"){
      dictSimul.style.animation = "fadeAway 0.5s ease-in";
    }
    button.style.animation    = "fadeAway 0.5s ease-in";
  }

  setTimeout(function (){
    newName.style.animation    = "";
    cancel.style.animation     = "";
    done.style.animation       = "";

    newName.style.visibility = "hidden";
    cancel.style.visibility  = "hidden";
    done.style.visibility    = "hidden";

    newName.style.opacity = "0";
    cancel.style.opacity  = "0";
    done.style.opacity    = "0";

    if (writeMode == 0) {
      button.style.animation  = "";
      button.style.visibility = "hidden";
      button.style.opacity    = "0";

      dictSimul.style.animation  = "";
      dictSimul.style.visibility = "hidden";
      dictSimul.style.opacity    = "0";

    } else {
      removeKeyboard();
    }
  },
  500);
}

function optionChoosen(choosen) {
  writeMode = choosen;

  setTimeout(function() {
    hideInputOptions(writeMode);

    setTimeout(function() {
      showInputMethod(writeMode);

    }, 500);

  }, 500);
}

function cancelChoice() {
  setTimeout(function() {
    hideInputMethod(writeMode);

    setTimeout(function() {
      showInputOptions(writeMode);

    }, 500);

  }, 500);
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

function saveNewFriend() {
  var name;

  switch (writeMode) {
    case 0:
      var simul = document.getElementById("DictateSimul");
      name = simul.value;
      break;

    case 1:
      var input = document.getElementById("Input");
      name = input.value;
      break;
  }

  var emptyName = (name == "");
  var goodName  = (((name[0] >= "a") && (name[0] <= "z")) ||
                   ((name[0] >= "A") && (name[0] <= "Z")));

  if ((emptyName == true) || (goodName == false)) {
    input.style.fontSize = "15px";
    input.style.animation = "highlight 2s ease-in-out";

    if (writeMode == 0) { simul.style.animation = "highlight 2s ease-in-out"; }

    setTimeout(function() {
      input.style.animation ="";

      if (writeMode == 0) { simul.style.animation = ""; }
    }, 2000);

    if (writeMode == 0) { simul.value = ""; }

    if (emptyName == true) {
      input.placeholder = "Campo Obrigatorio";

      if (writeMode == 0) { input.value = ""; }
    } else {
      input.value = "";
      input.placeholder = "Comecar com letra";
    }
  } else {
    var contacts = JSON.parse(sessionStorage.getItem("contacts"));
    contacts.push(name);
    sessionStorage.setItem("contacts", JSON.stringify(contacts));

    hideInputMethod();
    setTimeout(function() {
      document.location.href = "../Contacts App.html";
    },
    500);
  }
}
