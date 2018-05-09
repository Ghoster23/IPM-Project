slider.scrollTop = 0;
anchors = [0, 159, 318, 477, 636];

function updateProgress() {
    if (slider.scrollTop <= 79.5) {
        document.getElementById("Progress_Circles_5").src = "../../Health App/Images/progress1.png";
    }
    if (slider.scrollTop > 79.5 && slider.scrollTop <= 238.5) {
        document.getElementById("Progress_Circles_5").src = "../../Health App/Images/progress2.png";
    }
    if (slider.scrollTop > 238.5 && slider.scrollTop <= 397.5) {
        document.getElementById("Progress_Circles_5").src = "../../Health App/Images/progress3.png";
    }
    if (slider.scrollTop > 397.5 && slider.scrollTop <= 556.5) {
        document.getElementById("Progress_Circles_5").src = "../../Health App/Images/progress4.png";
    }
    if (slider.scrollTop > 556.5) {
        document.getElementById("Progress_Circles_5").src = "../../Health App/Images/progress5.png";
    }
}
