const slider = document.querySelector(".menu")
let isDown = false;
let startY = 0;
let scrollTop;
slider.scrollTop = 165;

var anchors = [0, 165, 340];//pls set this if you are copy pasting to make a new menu

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
    console.log(scrollTop.toString());
    anchor2closest();
});

//the actual drag scrolling
slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const y          = e.pageY - slider.offsetTop; 
    const walk       = y - startY;
    slider.scrollTop = scrollTop - walk;
});

slider.addEventListener('scroll', function() {
    if(timer !== null) {
        clearTimeout(timer);        
    }
    timer = setTimeout(function() {
        anchor2closest();
    }, 50);
}, false);

//changes the image to show that the menu has changed
function updateProgress() {
    if (slider.scrollTop <= 82.5) {
        document.getElementById("Progress_Circles").src = "Images/progress1.png";
    }
    if (slider.scrollTop > 82.5 && slider.scrollTop <= 247.5) {
        document.getElementById("Progress_Circles").src = "Images/progress2.png";
    }
    if (slider.scrollTop > 247.5) {
        document.getElementById("Progress_Circles").src = "Images/progress3.png";
    }
}

//function that gets called when you want the scroll to go to the nearest element in menu
function anchor2closest(){
    slider.scroll({ top: closest(slider.scrollTop), left: 0, behavior: 'smooth' });
    //console.log(closest(slider.scrollTop));
}

//finds the closest element in to "position" in array "anchors"
function closest(position){
    var i=0;
    var minDiff=1000;
    var ans;
    for(i in anchors){
         var m=Math.abs(position-anchors[i]);
         if(m<minDiff){ 
            minDiff=m; 
            ans=anchors[i]; 
        }
    }
    return ans;
}

