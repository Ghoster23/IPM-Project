//take care of making the circular progress bar :o
var ctx        = document.getElementById("Loading").getContext("2d");
var percentage = 0;
var start      = 4.72;
var cw         = ctx.canvas.width  = 210;
var ch         = ctx.canvas.height = 210;
var color      = localStorage.getItem("color");

var diff;
var sim = setInterval(progressSim, 30);
var done = false;

//purposelly left empty this function is used to do nothing
function noop() { };

function progressSim() {
    if(done == false){
        diff = ((percentage / 100) * Math.PI*2*10).toFixed(2);
        ctx.clearRect(0, 0, cw, ch);
        ctx.lineWidth   = 56;
        ctx.fillStyle   = "#FFFFFF";
        ctx.strokeStyle = color;

        ctx.font      = "40px sans-serif";
        ctx.textAlign = "center";

        ctx.fillText(percentage+"%", cw*.5+5, ch*.5+15, cw);
        ctx.beginPath();
        ctx.arc(cw/2, ch/2, cw/2-4 , start, diff/10+start, false);
        ctx.stroke();
        if (percentage >= 100) {
            //upon finishing clear canvas and make visible test results
            if(done == false){
                done = true;
                clearTimeout(sim);

                ctx.clearRect(0, 0, cw, ch);
                ctx.arc(cw/2, ch/2, cw/2-4 , start, diff/10+start, false);
                ctx.stroke();

                testResults();
            }
        }
    }
    if(done == true){
        sim = setInterval(progressSim, 50);
        ctx.lineWidth = 56-((percentage-100)*60/100);
        ctx.clearRect(0, 0, cw, ch);
        ctx.arc(cw/2, ch/2, cw/2-4 , start, diff/10+start, false);
        ctx.stroke();
        if(percentage >= 190){
            ctx.clearRect(0, 0, cw, ch);
            clearTimeout(sim);
            done = null;
        }
    }
    percentage++;
}

//decide on the string to put for the result :)
function testResults() {
    var testtype     = localStorage.getItem("testtype");
    var resultstring = "default";
    var goodResult   = false;
    var randomNumber;

    switch(testtype) {
        //teste alcoolemia
        case "1":
            randomNumber = getRandomArbitrary(0,1.5).toFixed(2);
            resultstring = randomNumber.toString() + "%";
            if (randomNumber < 0.5) {
                goodResult = true;
            }
            break;

        //teste de pressao arterial
        case "2":
            randomNumber = getRandomArbitrary(0,190).toFixed(0);
            var pressao2 = getRandomArbitrary(0,120).toFixed(0);
            resultstring = randomNumber.toString() + "/" + pressao2.toString() + "\nmmHg";
            document.getElementById("Result_Text").style.top = "100px";
            if (randomNumber < 120 && pressao2 < 80) { goodResult = true; }
            break;

        //teste de narcoticos
        case "3":
            var narcoticos = ["Nao foram\nencontradas\nsubstancias", "Cannabis", "Ecstasy", "Heroina", "Cocaina", "Anfetaminas", "LSD"];
            randomNumber = getRandomArbitrary(0,7).toFixed(0);
            switch(randomNumber) {
                case "0":
                case "1":
                    document.getElementById("Result_Text").style.top  = "90px";
                    document.getElementById("Result_Text").style.fontSize = "21px";
                    goodResult   = true;
                    randomNumber = 0;
                    break;
                case "6":
                    document.getElementById("Result_Text").style.fontSize = "25px";
                    break;
            }
            if (randomNumber > 1) { randomNumber -= 1; }
            resultstring = narcoticos[randomNumber];
            break;

        //ritmo cardiaco
        case "4":
            randomNumber = getRandomArbitrary(49,121).toFixed(0);
            resultstring = randomNumber.toString() + " bpm";
            if (60 < randomNumber && randomNumber < 100) { goodResult = true; }
            break;

        //teste de glicémia
        case "5":
            randomNumber = getRandomArbitrary(40,200).toFixed(0);
            resultstring = randomNumber.toString() + "\nmg/dl";
            document.getElementById("Result_Text").style.top = "100px";
            if (70 < randomNumber && randomNumber < 140) { goodResult = true; }
            break;
    }

    document.getElementById("Result_Text").textContent = resultstring;
    if (goodResult) {
        document.getElementById("Touch_Screen").style.backgroundColor = "#17BF15";      //green +    thumbs up
        document.getElementById("Result_Text").style.visibility = "visible";
        document.getElementById("Good").style.visibility = "visible";
    } else {
        document.getElementById("Touch_Screen").style.backgroundColor = "#DE1F26";      //red
        document.getElementById("Result_Text").style.visibility = "visible";
        document.getElementById("Warning").style.visibility = "visible";
        document.getElementById("Warning").style.animation  = "pulse 1s ease-in infinite";//add pulsating
        window.setTimeout(buttonise, 1100);
    }
}

//handles the turning of the sprite to a button
function buttonise() {
    document.getElementById("Warning").style.animation           = "morph 0.3s steps(17) 1, enlarge 0.3s ease-in 1";
    document.getElementById("Warning").style.animationFillMode   = "forwards";
    document.getElementById("Result_Text").style.transition      = "transform 0.3s, font-size 0.3s";
    document.getElementById("Result_Text").style.transform       = "translate(0px, 60px)";
    document.getElementById("Result_Text").style.fontSize        = "18px";
    window.setTimeout(function() {
        document.getElementById("Warning").style.visibility      = "hidden";
        document.getElementById("Warningfinal").style.visibility = "visible";
        document.getElementById("Warningfinal").style.transform  = "translate(0px, 37px)";
        document.getElementById("littlecircle").style.animation  = "pulse 1s ease-in infinite";
        document.getElementById("sosconfirm").style.animation  = "pulse 1s ease-in infinite";
        window.setTimeout(function() {
            document.getElementById("littlecircle").style.opacity= "1";
        }, 300);
    }, 600);
}

//gets random num
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//----------------------this bit handles the SOS button-----------------------------
var timer;
var count = 0;
var decrease_timer = setInterval(decrease, 10);
var mouse_is_down  = false;

//this is used to decrease the count variable
function decrease() {
    if ((count >= 1) && (mouse_is_down == false)){
        count--;
        console.log(count.toString());
    }
}

//used for event of pressing down and incrementing count variable
function mousedownfunction() {
    mouse_is_down = true;
    timer = setInterval(function() {
        count++;
        console.log(count.toString());
        if (count >= 100) {
            localStorage.setItem("SOS", 1);
            window.location.href = "../SOS/SOS.html";
            clearTimeout(decrease_timer);
        }
    }, 20);
}
document.getElementById("Warningfinal").addEventListener("mousedown",  mousedownfunction);
document.getElementById("Warningfinal").addEventListener("touchstart", mousedownfunction);

//used for event releasing mouse and start decrementing count variable
function mouseupfunction() {
    if (timer) clearInterval(timer)
    mouse_is_down = false;
}
document.getElementById("Warningfinal").addEventListener("mouseleave", mouseupfunction);
document.getElementById("Warningfinal").addEventListener("mouseup",    mouseupfunction);
document.getElementById("Warningfinal").addEventListener("touchend",   mouseupfunction);

//  take care of sosconfirm
var ctx2   = document.getElementById("sosconfirm").getContext("2d");
var start2 = 4.72;
var cw2    = ctx2.canvas.width  = 210;
var ch2    = ctx2.canvas.height = 210;

var diff2;
var sim2 = setInterval(sosSim, 5);

function sosSim() {

    diff2 = ((count / 100) * Math.PI*2*10).toFixed(2);
    ctx2.clearRect(0, 0, cw2, ch2);
    ctx2.lineWidth   = 8;
    ctx2.fillStyle   = "#FFFFFF";
    ctx2.strokeStyle = "#FFFFFF";

    ctx2.beginPath();
    ctx2.arc(cw2/2, ch2/2, cw2/2-55 , start2, diff2/10+start2, false);
    ctx2.stroke();
}
