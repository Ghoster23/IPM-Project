//this file takes care of everything keyboard related so we can have input anywhere we might want
//window.addEventListener('load', createKeyboard2("Input"));

/*===============================================================
||||||||||||||||| KEYBOARD 1 (QWERTY STYLE) |||||||||||||||||||||||
=================================================================*/

function createKeyboard(inputid){
    if(!sessionStorage.getItem("keyboard")){
        sessionStorage.setItem("keyboard","2");
    }
    functname = "createKeyboard" + sessionStorage.getItem("keyboard");
    window[functname](inputid);
}

//this function is used to make the keyboard
function createKeyboard1(inputid){

    sessionStorage.setItem("keyboard","1");
    sessionStorage.setItem("inputid",inputid);
    //lets make the keyboard
    var keyboard = document.createElement("TABLE");
    keyboard.id  = "Keyboard";
    keyboard.style.position      = "absolute"; 
    keyboard.style.top           = "45%"; 
    keyboard.style.left          = "1%";
    keyboard.style.color         = "white";
    keyboard.style.fontFamily    = "'Open Sans', sans-serif";
    keyboard.style.textDecoration= "none";
    keyboard.style.fontWeight    = "400";
    keyboard.style.textShadow    = "0px 0px 4px #000000";
    keyboard.style.textAlign     = "center";
    keyboard.style.userSelect    = "none";

    var letters = ['q','w','e','r','t','y','u','i','o','p',
                     'a','s','d','f','g','h','j','k','l',
                        'z','x','c','v','b','n','m'];

    //add the 4 rows to the keyboard
    var row1 = document.createElement("TR");
    row1.id = "Row1";
    row1.style.position = "absolute"; 
    row1.style.left     = "0px";
    var row2 = document.createElement("TR");
    row2.id = "Row2";
    row2.style.position = "absolute"; 
    row2.style.left     = "10px";
    row2.style.top      = "28px";
    var row3 = document.createElement("TR");
    row3.id = "Row3";
    row3.style.position = "absolute"; 
    row3.style.left     = "20px";
    row3.style.top      = "56px";
    
    var row4 = document.createElement("TR");
    row4.id = "Row4";

    var len = letters.length;
    for(var i = 0; i < len; i++) {
        var letter = letters[i];
        if(i<10){
            var r = row1.insertCell(i);
        }
        else if(i<19){
            var r = row2.insertCell(i-10);
        }
        else{
            var r = row3.insertCell(i-19);
        }
        r.innerHTML = letters[i]; 
        r.class = "letter";
        r.style.cursor = "pointer";
        r.style.padding = "5.3px";
        r.style.userSelect = "none";
        r.addEventListener('mouseup', keymouseup, false);
    }

    row4.insertCell(0).innerHTML = "<td><img id='Changelayout' src='../../Images/changelayout.png' style='height: 30px; top: 80px; left:58px; position:absolute; cursor:pointer; user-select:none; -webkit-user-drag: none;'></td>";
    row4.insertCell(1).innerHTML = "<td><img id='Spacebar' src='../../Images/spacebar.png' style='height: 30px; top: 80px; left:90px; position:absolute; cursor:pointer; user-select:none;-webkit-user-drag: none; '></td>";
    row4.insertCell(2).innerHTML = "<td><img id='Delete' src='../../Images/delete.png' style='height: 20px; top: 85px; left:125px; position:absolute; cursor:pointer; user-select:none; -webkit-user-drag: none;'></td>";
   
    var backdrop = document.createElement("div");
    backdrop.style.height     ="120px";
    backdrop.style.width      ="210px";
    backdrop.style.background ="#1c2953";
    backdrop.style.position   ="absolute";
    backdrop.style.top        ="49%";
    backdrop.style.left       ="0";
    
    keyboard.appendChild(backdrop);
    keyboard.appendChild(row1);
    keyboard.appendChild(row2);
    keyboard.appendChild(row3);
    keyboard.appendChild(row4);

    keyboard.addEventListener('mouseup',  nokeymouseup, false);
    keyboard.addEventListener('mouseleave',nokeymouseup, false);
    keyboard.addEventListener('touchend', keyfingerup, false);
    
    keyboard.addEventListener('mousedown',keymousedown, false);
    keyboard.addEventListener('touchmove',keyfingermove, false);
    keyboard.addEventListener('mousemove',keymousemove, false);

    //add keyboard to touchscreen
    var touch_screen = document.getElementById("Touch_Screen");
    touch_screen.appendChild(keyboard);

    document.getElementById("Changelayout").addEventListener("mouseup", () =>{
        var popupkey = document.getElementById("Popupkey");
        var popuptext = document.getElementById("Popuptext");
        if(!popupkey){
            createPopupkey(document.getElementById("Changelayout"));
        }
        setTimeout(function() {
            if(popupkey){
                keyboard.removeChild(popupkey);
                keyboard.removeChild(popuptext);  
            }
        }, 200);
        writetoinput("Changelayout");
    });
    document.getElementById("Spacebar").addEventListener("mouseup", () =>{
        var popupkey = document.getElementById("Popupkey");
        var popuptext = document.getElementById("Popuptext");
        if(!popupkey){
            createPopupkey(document.getElementById("Spacebar"));
        }
        setTimeout(function() {
            if(popupkey){
                keyboard.removeChild(popupkey);
                keyboard.removeChild(popuptext);  
            }
        }, 200);
        writetoinput("Spacebar");
    });
    document.getElementById("Delete").addEventListener("mouseup", () =>{
        var popupkey = document.getElementById("Popupkey");
        var popuptext = document.getElementById("Popuptext");
        if(!popupkey){
            createPopupkey(document.getElementById("Delete"));
        }
        setTimeout(function() {
            if(popupkey){
                keyboard.removeChild(popupkey);
                keyboard.removeChild(popuptext);  
            }
        }, 200);
        writetoinput("Delete");
    })
}  

var down = false;
var move = false;

//this function is used to hide the
function removeKeyboard(){
    var touch_screen = document.getElementById("Touch_Screen");
    var keyboard = document.getElementById("Keyboard");
    if(keyboard){
        touch_screen.removeChild(keyboard);
        sessionStorage.removeItem("inputid");
    }
}

//when you stop pressing mouse button on a key
function keymouseup(e){
    var down = false;

    writetoinput(this.textContent)

    //remove popupkey
    var keyboard = document.getElementById("Keyboard");
    var popupkey = document.getElementById("Popupkey");
    var popuptext = document.getElementById("Popuptext");
    if(!popupkey){
        var elem = document.elementFromPoint(e.clientX, e.clientY);
        createPopupkey(elem);
    }
    setTimeout(function() {
        if(popupkey){
            keyboard.removeChild(popupkey);
            keyboard.removeChild(popuptext);  
        }
    }, 200);
    
};

//when you lift finger on a key
function keyfingerup(){
    if(move==false){
        return;
    }
    move = false;
    //remove popupkey
    var keyboard = document.getElementById("Keyboard");
    var popupkey = document.getElementById("Popupkey");
    var popuptext = document.getElementById("Popuptext");
    
    down = false;
    event.stopPropagation();
    var changedTouch = event.changedTouches[0];
    var elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);

    if(!popupkey){
        createPopupkey(elem);
    }
    setTimeout(function() {
        if(popupkey){
            keyboard.removeChild(popupkey);
            keyboard.removeChild(popuptext);  
        }
    }, 200);
    
    if(elem.nodeName != "TD" && elem.nodeName != "IMG"){
        return;
    }
    if(elem.nodeName == "IMG"){
        writetoinput(elem.id)
    }
    else{
        writetoinput(elem.textContent)
    }
}

//when you stop pressing mouse button on a key
function nokeymouseup(){
    down = false;
    //remove popupkey
    var keyboard = document.getElementById("Keyboard");
    var popupkey = document.getElementById("Popupkey");
    var popuptext = document.getElementById("Popuptext");
    setTimeout(function() {
        if(popupkey){
            keyboard.removeChild(popupkey);
            keyboard.removeChild(popuptext);  
        }
    }, 200);
};

//when you hold down mouse button anywhere on keyboard
function keymousedown(){
    down = true;
};

//when you move finger over key
function keyfingermove(){
    move= true;
    down = true;
    var changedTouch = event.changedTouches[0];
    var elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
    if(elem.nodeName != "TD" && elem.nodeName != "IMG"){
        return;
    }
    //add popupkey to touchscreen if it is not already there
    createPopupkey(elem);
}

//when you move mouse (holding button) over key
function keymousemove(e){
    var elem = document.elementFromPoint(e.clientX, e.clientY);
    if(elem.nodeName == "TR"){
        return;
    }
    if(down == true){
        //add popupkey to touchscreen if it is not already there
        createPopupkey(elem);
    }
}

//mess about with the popupkey
function createPopupkey(elem){

    if(elem.nodeName != "TD" && elem.nodeName != "IMG"){
        return;
    }

    var popupkey = document.getElementById("Popupkey");
    var popuptext = document.getElementById("Popuptext");
    
    if(!popupkey){
        
        popupkey = document.createElement("img");
        popupkey.src="../../Images/popupkey.png";
        popupkey.id="Popupkey";
        popupkey.style.height="60px";
        popupkey.style.position="absolute";
        popupkey.style.pointerEvents = "none";
        document.getElementById("Keyboard").appendChild(popupkey);  

        popuptext = document.createElement("span");
        popuptext.id                 = "Popuptext";
        popuptext.style.position     = "absolute";
        popuptext.style.textAlign    = "center";
        popuptext.style.color        = "white"; 
        popuptext.style.fontFamily   = "'Open Sans', sans-serif";
        popuptext.style.fontWeight   = "bold";
        popuptext.style.fontSize     = "14px";
        popuptext.style.userSelect   = "none";
        popuptext.style.pointerEvents= "none";
        document.getElementById("Keyboard").appendChild(popuptext);
    }
    if(elem.nodeName == "IMG"){
        popupkey.src="../../Images/popupkey.png";
        if(elem.parentElement.parentElement.id=="Row4"){  
            switch(elem.id){
                case "Changelayout":         
                    popupkey.style.top = 38 + "px";
                    popupkey.style.left = elem.offsetLeft-18 +"px";

                    popuptext.innerHTML = "&#x2026;";  
                    popuptext.style.top = 45 + "px";
                    popuptext.style.left = elem.offsetLeft-20+25 +"px"; 
                break;
                case "Spacebar":
                    popupkey.style.top = 38 + "px";
                    popupkey.style.left = elem.offsetLeft-18 +"px"; 

                    popuptext.innerHTML = "&#x23B5;";
                    popuptext.style.top = 44 + "px";
                    popuptext.style.left = elem.offsetLeft-10+18 +"px";
                break;
                case "Delete":
                    popupkey.style.top = 38 + "px";
                    popupkey.style.left = elem.offsetLeft-18 +"px";

                    popuptext.innerHTML = "&#8592;"; 
                    popuptext.style.top = 50 + "px";
                    popuptext.style.left = elem.offsetLeft+5 +"px";
                    
                break;
            }     
        }
    }
    else{
        popuptext.textContent = elem.textContent;
        
        switch(sessionStorage.getItem("keyboard")){
            
            case "1":
                popupkey.src="../../Images/popupkey.png";
                switch(elem.parentElement.id){
                    case "Row1":
                        popupkey.style.top = -34 + "px";
                        popupkey.style.left = elem.offsetLeft-20 +"px";
        
                        popuptext.style.top = -34+8 + "px";
                        popuptext.style.left = elem.offsetLeft-20+25 +"px";
                    break;
                    case "Row2":
                        popupkey.style.top = -10 + "px";
                        popupkey.style.left = elem.offsetLeft-10 +"px";
        
                        popuptext.style.top = -10+8 + "px";
                        popuptext.style.left = elem.offsetLeft-10+25 +"px";
                    break;
                    case "Row3":
                        popupkey.style.top = 18 + "px";
                        popupkey.style.left = elem.offsetLeft +"px";
        
                        popuptext.style.top = 18+8 + "px";
                        popuptext.style.left = elem.offsetLeft+25 +"px";
                    break;
                    default:
                    break;
                }
            break;

            case "2":
                popupkey.src="../../Images/popupkey2.png";
                switch(elem.parentElement.id){
                    case "Row1":
                        popupkey.style.top = -34 + "px";
                        popupkey.style.left = elem.offsetLeft+24 +"px";
        
                        popuptext.style.top = -34+8 + "px";
                        popuptext.style.left = elem.offsetLeft+15+25 +"px";
                    break;
                    case "Row2":
                        popupkey.style.top = -10 + "px";
                        popupkey.style.left = elem.offsetLeft-10+28 +"px";
        
                        popuptext.style.top = -10+8 + "px";
                        popuptext.style.left = elem.offsetLeft-10+42 +"px";
                    break;
                    case "Row3":
                        popupkey.style.top = 18 + "px";
                        popupkey.style.left = elem.offsetLeft +25+"px";
        
                        popuptext.style.top = 18+8 + "px";
                        popuptext.style.left = elem.offsetLeft+38 +"px";
                    break;
                    default:
                    break;
                }

            break;
        }
    } 
}

/*===============================================================
||||||||||||||||||| KEYBOARD 2 (T9 STYLE) |||||||||||||||||||||||
=================================================================*/

//this function is used to make the keyboard
function createKeyboard2(inputid){
 
    sessionStorage.setItem("keyboard","2");
    sessionStorage.setItem("inputid",inputid);
    //lets make the keyboard
    var keyboard = document.createElement("TABLE");
    keyboard.id  = "Keyboard";
    keyboard.style.position      = "absolute"; 
    keyboard.style.top           = "45%"; 
    keyboard.style.left          = "1%";
    keyboard.style.color         = "white";
    keyboard.style.fontFamily    = "'Open Sans', sans-serif";
    keyboard.style.textDecoration= "none";
    keyboard.style.fontWeight    = "400";
    keyboard.style.textShadow    = "0px 0px 4px #000000";
    keyboard.style.textAlign     = "center";
    keyboard.style.userSelect    = "none";

    var letters = ['.,?!','ABC','DEF',
                   'GHI','JKL','MNO',
                   'PQRS','TUV','WXYZ'];

    //add the 4 rows to the keyboard
    var row1 = document.createElement("TR");
    row1.id = "Row1";
    row1.style.position = "absolute"; 
    row1.style.left     = "30px";
    row1.style.webkitBorderHorizontalSpacing = "10px";
    var row2 = document.createElement("TR");
    row2.id = "Row2";
    row2.style.position = "absolute"; 
    row2.style.left     = "26px";
    row2.style.top      = "28px";
    row2.style.webkitBorderHorizontalSpacing = "9px";
    var row3 = document.createElement("TR");
    row3.id = "Row3";
    row3.style.position = "absolute"; 
    row3.style.left     = "25px";
    row3.style.top      = "56px";
    row3.style.webkitBorderHorizontalSpacing = "0px";
    
    var row4 = document.createElement("TR");
    row4.id = "Row4";

    var len = letters.length;
    for(var i = 0; i < len; i++) {
        var letter = letters[i];
        if(i<3){
            var r = row1.insertCell(i);
        }
        else if(i<6){
            var r = row2.insertCell(i-3);
        }
        else{
            var r = row3.insertCell(i-6);
        }
        r.innerHTML = letters[i]; 
        r.class = "letter";
        r.style.cursor = "pointer";
        r.style.padding = "5.3px";
        r.style.userSelect = "none";
        r.addEventListener('mouseup', keymouseup, false);
    }

    row4.insertCell(0).innerHTML = "<td><img id='Changelayout' src='../../Images/changelayout.png' style='height: 30px; top: 80px; left:58px; position:absolute; cursor:pointer; user-select:none; -webkit-user-drag: none;'></td>";
    row4.insertCell(1).innerHTML = "<td><img id='Spacebar' src='../../Images/spacebar.png' style='height: 30px; top: 80px; left:90px; position:absolute; cursor:pointer; user-select:none;-webkit-user-drag: none; '></td>";
    row4.insertCell(2).innerHTML = "<td><img id='Delete' src='../../Images/delete.png' style='height: 20px; top: 85px; left:125px; position:absolute; cursor:pointer; user-select:none; -webkit-user-drag: none;'></td>";
   
    var backdrop = document.createElement("div");
    backdrop.style.height     ="120px";
    backdrop.style.width      ="210px";
    backdrop.style.background ="#1c2953";
    backdrop.style.position   ="absolute";
    backdrop.style.top        ="49%";
    backdrop.style.left       ="0";
    
    keyboard.appendChild(backdrop);
    keyboard.appendChild(row1);
    keyboard.appendChild(row2);
    keyboard.appendChild(row3);
    keyboard.appendChild(row4);

    keyboard.addEventListener('mouseup',  nokeymouseup, false);
    keyboard.addEventListener('mouseleave',nokeymouseup, false);
    keyboard.addEventListener('touchend', keyfingerup, false);
    
    keyboard.addEventListener('mousedown',keymousedown, false);
    keyboard.addEventListener('touchmove',keyfingermove, false);
    keyboard.addEventListener('mousemove',keymousemove, false);

    //add keyboard to touchscreen
    var touch_screen = document.getElementById("Touch_Screen");
    touch_screen.appendChild(keyboard);

    document.getElementById("Changelayout").addEventListener("mouseup", () =>{
        var popupkey = document.getElementById("Popupkey");
        var popuptext = document.getElementById("Popuptext");
        if(!popupkey){
            createPopupkey(document.getElementById("Changelayout"));
        }
        setTimeout(function() {
            if(popupkey){
                keyboard.removeChild(popupkey);
                keyboard.removeChild(popuptext);  
            }
        }, 200);
        writetoinput("Changelayout");
    });
    document.getElementById("Spacebar").addEventListener("mouseup", () =>{
        var popupkey = document.getElementById("Popupkey");
        var popuptext = document.getElementById("Popuptext");
        if(!popupkey){
            createPopupkey(document.getElementById("Spacebar"));
        }
        setTimeout(function() {
            if(popupkey){
                keyboard.removeChild(popupkey);
                keyboard.removeChild(popuptext);  
            }
        }, 200);
        writetoinput("Spacebar");
    });
    document.getElementById("Delete").addEventListener("mouseup", () =>{
        var popupkey = document.getElementById("Popupkey");
        var popuptext = document.getElementById("Popuptext");
        if(!popupkey){
            createPopupkey(document.getElementById("Delete"));
        }
        setTimeout(function() {
            if(popupkey){
                keyboard.removeChild(popupkey);
                keyboard.removeChild(popuptext);  
            }
        }, 200);
        writetoinput("Delete");
    })
}  

var down = false;
var letterindex = 0;
var keyflag = false;
var keytimer = null;
var key  ="";

function writetoinput(value){

    inputid = sessionStorage.getItem("inputid");
    input = document.getElementById(inputid);

    switch(value){
        case "Spacebar":
            input.value += " ";
        break;

        case "Delete":
            input.value = input.value.slice(0, -1);
        break;

        case "Changelayout":
        
        break;

        case ".,?":
            input.value +=".";
        break;

        case '.,?!':
        case 'ABC':
        case 'DEF':
        case 'GHI':
        case 'JKL':
        case 'MNO':
        case 'PQRS':
        case 'TUV':
        case 'WXYZ':
        case "ABC":
            t9key(value);
        break;

        default:
            input.value += value;
        break;
    }
}

function t9key(value){
    if(value != key){
        window.clearTimeout(keytimer);
        keyflag = false;
    }
    if(keyflag==true){
        input.value = input.value.slice(0, -1);
        input.value +=value.charAt(letterindex);
    }
    else{
        key = value;
        letterindex = 0;
        input.value +=value.charAt(letterindex);
        keyflag = true; 
    }
   //cycle through letters
   if(letterindex<value.length-1){ letterindex += 1; }
   else{ letterindex = 0; }

    window.clearTimeout(keytimer);
    keytimer = setTimeout(function() {
        keyflag = false;
    }, 2000);
}