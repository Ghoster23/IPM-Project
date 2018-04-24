slider.scrollTop = 335;
anchors = [ 0, 165, 335, 505, 700];

function saveNavInfo(a){
    localStorage.setItem("label", a);
}

function updateProgress() {
    if (slider.scrollTop <= 80) {
        document.getElementById("Progress_Circles_Navigation").src = "Images/progress1.png";
    }
    if (slider.scrollTop > 96 && slider.scrollTop <= 276) {
        document.getElementById("Progress_Circles_Navigation").src = "Images/progress2.png";
    }
    if (slider.scrollTop > 276 && slider.scrollTop <= 450) {
        document.getElementById("Progress_Circles_Navigation").src = "Images/progress3.png";
    }
    if (slider.scrollTop > 450 && slider.scrollTop <= 650) {
        document.getElementById("Progress_Circles_Navigation").src = "Images/progress4.png";
    }
    if (slider.scrollTop > 650) {
        document.getElementById("Progress_Circles_Navigation").src = "Images/progress5.png";
    }
}
