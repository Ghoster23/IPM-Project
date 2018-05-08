function optionChoosen(choosen) {
  var back    = document.getElementById("Back");
  var newName = document.getElementById("New_Name");
  var cancel  = document.getElementById("Cancel");
  var done    = document.getElementById("Done");

  var optChoosen;
  var subChoosen;
  var optNotChoosen;
  var subNotChoosen;

  switch (choosen) {
    case 0:
      optChoosen = document.getElementById("Dictate");
      subChoosen = document.getElementById("DictateSub");
      optNotChoosen = document.getElementById("Write");
      subNotChoosen = document.getElementById("WriteSub");
      break;

    case 1:
      optChoosen = document.getElementById("Write");
      subChoosen = document.getElementById("WriteSub");
      optNotChoosen = document.getElementById("Dictate");
      subNotChoosen = document.getElementById("DictateSub");
      break;
  }

  subChoosen.style.animation    = "fadeAway 1s ease-in";
  optNotChoosen.style.animation = "fadeAway 1s ease-in";
  subNotChoosen.style.animation = "fadeAway 1s ease-in";
  back.style.animation = "fadeAway 1s ease-in";

  if (choosen == 1) {
    optChoosen.style.animation = "fadeAway 1s ease-in";
  }

  setTimeout(function() {
    subChoosen.style.animation    = "";
    optNotChoosen.style.animation = "";
    subNotChoosen.style.animation = "";
    back.style.animation = "";

    subChoosen.style.opacity    = "0";
    optNotChoosen.style.opacity = "0";
    subNotChoosen.style.opacity = "0";
    back.style.opacity = "0";

    subChoosen.style.visibility    = "hidden";
    optNotChoosen.style.visibility = "hidden";
    subNotChoosen.style.visibility = "hidden";
    back.style.visibility = "hidden";

    newName.style.animation = "appear 1s ease-in";
    cancel.style.animation  = "appear 1s ease-in";
    done.style.animation    = "appear 1s ease-in";

    if (choosen == 0) {
      optChoosen.style.animation = "DictateChoosen 1s ease-in";
    } else {
      optChoosen.style.animation  = "";
      optChoosen.style.opacity    = "0";
      optChoosen.style.visibility = "hidden";
    }

    setTimeout(function() {
      optChoosen.style.animation = "";
      newName.style.animation    = "";
      cancel.style.animation     = "";
      done.style.animation       = "";

      newName.style.visibility = "visible";
      cancel.style.visibility  = "visible";
      done.style.visibility    = "visible";

      newName.style.opacity = "1";
      cancel.style.opacity  = "1";
      done.style.opacity    = "1";

      if (choosen == 0) {
        optChoosen.style.top = "55px";
      } else {
        optChoosen.style.opacity    = "0";
        optChoosen.style.visibility = "hidden";
      }
    }, 1000);

  }, 1000);
}

function cancelChoice() {
  var newName   = document.getElementById("New_Name");
  var cancel    = document.getElementById("Cancel");
  var done      = document.getElementById("Done");

  var back      = document.getElementById("Back");
  var dictIcon  = document.getElementById("Dictate");
  var dictSub   = document.getElementById("DictateSub");
  var writeIcon = document.getElementById("Write");
  var writeSub  = document.getElementById("WriteSub");

  newName.style.animation = "fadeAway 0.5s ease-in";
  cancel.style.animation  = "fadeAway 0.5s ease-in";
  done.style.animation    = "fadeAway 0.5s ease-in";

  back.style.animation      = "appear 0.5s ease-in";
  dictSub.style.animation   = "appear 0.5s ease-in";
  writeIcon.style.animation = "appear 0.5s ease-in";
  writeSub.style.animation  = "appear 0.5s ease-in";

  dictIcon.style.animation = "goBackToPlace 0.5s ease-in";

  setTimeout(function() {
    newName.style.animation   = "";
    cancel.style.animation    = "";
    done.style.animation      = "";
    back.style.animation      = "";
    dictIcon.style.animation  = "";
    dictSub.style.animation   = "";
    writeIcon.style.animation = "";
    writeSub.style.animation  = "";

    newName.style.opacity = "0";
    cancel.style.opacity  = "0";
    done.style.opacity    = "0";

    newName.style.visibility = "hidden";
    cancel.style.visibility  = "hidden";
    done.style.visibility    = "hidden";

    back.style.opacity      = "1";
    dictIcon.style.opacity  = "1";
    dictSub.style.opacity   = "1";
    writeIcon.style.opacity = "1";
    writeSub.style.opacity  = "1";

    back.style.visibility      = "visible";
    dictIcon.style.visibility  = "visible";
    dictSub.style.visibility   = "visible";
    writeIcon.style.visibility = "visible";
    writeSub.style.visibility  = "visible";

    dictIcon.style.top = "-30px";
  }, 500);
}

function saveNewFriend() {
  var input = document.getElementById("New_Name");
  var name  = input.value;

  var emptyName = (name == "");
  var wrongName = ((name[0] < "a") || (name[0] > "z"));

  if ((emptyName == true) || (wrongName == true)) {
    input.style.fontSize = "15px";
    input.style.animation = "highlight 2s ease-in-out";
    setTimeout(function() { input.style.animation =""; }, 2000);

    if (emptyName == true) {
      input.placeholder = "Campo Obrigatorio";
    } else {
      input.value = "";
      input.placeholder = "Comecar com letra";
    }
  } else {
    var contacts = JSON.parse(sessionStorage.getItem("contacts"));
    contacts.push(name);
    sessionStorage.setItem("contacts", JSON.stringify(contacts));
    document.location.href = "../Messaging App.html";
  }
}
