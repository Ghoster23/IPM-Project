slider.scrollTop = 372;
anchors = [0, 186, 372, 560, 750];

function saveTestInfo(a, b){
    localStorage.setItem("color", a);
    localStorage.setItem("testtype", b);
}

function updateProgress() {
    if (slider.scrollTop <= 93) {
        document.getElementById("Progress_Circles_Health").src = "Images/progress1.png";
    }
    if (slider.scrollTop > 93 && slider.scrollTop <= 274) {
        document.getElementById("Progress_Circles_Health").src = "Images/progress2.png";
    }
    if (slider.scrollTop > 274 && slider.scrollTop <= 466) {
        document.getElementById("Progress_Circles_Health").src = "Images/progress3.png";
    }
    if (slider.scrollTop > 466 && slider.scrollTop <= 654) {
        document.getElementById("Progress_Circles_Health").src = "Images/progress4.png";
    }
    if (slider.scrollTop > 654) {
        document.getElementById("Progress_Circles_Health").src = "Images/progress5.png";
    }
}
