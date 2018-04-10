function changeText(id, txt){
  document.getElementById(id).innerHTML = txt;
}

//Function that controls the watch's hands and info
function clock() {
    var date  = new Date;
    var hours = (30 * ((date.getHours() % 12) + date.getMinutes() / 60) - 90);
    var min   = ( 6 * date.getMinutes() - 90);
    var sec   = ( 6 * date.getSeconds() - 90);

    rotateHand('Hour_Hand', hours);
    rotateHand( 'Min_Hand',   min);
    rotateHand( 'Sec_Hand',   sec);

    if(document.getElementById('Week_Day').innerHTML == "wd" ||
        (hours == 270 && min == 270 && sec == 270)){
      dateUpdate(date);
    }

    setTimeout( clock, 1000);
}

function dateUpdate(date) {
  weekDay('Week_Day', date.getDay());

  changeText('Day', date.getDate() + " ");

  month('Month', date.getMonth());
}

function rotateHand(id, angle) {
    document.getElementById(id).style.transform = 'rotate(' + angle + 'deg)';
}

function weekDay(id, wd) {
    var day;

    switch(wd){
      case 0:
        day = "Dom";
      break;
      case 1:
        day = "2a";
      break;
      case 2:
        day = "3a";
      break;
      case 3:
        day = "4a";
      break;
      case 4:
        day = "5a";
      break;
      case 5:
        day = "6a";
      break;
      case 6:
        day = "Sab";
      break;
    }

    changeText(id, day + ",");
}

function month(id, m) {
    var month;

    switch(m){
      case 0:
        month = "Jan";
      break;
      case 1:
        month = "Fev";
      break;
      case 2:
        month = "Mar";
      break;
      case 3:
        month = "Abr";
      break;
      case 4:
        month = "Mai";
      break;
      case 5:
        month = "Jun";
      break;
      case 6:
        month = "Jul";
      break;
      case 7:
        month = "Ago";
      break;
      case 8:
        month = "Set";
      break;
      case 9:
        month = "Out";
      break;
      case 10:
        month = "Nov";
      break;
      case 11:
        month = "Dez";
      break;
    }

    changeText(id, month);
}
