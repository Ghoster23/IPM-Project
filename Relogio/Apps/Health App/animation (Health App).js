slider.scrollTop = 372;

function saveTestInfo(a, b){
    localStorage.setItem("color", a);
    localStorage.setItem("testtype", b);
}

function updateProgress() {
    if (slider.scrollTop <= 80) {
        document.getElementById("Progress_Circles_Health").src = "Images/progress1.png";
    }
    if (slider.scrollTop > 96 && slider.scrollTop <= 276) {
        document.getElementById("Progress_Circles_Health").src = "Images/progress2.png";
    }
    if (slider.scrollTop > 276 && slider.scrollTop <= 450) {
        document.getElementById("Progress_Circles_Health").src = "Images/progress3.png";
    }
    if (slider.scrollTop > 450 && slider.scrollTop <= 650) {
        document.getElementById("Progress_Circles_Health").src = "Images/progress4.png";
    }
    if (slider.scrollTop > 650) {
        document.getElementById("Progress_Circles_Health").src = "Images/progress5.png";
    }
}

