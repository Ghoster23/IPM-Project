anchors = [0, 183, 348, 530];
slider.scrollTop = 183;

//changes the image to show that the menu has changed
function updateProgress() {
    if (slider.scrollTop <= 91.5) {
        document.getElementById("Progress_Circles").src = "../Images/progress1.png";
    }
    if (slider.scrollTop > 91.5 && slider.scrollTop <= 274.5) {
        document.getElementById("Progress_Circles").src = "../Images/progress2.png";
    }
    if (slider.scrollTop > 274.5 && slider.scrollTop <= 430.5) {
        document.getElementById("Progress_Circles").src = "../Images/progress3.png";
    }
    if (slider.scrollTop > 430.5) {
        document.getElementById("Progress_Circles").src = "../Images/progress4.png";
    }
}

function saveWriteMode(mode) {
  sessionStorage.setItem("writeMode", mode);
}

function sent(){
  document.getElementById("Sent").style.transform = "scale(1,1)";
  document.getElementsByClassName("menu")[0].style.overflow = "hidden";
  setTimeout(function(){
    document.getElementsByClassName("menu")[0].style.overflow = "auto";
    document.getElementById("Sent").style.transform = "scale(0,0)";

    sendSMS("Voce enviou a sua localizacao");
    document.location.href = "Chat/Chat.html";
  }, 1300);
}
