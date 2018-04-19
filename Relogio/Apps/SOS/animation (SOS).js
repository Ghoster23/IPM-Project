var time = document.getElementById("Time").getContext("2d");

var tw = time.canvas.width  = 210;
var th = time.canvas.height = 210;

var min = getRandomArbitrary(0, 4).toFixed(0);
var sec = getRandomArbitrary(0, 59).toFixed(0);

var done = false;
setTimeout(decreaseTime, 0);

function decreaseTime() {
  time.clearRect(0, 0, tw, th);

  time.lineWidth   = 210;
  time.font        = "50px sans-serif";
  time.fillStyle   = "#FFFFFF";
  time.textAlign   = "center";
  time.shadowColor = "black";
  time.shadowBlur  = 10;

  if (!done) {
    sec--;
    if (sec == 0) {
      sec = 59;
      if (min == 0) {
        sec = 0;
        done = true;
      } else {
        min--;
      }
    }

    if (sec < 10) {
      sec = "0" + sec;
    }
    setTimeout(decreaseTime, 50);
  }
  else {
    setTimeout(function() {
      window.location.href = "../../Watch.html";
    }, 1500);
  }

  time.fillText(min+":"+sec, 75, 60);
}

//gets random num
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
