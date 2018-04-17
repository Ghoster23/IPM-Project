//take care of making the circular progress bar :o
var ctx        = document.getElementById('Loading').getContext('2d');
var percentage = 0;
var start      = 4.72;
var cw         = ctx.canvas.width  = 210;
var ch         = ctx.canvas.height = 210;
var color      = localStorage.getItem("color");

var diff;
var sim = setInterval(progressSim, 25);
var done = false;

//purposelly left empty this function is used to do nothing
function noop() {};

function progressSim() {
    if(done == false){
        diff = ((percentage / 100) * Math.PI*2*10).toFixed(2);
        ctx.clearRect(0, 0, cw, ch);
        ctx.lineWidth   = 56;
        ctx.fillStyle   = "#FFFFFF";
        ctx.strokeStyle = color;

        ctx.font      = "40px sans-serif";
        ctx.textAlign = "center";

        ctx.fillText(percentage+'%', cw*.5+5, ch*.5+15, cw);
        ctx.beginPath();
        ctx.arc(cw/2, ch/2, cw/2-4 , start, diff/10+start, false);
        ctx.stroke();
        if (percentage >= 100) {
            //upon finishing clear canvas and make visible test results
            if(done == false){
                done=true;
                clearTimeout(sim);
            
                ctx.clearRect(0, 0, cw, ch);
                ctx.arc(cw/2, ch/2, cw/2-4 , start, diff/10+start, false);
                ctx.stroke();
                
                testResults();
                document.getElementById('Result').style.visibility = "visible";
                document.getElementById('Result_Text').style.visibility = "visible";
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
            done=null;
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

        //tete de pressao arterial
        case "2":
            randomNumber = getRandomArbitrary(0,190).toFixed(0);
            var pressao2 = getRandomArbitrary(0,120).toFixed(0);
            resultstring = randomNumber.toString() + "/" + pressao2.toString() + "\nmmHg";
            document.getElementById('Result_Text').style.top = "100px";
            if (randomNumber < 120 && pressao2 < 80) { goodResult = true; }
            break;

        //teste de narcoticos
        case "3":
            var narcoticos = ["Nao foram\nencontradas\nsubstâncias", "Cannabis", "Ecstasy", "Heroina", "Cocaina", "Anfetaminas", "LSD"];
            randomNumber = getRandomArbitrary(0,7).toFixed(0);
            switch(randomNumber) {
                case "0":
                case "1":
                    document.getElementById("Result_Text").style.top = "90px";
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

    document.getElementById('Result_Text').textContent = resultstring;
    if (goodResult) {
        document.getElementById("Touch_Screen").style.backgroundColor = "#17BF15";      //green +    thumbs up
    } else {
        document.getElementById("Touch_Screen").style.backgroundColor = "#DE1F26";      //red
        document.getElementById("Symbol").src = "Images/warning.png";                   //warning sign
        document.getElementById("Symbol").style.animation = "pulse 1s ease-in infinite";//add pulsating
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}