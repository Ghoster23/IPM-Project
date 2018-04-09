//Function that controls the watch's hands

function clock() {
    var date  = new Date;
    var hours = (30 * ((date.getHours() % 12) + date.getMinutes() / 60) - 90);
    var min   = (6 * date.getMinutes() - 90);
    var sec   = (6 * date.getSeconds() - 90);

    rotateHand('Hour_Hand', hours);
    rotateHand('Min_Hand', min);
    rotateHand('Sec_Hand', sec);

    setTimeout(clock, 1000);
}

function rotateHand(id, angle) {
    document.getElementById(id).style.transform = 'rotate(' + angle + 'deg)';
}