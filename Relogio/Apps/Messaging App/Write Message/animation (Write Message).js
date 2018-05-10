function chooseWriteMode() {
  var writeMode = sessionStorage.getItem("writeMode");
  var input = document.getElementById("Input");
  if (writeMode == 0) { // White Mode
    document.title += " Escrever";
    input.placeholder = "Escreva";
  } else {  // Dictate Mode
    document.title += " Ditar";
    input.placeholder = "Dite";
  }
}
