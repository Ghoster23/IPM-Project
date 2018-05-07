function saveNewFriend() {
  var input = document.getElementById("New_Name");
  var name  = input.value;

  var emptyName = (name == "");
  var wrongName = ((name[0] < "a") || (name[0] > "z"));

  if ((emptyName == true) || (wrongName == true)) {
    input.style.fontSize = "15px";
    input.style.animation = "highlight 2s ease-in-out";
    setTimeout(function() { input.style.animation =""; }, 2000);

    if (emptyName == true) {
      input.placeholder = "Campo Obrigatorio";
    } else {
      input.value = "";
      input.placeholder = "Comecar com letra";
    }
  } else {
    var contacts = JSON.parse(sessionStorage.getItem("contacts"));
    contacts.push(name);
    sessionStorage.setItem("contacts", JSON.stringify(contacts));
    document.location.href = "../Messaging App.html";
  }
}
