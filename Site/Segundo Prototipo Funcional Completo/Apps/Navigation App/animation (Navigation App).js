slider.scrollTop = 520;
anchors = [0, 180, 350, 520, 690, 860, 1030];

function saveNavInfo(a){
    localStorage.setItem("label", a);
}

function updateProgress() {
    if (slider.scrollTop <= 90) {
        document.getElementById("Progress_Circles_Navigation").src = "Images/progress1.png";
    }
    if (slider.scrollTop > 90 && slider.scrollTop <= 265) {
        document.getElementById("Progress_Circles_Navigation").src = "Images/progress2.png";
    }
    if (slider.scrollTop > 265 && slider.scrollTop <= 435) {
        document.getElementById("Progress_Circles_Navigation").src = "Images/progress3.png";
    }
    if (slider.scrollTop > 435 && slider.scrollTop <= 605) {
        document.getElementById("Progress_Circles_Navigation").src = "Images/progress4.png";
    }
    if (slider.scrollTop > 605 && slider.scrollTop <= 775) {
        document.getElementById("Progress_Circles_Navigation").src = "Images/progress5.png";
    }
    if (slider.scrollTop > 775 && slider.scrollTop <= 945) {
        document.getElementById("Progress_Circles_Navigation").src = "Images/progress6.png";
    }
    if (slider.scrollTop > 945) {
        document.getElementById("Progress_Circles_Navigation").src = "Images/progress7.png";
    }
}
