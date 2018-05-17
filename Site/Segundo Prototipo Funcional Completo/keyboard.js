/*===============================================================
||||||||||||||||| KEYBOARD 1 (QWERTY STYLE) |||||||||||||||||||||||
=================================================================*/

function createKeyboard(inputid){       
    if(!sessionStorage.getItem("keyboard")){
        sessionStorage.setItem("keyboard","2");
    }
    if(lowercase==true){
        var lcase = "";
    }else{
        var lcase = "uc";
    }
    if(nums == true){
        lcase = "nums";
    }

    functname = "createKeyboard" + sessionStorage.getItem("keyboard") + lcase ;
    window[functname](inputid);

    keyboard = document.getElementById("Keyboard");

    var changekeys = document.createElement("img");
    if(nums == false){
        changekeys.src = "../../Images/123.png";
    }
    else{
        changekeys.src = "../../Images/abc.png"; 
    }
    changekeys.style.height="25px";
    changekeys.style.top="-32px";
    changekeys.style.left="16px";
    changekeys.style.cursor = "pointer";
    changekeys.id = "Changekeys";
    changekeys.style.position="absolute";
    changekeys.addEventListener('mouseup', ()=>{
        if(nums == true){
            nums = false;
            changekeys.src = "../../Images/123.png";
            removeKeyboard();
            lowercase = true;
            createKeyboard(inputid);
        }
        else{
            nums = true;
            changekeys.src = "../../Images/abc.png"; 
            removeKeyboard();
            lowercase = true;
            createKeyboard(inputid);
        }
        
    }, false);

    var changekeyboard = document.createElement("img");
    changekeyboard.src = "../../Images/keyboard.png";
    changekeyboard.style.height="25px";
    changekeyboard.style.top="-32px";
    changekeyboard.style.left="165px";
    changekeyboard.style.cursor = "pointer";
    changekeyboard.id = "Changekeyboard";
    changekeyboard.style.position="absolute";
    changekeyboard.addEventListener('mouseup', ()=>{
        changekeyboard.src = "../../Images/abc.png";
        removeKeyboard();
        lowercase = true;
        nums = false;
        if(sessionStorage.getItem("keyboard")=="1"){
            sessionStorage.setItem("keyboard","2");
        }else{
            sessionStorage.setItem("keyboard","1");
        }
        createKeyboard(inputid);
    }, false);

    keyboard.appendChild(changekeys);
    keyboard.appendChild(changekeyboard);
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
    row2.style.left     = "16px";
    row2.style.top      = "28px";
    var row3 = document.createElement("TR");
    row3.id = "Row3";
    row3.style.position = "absolute"; 
    row3.style.left     = "28px";
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

    row4.insertCell(0).innerHTML = "<td><img id='Shift' src='../../Images/shift1.png' style='height: 20px; top: 85px; left:64px; position:absolute; cursor:pointer; user-select:none; -webkit-user-drag: none;'></td>";
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

    document.getElementById("Shift").addEventListener("mouseup", () =>{
        var popupkey = document.getElementById("Popupkey");
        var popuptext = document.getElementById("Popuptext");
        if(!popupkey){
            createPopupkey(document.getElementById("Shift"));
        }
        setTimeout(function() {
            if(popupkey){
                keyboard.removeChild(popupkey);
                keyboard.removeChild(popuptext);  
            }
            removeKeyboard();
            lowercase = false;
            createKeyboard(inputid);
        }, 200);
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

function createKeyboard1uc(inputid){

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

    var letters = ['Q','W','E','R','T','Y','U','I','O','P',
                     'A','S','D','F','G','H','J','K','L',
                        'Z','X','C','V','B','N','M'];

    //add the 4 rows to the keyboard
    var row1 = document.createElement("TR");
    row1.id = "Row1";
    row1.style.position = "absolute"; 
    row1.style.left     = "0px";
    row1.style.top      = "3px";
    var row2 = document.createElement("TR");
    row2.id = "Row2";
    row2.style.position = "absolute"; 
    row2.style.left     = "14px";
    row2.style.top      = "30px";
    var row3 = document.createElement("TR");
    row3.id = "Row3";
    row3.style.position = "absolute"; 
    row3.style.left     = "28px";
    row3.style.top      = "59px";
    
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
        r.style.padding = "3.8px";
        r.style.userSelect = "none";
        r.addEventListener('mouseup', keymouseup, false);
    }

    row4.insertCell(0).innerHTML = "<td><img id='Shift' src='../../Images/shift1.png' style='height: 20px; top: 85px; left:64px; position:absolute; cursor:pointer; user-select:none; -webkit-user-drag: none;'></td>";
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

    document.getElementById("Shift").addEventListener("mouseup", () =>{
        var popupkey = document.getElementById("Popupkey");
        var popuptext = document.getElementById("Popuptext");
        if(!popupkey){
            createPopupkey(document.getElementById("Shift"));
        }
        setTimeout(function() {
            if(popupkey){
                keyboard.removeChild(popupkey);
                keyboard.removeChild(popuptext);  
            }
            removeKeyboard();
            lowercase = true;
            createKeyboard(inputid);
        }, 200);
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

function createKeyboard1nums(inputid){

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

    var letters = ['1','2','3','4','5','6','7','8','9','0',
                     '.',',',':',';','-','!','?','~','^',
                     '\xB4','\x60','+','-','(',')','#'];

    //add the 4 rows to the keyboard
    var row1 = document.createElement("TR");
    row1.id = "Row1";
    row1.style.position = "absolute"; 
    row1.style.left     = "0px";
    row1.style.top      = "3px";
    var row2 = document.createElement("TR");
    row2.id = "Row2";
    row2.style.position = "absolute"; 
    row2.style.left     = "14px";
    row2.style.top      = "30px";
    var row3 = document.createElement("TR");
    row3.id = "Row3";
    row3.style.position = "absolute"; 
    row3.style.left     = "28px";
    row3.style.top      = "59px";
    
    var row4 = document.createElement("TR");
    row4.id = "Row4";

    var len = letters.length;
    for(var i = 0; i < len; i++) {
        var letter = letters[i];
        if(i<10){
            var r = row1.insertCell(i);
            r.style.padding = "4.5px";
        }
        else if(i<19){
            var r = row2.insertCell(i-10);
            r.style.padding = "6px";
        }
        else{
            var r = row3.insertCell(i-19);
            r.style.padding = "6px";
        }
        r.innerHTML = letters[i]; 
        r.class = "letter";
        r.style.cursor = "pointer";
        r.style.userSelect = "none";
        r.addEventListener('mouseup', keymouseup, false);
    }

    row4.insertCell(0).innerHTML = "<td><img id='Shift' src='../../Images/shift1.png' style='height: 20px; top: 85px; left:64px; position:absolute; cursor:pointer; user-select:none; -webkit-user-drag: none;'></td>";
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

    document.getElementById("Shift").addEventListener("mouseup", () =>{
        var popupkey = document.getElementById("Popupkey");
        var popuptext = document.getElementById("Popuptext");
        if(!popupkey){
            createPopupkey(document.getElementById("Shift"));
        }
        setTimeout(function() {
            if(popupkey){
                keyboard.removeChild(popupkey);
                keyboard.removeChild(popuptext);  
            }
            removeKeyboard();
            lowercase = true;
            createKeyboard(inputid);
        }, 200);
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

    if(elem.nodeName != "TD" && elem.nodeName != "IMG" && !(elem.nodeName == "SPAN" && elem.id=="zero")){
        return;
    }
    //blacklist
    if(elem.id == "Changekeyboard" || elem.id == "Changekeys" ){
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
    if(elem.nodeName == "SPAN"){
        if(elem.id=="zero"){        
            popupkey.style.top = 38 + "px";
            popupkey.style.left = elem.offsetLeft-25 +"px";

            popuptext.innerHTML = "0";  
            popuptext.style.top = 45 + "px";
            popuptext.style.left = elem.offsetLeft-20+18 +"px"; 
        }
    }
    else if(elem.nodeName == "IMG"){
        popupkey.src="../../Images/popupkey.png";
        if(elem.parentElement.parentElement.id=="Row4"){  
            switch(elem.id){
                case "Shift":         
                    popupkey.style.top = 38 + "px";
                    popupkey.style.left = elem.offsetLeft-20 +"px";

                    popuptext.innerHTML = "&#8593;";  
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
                case "zero":
                    popupkey.style.top = 38 + "px";
                    popupkey.style.left = elem.offsetLeft +"px";

                    popuptext.innerHTML = "0"; 
                    popuptext.style.top = 50 + "px";
                    popuptext.style.left = elem.offsetLeft+"px";
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
                        popupkey.style.left = elem.offsetLeft-10+6 +"px";
        
                        popuptext.style.top = -10+8 + "px";
                        popuptext.style.left = elem.offsetLeft-10+25+6 +"px";
                    break;
                    case "Row3":
                        popupkey.style.top = 18 + "px";
                        popupkey.style.left = elem.offsetLeft+10 +"px";
        
                        popuptext.style.top = 18+8 + "px";
                        popuptext.style.left = elem.offsetLeft+25+10 +"px";
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
                if(lowercase == true){
                    popupkey.style.left = popupkey.offsetLeft-14 + "px";
                    popuptext.style.left = popuptext.offsetLeft-14 + "px";
                }
                if(nums == true){
                    popupkey.src="../../Images/popupkey.png";
                    popupkey.style.left = popupkey.offsetLeft-14 + "px";
                    popuptext.style.left = popuptext.offsetLeft-5+ "px";
                    if(elem.parentElement.id=="Row2"){
                        popupkey.style.left = popupkey.offsetLeft +5+"px";
                        popuptext.style.left = popuptext.offsetLeft +5+ "px";
                    }
                }
                
            break;
        }
    } 
}

/*===============================================================
||||||||||||||||||| KEYBOARD 2 (T9 STYLE) |||||||||||||||||||||||
=================================================================*/

//this function is used to make the keyboard
function createKeyboard2uc(inputid){
 
    sessionStorage.setItem("keyboard","2");
    sessionStorage.setItem("inputid",inputid);
    //lets make the keyboard
    var keyboard = document.createElement("TABLE");
    keyboard.id                  = "Keyboard";
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

    var letters = [':;/','ABC','DEF',
                   'GHI','JKL','MNO',
                   'PQRS','TUV','WXYZ'];

    //add the 4 rows to the keyboard
    var row1 = document.createElement("TR");
    row1.id = "Row1";
    row1.style.position = "absolute"; 
    row1.style.left     = "36px";
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

    row4.insertCell(0).innerHTML = "<td><img id='Shift' src='../../Images/shift2.png' style='height: 20px; top: 85px; left:64px; position:absolute; cursor:pointer; user-select:none; -webkit-user-drag: none;'></td>";
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

    document.getElementById("Shift").addEventListener("mouseup", () =>{
        var popupkey = document.getElementById("Popupkey");
        var popuptext = document.getElementById("Popuptext");
        if(!popupkey){
            createPopupkey(document.getElementById("Shift"));
        }
        setTimeout(function() {
            if(popupkey){
                keyboard.removeChild(popupkey);
                keyboard.removeChild(popuptext);  
            }
            removeKeyboard();
            lowercase = true;
            createKeyboard(inputid);
        }, 200);
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

function createKeyboard2(inputid){
 
    sessionStorage.setItem("keyboard","2");
    sessionStorage.setItem("inputid",inputid);
    //lets make the keyboard
    var keyboard = document.createElement("TABLE");
    keyboard.id                  = "Keyboard";
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

    var letters = ['.,?!','abc','def',
                   'ghi','jkl','mno',
                   'pqrs','tuv','wxyz'];

    //add the 4 rows to the keyboard
    var row1 = document.createElement("TR");
    row1.id = "Row1";
    row1.style.position = "absolute"; 
    row1.style.left     = "21px";
    row1.style.webkitBorderHorizontalSpacing = "15px";
    var row2 = document.createElement("TR");
    row2.id = "Row2";
    row2.style.position = "absolute"; 
    row2.style.left     = "20px";
    row2.style.top      = "28px";
    row2.style.webkitBorderHorizontalSpacing = "18px";
    var row3 = document.createElement("TR");
    row3.id = "Row3";
    row3.style.position = "absolute"; 
    row3.style.left     = "21px";
    row3.style.top      = "56px";
    row3.style.webkitBorderHorizontalSpacing = "12px";
    
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

    row4.insertCell(0).innerHTML = "<td><img id='Shift' src='../../Images/shift1.png' style='height: 20px; top: 85px; left:64px; position:absolute; cursor:pointer; user-select:none; -webkit-user-drag: none;'></td>";
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

    document.getElementById("Shift").addEventListener("mouseup", () =>{
        var popupkey = document.getElementById("Popupkey");
        var popuptext = document.getElementById("Popuptext");
        if(!popupkey){
            createPopupkey(document.getElementById("Shift"));
        }
        setTimeout(function() {
            if(popupkey){
                keyboard.removeChild(popupkey);
                keyboard.removeChild(popuptext);  
            }
            removeKeyboard();
            lowercase = false;
            createKeyboard(inputid);
        }, 200);
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

function createKeyboard2nums(inputid){
 
    sessionStorage.setItem("keyboard","2");
    sessionStorage.setItem("inputid",inputid);
    //lets make the keyboard
    var keyboard = document.createElement("TABLE");
    keyboard.id                  = "Keyboard";
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

    var letters = ['1','2','3',
                   '4','5','6',
                   '7','8','9'];

    //add the 4 rows to the keyboard
    var row1 = document.createElement("TR");
    row1.id = "Row1";
    row1.style.position = "absolute"; 
    row1.style.left     = "15px";
    row1.style.webkitBorderHorizontalSpacing = "30px";
    var row2 = document.createElement("TR");
    row2.id = "Row2";
    row2.style.position = "absolute"; 
    row2.style.left     = "15px";
    row2.style.top      = "28px";
    row2.style.webkitBorderHorizontalSpacing = "30px";
    var row3 = document.createElement("TR");
    row3.id = "Row3";
    row3.style.position = "absolute"; 
    row3.style.left     = "15px";
    row3.style.top      = "56px";
    row3.style.webkitBorderHorizontalSpacing = "30px";
    
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

    row4.insertCell(0).innerHTML = "<td><img id='Spacebar' src='../../Images/spacebar.png' style='height: 30px; top: 80px; left:61px; position:absolute; cursor:pointer; user-select:none;-webkit-user-drag: none; '></td>";
    row4.insertCell(1).innerHTML = "<span id = 'zero' style='height: 20px; top: 86px; left:99px; position:absolute; cursor:pointer; user-select:none; -webkit-user-drag: none;'>0</span>";
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
    document.getElementById("zero").addEventListener("mouseup", () =>{
        var popupkey = document.getElementById("Popupkey");
        var popuptext = document.getElementById("Popuptext");
        if(!popupkey){
            createPopupkey(document.getElementById("zero"));
        }
        setTimeout(function() {
            if(popupkey){
                keyboard.removeChild(popupkey);
                keyboard.removeChild(popuptext);  
            }
        }, 200);
        writetoinput("0");
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

var down        = false;
var letterindex = 0;
var keyflag     = false;
var keytimer    = null;
var key         = "";
var lowercase   = true;
var nums        = false; 

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

        case "Shift":
        break;

        case '+-*;':
        case 'ABC':
            t9key('ABC'+'\xC0'+'\xC1'+'\xC2'+'\xC3'+'\xC7');
            break;
        case 'DEF':
            t9key('DEF'+'\xC8'+'\xC9'+'\xCA');
            break;
        case 'GHI':
            t9key('GHI'+'\xCC'+'\xCD'+'\xCE');
            break;
        case 'MNO':
            t9key('MNO'+'\xD2'+'\xD3'+'\xD4'+'\xD5');
            break;
        case 'TUV':
            t9key('TUV'+'\xD9'+'\xDA'+'\xDB');
            break;
        case 'PQRS':
        case 'JKL':
        case 'WXYZ':
        case '.,?!':
            t9key(value);
        break;
        case 'abc':
            t9key('abc'+'\xE0'+'\xE1'+'\xE2'+'\xE3'+'\xE7');
            break;
        case 'def':
            t9key('def'+'\xE8'+'\xE9'+'\xEA');
            break;
        case 'ghi':
            t9key('ghi'+'\xEC'+'\xED'+'\xEE');
            break;
        case 'mno':
            t9key('mno'+'\xF2'+'\xF3'+'\xF4'+'\xF5');
            break;
        case 'tuv':
            t9key('tuv'+'\xF9'+'\xFA'+'\xFB');
            break;
        case 'jkl':
        case 'pqrs':
        case 'wxyz':
            t9key(value);
        break;

        default:
            switch(input.value.slice(-1)){
                case "~":
                    input.value = input.value.slice(0, -1);
                    switch(value){
                        case "a":
                            value = "\xE3";
                        break;
                        case "A":
                            value = "\xC3";
                        break;
                        case "o":
                            value = "\xF5";
                        break;
                        case "O":
                            value = "\xD5";
                        break;
                    }
                break;
                case "^":
                    input.value = input.value.slice(0, -1);
                    switch(value){
                        case "a":
                        value = "\xE2";
                        break;
                        case "A":
                            value = "\xC2";
                        break;
                        case "e":
                            value = "\xEA";
                        break;
                        case "E":
                            value = "\xCA";
                        break;
                        case "i":
                            value = "\xEE";
                        break;
                        case "I":
                            value = "\xCE";
                        break;
                        case "o":
                            value = "\xF4";
                        break;
                        case "O":
                            value = "\xD4";
                        case "u":
                            value = "\xFB";
                        break;
                        case "U":
                            value = "\xDB";
                        break;
                    }
                case "\xB4":
                    input.value = input.value.slice(0, -1);
                    switch(value){
                        case "a":
                        value = "\xE1";
                        break;
                        case "A":
                        value = "\xC1";
                        break;
                        case "e":
                        value = "\xE9";
                        break;
                        case "E":
                        value = "\xC9";
                        break;
                        case "i":
                        value = "\xED";
                        break;
                        case "I":
                        value = "\xCD";
                        break;
                        case "o":
                        value = "\xF3";
                        break;
                        case "O":
                        value = "\xD3";
                        case "u":
                        value = "\xFA";
                        break;
                        case "U":
                        value = "\xDA";
                        break;
                    }
                break;
                case "\x60":
                    input.value = input.value.slice(0, -1);
                    switch(value){
                        case "a":
                        value = "\xE0";
                        break;
                        case "A":
                        value = "\xC0";
                        break;
                        case "e":
                        value = "\xE8";
                        break;
                        case "E":
                        value = "\xC8";
                        break;
                        case "i":
                        value = "\xEC";
                        break;
                        case "I":
                        value = "\xCC";
                        break;
                        case "o":
                        value = "\xF2";
                        break;
                        case "O":
                        value = "\xD2";
                        case "u":
                        value = "\xF9";
                        break;
                        case "U":
                        value = "D9";
                        break;
                    }
                break;
            }
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
   else{ 
        letterindex = 0;
    }

    window.clearTimeout(keytimer);
    keytimer = setTimeout(function() {
        keyflag = false;
    }, 1000);
}