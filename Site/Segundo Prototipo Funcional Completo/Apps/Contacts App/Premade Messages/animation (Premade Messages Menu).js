slider.scrollTop = 316;
anchors = [0, 158, 316, 474, 632];

function updateProgress() {
    if (slider.scrollTop <= 79) {
        document.getElementById("Progress_Circles_5").src = "../../Health App/Images/progress1.png";
    }
    if (slider.scrollTop > 79 && slider.scrollTop <= 237) {
        document.getElementById("Progress_Circles_5").src = "../../Health App/Images/progress2.png";
    }
    if (slider.scrollTop > 237 && slider.scrollTop <= 395) {
        document.getElementById("Progress_Circles_5").src = "../../Health App/Images/progress3.png";
    }
    if (slider.scrollTop > 395 && slider.scrollTop <= 553) {
        document.getElementById("Progress_Circles_5").src = "../../Health App/Images/progress4.png";
    }
    if (slider.scrollTop > 553) {
        document.getElementById("Progress_Circles_5").src = "../../Health App/Images/progress5.png";
    }
}

function sendSMS(sms) {
  var friend = sessionStorage.getItem("friend");
  var chatWithFriend = JSON.parse(sessionStorage.getItem("chat" + friend));

  if (chatWithFriend == null) {
    chatWithFriend = [[1, sms]];
  } else {
    chatWithFriend.push([1, sms]);
  }
  sessionStorage.setItem("chat" + friend, JSON.stringify(chatWithFriend));
}

function sendSMSPremade(smsNum) {
  switch (smsNum) {
    case 0:
      sendSMS("Fui a casa de banho.");
      break;

    case 1:
      sendSMS("Estou ao pe do palco.");
      break;

    case 2:
      sendSMS("Vim buscar comida / bebida.");
      break;

    case 3:
      sendSMS("Onde estas?");
      break;

    case 4:
      sendSMS("Sai do recinto.");
      break;
  }

  document.location.href = "../Chat/Chat.html";
}
