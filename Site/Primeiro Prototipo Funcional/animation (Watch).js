 var weekDay = ["Dom", "Seg", "Ter", "Qua",  "Qui", "Sex", "Sab"];
 var month   = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

//Function that controls the watch"s hands and info
function clock() {
    var date  = new Date;
    var hours = (30 * ((date.getHours() % 12) + date.getMinutes() / 60) - 90);
    var min   = ( 6 * date.getMinutes() - 90);
    var sec   = ( 6 * date.getSeconds() - 90);

    rotateHand("Hour_Hand", hours);
    rotateHand( "Min_Hand",   min);
    rotateHand( "Sec_Hand",   sec);

    if (document.getElementById("Week_Day").innerHTML == "wd" ||
        (hours == 270 && min == 270 && sec == 270)){
      dateUpdate(date);
    }

    setTimeout(clock, 1000);
}

//Function that updates the clock hands' position
function rotateHand(id, angle) {
  document.getElementById(id).style.transform = "rotate(" + angle + "deg)";
}

//Function that updates the date
function dateUpdate(date) {
  changeText("Week_Day", weekDay[date.getDay()] + ",");
  changeText(     "Day", date.getDate() + " ");
  changeText(   "Month", month[date.getMonth()]);
}

//Function that changes an element in the document
function changeText(id, txt) {
  document.getElementById(id).innerHTML = txt;
}