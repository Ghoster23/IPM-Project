var map = new Image();
map.src = "Images/Map/map.png";

var marker = new Image();
marker.src = "Images/Map/map-marker.png";

var zoom   = 3.5;
var target = zoom;

var ctx = document.getElementById("Map").getContext("2d");

var px = 0;
var py = 0;

var tx = 0;
var ty = 0;

var dist = 0;


function drawMap(){
  setInterval(drawMap,1000);

  if(zoom != target){
    changeZoom(0.05);

    if(Math.abs(zoom - target) > 0.05){
      setInterval(drawMap,50);
    }else {
      zoom = target;
    }
  }

  var mapW = 210 * zoom;
  var mapH = mapW;

  var mapX = px - mapW/2;
  var mapY = py - mapH/2;

  ctx.clearRect(0,0,210,210);
  ctx.drawImage(map, mapX, mapY, mapW, mapH,
                  0,    0, 210, 210);

  ctx.drawImage(marker,0,0,64,64,(tx - mapX) / zoom - 20,(ty - mapY) / zoom - 40,40,40);
}


function setZoom(amount){
  zoom = amount;
}

function changeZoom(rate){
  zoom += (target - zoom) * rate;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


//Function that updates the element's position
function rotateElement(id, angle) {
  document.getElementById(id).style.transform = "rotate(" + angle + "deg)";
}


// updatesDist --> updates the distance between the user and the target.
function updatesDist() {
  dist = Math.round(Math.sqrt(Math.pow(Math.abs(py-ty),2) + Math.pow(Math.abs(px-tx),2)));
}


//decide on the string to put for the result :)
function markerPosition() {
    var marker = localStorage.getItem("label");

    px = getRandomArbitrary(241,662);
    py = getRandomArbitrary(187,551);

    tx = getRandomArbitrary(241,662);
    ty = getRandomArbitrary(187,551);

    var tg = "???";

    switch(marker) {
        case "0":
          tg = "Informacoes";
          document.getElementById("Target").style.fontSize = "17px";
        break;

        case "1":
          tg = "WC";
          tx = 321;
          ty = 274;
        break;

        case "2":
          tg = "Palcos";
          tx = 554;
          ty = 335;
        break;

        case "3":
          tg = "Bebidas";
          tx = 550;
          ty = 420;
        break;

        case "4":
          tg = "Comida";
          tx = 584;
          ty = 267;
        break;

        case "5":
          tg = sessionStorage.getItem("friend");
        break;

        case "6":
          tg = "Saidas";
          tx = 644;
          ty = 328;
        break;
    }

    var rot1 = getRandomArbitrary(0,360);
    var rot2 = Math.atan2((py-ty),(px-tx)) * (180/Math.PI) + 180;
    dist = Math.round(Math.sqrt(Math.pow(Math.abs(py-ty),2) + Math.pow(Math.abs(px-tx),2)));

    rotateElement("LookAt", rot1);
    rotateElement("Arrow",  rot2);

    console.log(tg);
    document.getElementById("Target").innerHTML   = tg;
    document.getElementById("Distance").innerHTML = dist + " m";

    drawMap();
    target = 1;
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

  document.getElementById("LookAt").style.transition = "transform 1s ease-in";
  rotateElement("LookAt", rot2);

  updatesDist();
  document.getElementById("Distance").innerHTML = dist + " m";

  if (dist <= 15) {
    document.location.href = "End Navigation.html";
  } else if (dist < 60) {
    document.getElementById("Arrow").style.display = "none";
  } else {
    document.getElementById("Arrow").style.display = "block";
  }

  drawMap();
}
