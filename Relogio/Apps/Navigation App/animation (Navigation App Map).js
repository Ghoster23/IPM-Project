//take care of making the circular progress bar :o
var ctx        = document.getElementById('Loading').getContext('2d');
var percentage = 0;
var start      = 4.72;
var cw         = ctx.canvas.width  = 210;
var ch         = ctx.canvas.height = 210;
var color      = localStorage.getItem("color");

var diff;
var sim = setInterval(progressSim, 30);

function progressSim() {
    diff = ((percentage / 100) * Math.PI*2*10).toFixed(2);
    ctx.clearRect(0, 0, cw, ch);
    ctx.lineWidth   = 40;
    ctx.fillStyle   = "#FFFFFF";
    ctx.strokeStyle = color;

    ctx.font      = "40px sans-serif";
    ctx.textAlign = "center";

    ctx.fillText(percentage+'%', cw*.5+5, ch*.5+15, cw);
    ctx.beginPath();
    ctx.arc(cw/2, ch/2, cw/2-10 , start, diff/10+start, false);
    ctx.stroke();
    if (percentage >= 100) {
        //upon finishing clear canvas and make visible test results
        clearTimeout(sim);

        ctx.clearRect(0, 0, cw, ch);
        ctx.arc(cw/2, ch/2, cw/2-10 , start, diff/10+start, false);
        ctx.stroke();

        testResults();
        document.getElementById('Result').style.visibility = "visible";
        document.getElementById('Result_Text').style.visibility = "visible";
    }
    percentage++;
}

//decide on the string to put for the result :)
function markerPosition() {
    var marker = localStorage.getItem("label");

    switch(marker) {
        //Stages
        case "0":

        break;

        //WC
        case "1":

        break;

        //Drinks
        case "2":

        break;

        //Food
        case "3":

        break;

        //Friends
        case "4":

        break;
    }

    document.getElementById('Result_Text').textContent = resultstring;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
