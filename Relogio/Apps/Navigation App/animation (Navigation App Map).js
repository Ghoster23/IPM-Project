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
  var mapW = 210 * zoom;
  var mapH = mapW;

  var mapX = px - mapW/2;
  var mapY = py - mapH/2;

  ctx.drawImage(map, mapX, mapY, mapW, mapH,
                  0,    0, 210, 210);

  ctx.drawImage(marker,0,0,64,64,tx - mapX - 20,ty - mapY - 40,40,40);

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
    dist = Math.round(Math.sqrt(Math.pow(Math.abs(py-ty),2) + Math.pow(Math.abs(px-tx),2)));

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

    setZoom(1);
    drawMap();
}

// updateLookAt --> Function that update the vison cone's angle
function updateLookAt(newAngle) {
  //TODO --> unfinished

  updateLookAt = rotateElement;
}

// changePosition --> Function that simulate the person's moviments
function changePosition(mov) {
  switch (mov) {
    case 1:
      if (py > 100) { py -= 5; }
    break;

    case 2:
    if (px > 93) { px -= 5; }
    break;

    case 3:
      if (py < 629) { py += 5; }
    break;

    case 4:
      if (px < 796) { px += 5; }
    break;
  }

  var rot2 = Math.atan2((py-ty),(px-tx)) * (180/Math.PI) + 180;
  rotateElement("Arrow",  rot2);

  rotateElement("LookAt", rot2);

  dist = Math.round(Math.sqrt(Math.pow(Math.abs(py-ty),2) + Math.pow(Math.abs(px-tx),2)));
  document.getElementById("Distance").innerHTML = dist + " m";

  if (dist < 60) {
    document.getElementById("Arrow").style.display = "none";
  } else {
    document.getElementById("Arrow").style.display = "block";
  }

  drawMap();
}
