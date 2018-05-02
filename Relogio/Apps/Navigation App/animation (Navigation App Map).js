var map = new Image();
map.src = "Images/Map/map.png";

var marker = new Image();
marker.src = "Images/Map/map-marker.png";

var zoom = 1;

var ctx = document.getElementById("Map").getContext("2d");

var px = 0;
var py = 0;

var tx = 0;
var ty = 0;

var dist = 0;

function drawMap(){
  var mapX = px - 105;
  var mapY = py - 105;
  var mapW = 210;
  var mapH = mapW;

  ctx.drawImage(map, mapX / zoom, mapY / zoom,
                mapW * zoom, mapH * zoom, 0, 0, 210, 210);


  ctx.drawImage(marker,0,0,64,64,tx*zoom-mapX/zoom - 20,ty*zoom-mapY/zoom - 40,40,40);


  setInterval(drawMap,500);
}

function setZoom(amount){
  zoom = amount;
}

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

    px = getRandomArbitrary(241,662);
    py = getRandomArbitrary(187,551);

    tx = getRandomArbitrary(241,662);
    ty = getRandomArbitrary(187,551);

    console.log("px: " + px + " py: " + py);
    console.log("tx: " + tx + " ty: " + ty);

    var rot1 = getRandomArbitrary(0,360);
    var rot2 = Math.atan2((py-ty),(px-tx)) * (180/Math.PI) + 180;
    var dist = Math.round(Math.sqrt(Math.pow(Math.abs(py-ty),2) + Math.pow(Math.abs(px-tx),2)));

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

    drawMap();
}
