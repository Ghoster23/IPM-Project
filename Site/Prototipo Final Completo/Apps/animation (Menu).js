const slider = document.querySelector(".menu");
let isDown   = false;
let startY   = 0;
let scrollTop;
slider.scrollTop = 340;

var anchors = [0, 165, 340, 505, 675];//pls set this if you are copy pasting to make a new menu

var timer = null;

//mouse events
slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startY    = e.pageY - slider.offsetTop;
    scrollTop = slider.scrollTop;
});

slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
    anchor2closest();
});

slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
    anchor2closest();
});

//the actual drag scrolling
slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const y          = e.pageY - slider.offsetTop;
    const walk       = y - startY;
    slider.scrollTop = scrollTop - walk;
    clearTimeout(timer);
});

slider.addEventListener("scroll", function() {
    if(timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout(function() {
        anchor2closest();
    }, 50);

    var icons = document.getElementsByClassName('iconApp');
    var dist2nearest = 100 - Math.abs(slider.scrollTop - closest(slider.scrollTop));
    var scale = ((dist2nearest*0.01)/2)+0.5;
    for(i=0; i<icons.length; i++) {
        icons[i].style.transform= 'scale('+scale+')';
    }
}, false);


//changes the image to show that the menu has changed
function updateProgress() {
    if (slider.scrollTop <= 82.5) {
        document.getElementById("Progress_Circles").src = "Images/progress1.png";
    }
    if (slider.scrollTop > 82.5 && slider.scrollTop <= 247.5) {
        document.getElementById("Progress_Circles").src = "Images/progress2.png";
    }
    if (slider.scrollTop > 247.5 && slider.scrollTop <= 427.5) {
        document.getElementById("Progress_Circles").src = "Images/progress3.png";
    }
    if (slider.scrollTop > 427.5 && slider.scrollTop <= 597.5) {
        document.getElementById("Progress_Circles").src = "Images/progress4.png";
    }
    if (slider.scrollTop > 597.5) {
        document.getElementById("Progress_Circles").src = "Images/progress5.png";
    }
}

//function that gets called when you want the scroll to go to the nearest element in menu
function anchor2closest() {
    slider.scroll({ top: closest(slider.scrollTop), left: 0, behavior: "smooth" });
}

//finds the closest element to "position" in array "anchors"
function closest(position) {
    var i = 0;
    var minDiff = 1000;
    var ans;
    for(i in anchors) {
         var m = Math.abs(position-anchors[i]);
         if(m < minDiff) {
            minDiff = m;
            ans = anchors[i];
        }
    }
    return ans;
}

function closestindex(position) {
    var i = 0;
    var minDiff = 1000;
    var ans;
    for(i in anchors) {
         var m = Math.abs(position-anchors[i]);
         if(m < minDiff) {
            minDiff = m;
            ans = i;
        }
    }
    return ans;
}


//----------------------this bit handles the SOS button-----------------------------
var timer;
var count = 0;
var decrease_timer = setInterval(decrease, 10);
var mouse_is_down = false;

//this is used to decrease the count variable
function decrease() {
    if ((count >= 1) && (mouse_is_down == false)) {
        count--;
    }
}

//used for event of pressing down and incrementing count variable
function mousedownfunction() {
    mouse_is_down = true;
    timer = setInterval(function() {
        count++;
        if (count >= 100) {
            localStorage.setItem("SOS", 0);
            window.location.href = "SOS/SOS.html";
            clearTimeout(decrease_timer);
        }
    }, 20);
}
var sos = document.getElementById("iconSOS");
sos && sos.addEventListener("mousedown",  mousedownfunction);
sos && sos.addEventListener("touchstart", mousedownfunction);

//used for event releasing mouse and start decrementing count variable
function mouseupfunction() {
    if (timer) clearInterval(timer)
    mouse_is_down = false;
}
sos && sos.addEventListener("mouseleave", mouseupfunction);
sos && sos.addEventListener("mouseup",    mouseupfunction);
sos && sos.addEventListener("touchend",   mouseupfunction);

//  take care of sosconfirm
var ctx2   = document.getElementById("sosconfirm").getContext("2d");
var start2 = 4.72;
var cw2    = ctx2.canvas.width  = 210;
var ch2    = ctx2.canvas.height = 210;

var diff2;
var sim2 = setInterval(sosSim, 5);

function sosSim() {

    diff2 = ((count / 100) * Math.PI*2*10).toFixed(2);
    ctx2.clearRect(0, 0, cw2, ch2);
    ctx2.lineWidth   = 8;
    ctx2.fillStyle   = "#FFFFFF";
    ctx2.strokeStyle = "#FFFFFF";

    ctx2.beginPath();
    ctx2.arc(cw2/2, ch2/2, cw2/2-48 , start2, diff2/10+start2, false);
    ctx2.stroke();
}
