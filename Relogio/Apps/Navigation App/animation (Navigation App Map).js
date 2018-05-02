function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//Function that updates the clock hands' position
function rotateElement(id, angle) {
  document.getElementById(id).style.transform = "rotate(" + angle + "deg)";
}

//decide on the string to put for the result :)
function markerPosition() {
    var marker = localStorage.getItem("label");

    var rot1 = getRandomArbitrary(0,360);
    var rot2 = getRandomArbitrary(0,360);
    var dist = Math.round(getRandomArbitrary(0,750));

    var tg = "???";

    rotateElement("LookAt", rot1);
    rotateElement("Arrow",  rot2);

    switch(marker) {
        case "0":
          tg = "Informacoes";
          document.getElementById("Target").style.fontSize = "17px";
        break;

        case "1":
          tg = "WC";
        break;

        case "2":
          tg = "Palcos";
        break;

        case "3":
          tg = "Bebidas";
        break;

        case "4":
          tg = "Comida";
        break;

        case "5":
          tg = sessionStorage.getItem("friend");
        break;

        case "6":
          tg = "Saidas";
        break;
    }

    document.getElementById("Target").innerHTML   = tg;
    document.getElementById("Distance").innerHTML = dist + " m";
}
