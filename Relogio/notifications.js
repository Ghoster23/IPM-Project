window.addEventListener('load', loadAlerts);
window.addEventListener('unload', updateAlerts);
//run this function to set a new alert 
function setAlert(name,text,functionName,timeStep){
  var alerts = sessionStorage.getItem("alerts");
  //if array does not exist create it else just parse it
  if(!alerts){
    alerts=[];
  }
  else{
    alerts = JSON.parse(alerts);
  }

  var notif = {};
  notif.name     = name;                                                       //name of person that sent                                               //function to run when clicked
  notif.text     = text;                                                       //notification text 
  notif.function = functionName;                                               //function that will be called upon clicking
  notif.timeStep = timeStep;                                                   //amount of time to wait 
  notif.timer    = setTimeout(ExecuteNotification,notif.timeStep,notif.name);  //timer
  notif.inittime = (new Date()).getTime();                                     //time the alarm was set

  //place notif in notification array
  alerts.push(notif);
  
  //update notification vector
  sessionStorage.setItem("alerts",JSON.stringify(alerts));

}

//run this function onunload
function updateAlerts(){

  var alerts = sessionStorage.getItem("alerts");
  //if array does exists parse it
  if(alerts){
    alerts = JSON.parse(alerts);

    var newalerts = [];
    var len = alerts.length;
    for (var i = 0; i < len; i++) {
      //if this funcion was called it is because page was changed and so we need to update timers
      var notif = alerts[i];
      var newtime = notif.timeStep - ( (new Date()).getTime() - notif.inittime);
      //update
      notif.timeStep = newtime;       
      //replace
      newalerts.push(notif); 
    }
    //update notification vector
    sessionStorage.setItem("alerts",JSON.stringify(newalerts));
  }
}

/*run this function on load*/
function loadAlerts(){

  var alerts = sessionStorage.getItem("alerts");
  //if array does not exist create it else just parse it
  if(alerts){
    alerts = JSON.parse(alerts);

    var newalerts = [];
    var len = alerts.length;
    for (var i = 0; i < len; i++) {
      var notif = alerts[i];
    
      if(notif){
        notif.timer    = setTimeout(ExecuteNotification,notif.timeStep,notif.name);  //timer
        notif.inittime = (new Date()).getTime();                                     //time the alarm was set
        //place notif in notification array
        newalerts.push(notif);
      }
    }

    //update notification vector
    sessionStorage.setItem("alerts",JSON.stringify(newalerts));
  }

  var notifications = sessionStorage.getItem("notifications");
  if(notifications){
    createFloater();
    createminifloaters();
  }
  else{
    var floater = document.getElementById("Floater");
    if(floater){
      var touch_screen = document.getElementById("Clock");
      touch_screen.removeChild(floater);
    }
  }
}

  
/*function called by alert*/ 
function ExecuteNotification(targetname){

  var dir = window.location.pathname;
  var dirname = dir.substring(dir.lastIndexOf("/")+1,dir.length);

  if(sessionStorage.getItem("Deleted")=="true"){
    sessionStorage.setItem("Deleted","false");
    createFloater();
    createminifloaters();
  }

  var alerts = sessionStorage.getItem("alerts");
  //if array does exists parse it
  if(alerts){
    alerts = JSON.parse(alerts);

    var len = alerts.length;
    for (var i = 0; i < len; i++) {
      var notif = alerts[i];
      //if this is the notification that came to conclusion remove it
      if(targetname == notif.name){
        alerts.splice(i,1);
        //check if the alert was of type message and if you are already in the chat dont make a notif
        if(notif.function == "go2conversation" && 
           dirname == "Chat.html" && 
           sessionStorage.getItem("friend") == notif.name){

          location.reload();
        }
        else{
          addNotification(notif);
        }
        break;
      }
    }
    //update alert vector
    if(alerts.length<=0){
      sessionStorage.removeItem("alerts");
    }else{
      sessionStorage.setItem("alerts",JSON.stringify(alerts));
    }
  }
};

function addNotification(notif){
  var notifications = sessionStorage.getItem("notifications");
  //if array does not exist create it else just parse it
  if(!notifications){
    notifications=[];
  }
  else{
    notifications = JSON.parse(notifications);
  }

  var newnotif = {};
  newnotif.name     = notif.name;           //name of person that sent                                            
  newnotif.text     = notif.text;           //notification text 
  newnotif.function = notif.function;       //function to run when clicked

  //place notif in notification array
  notifications.push(newnotif);
  
  //update notification vector
  sessionStorage.setItem("notifications",JSON.stringify(notifications));
  
  if(notifications.length == 1){
    sessionStorage.setItem("Deleted","false");
    createFloater();
    createminifloaters();
  }
  else{
    var floater = document.getElementById("Floater");
    if(floater){
      floater.style.animation = "boing 300ms ease-in-out";
      setTimeout(function() {
        floater.style.animation = "";
      }, 1000);
    }
    var counter  = document.getElementById("Counter");
    if(counter){
      counter.innerHTML        = notifications.length;
      createminifloaters();
    }
  }

  var dir = window.location.pathname;
  var dirname = dir.substring(dir.lastIndexOf("/")+1,dir.length);

  if( dirname == "NotificationMenu.html"){
    //lets add that new notification to this menu
  
    var element1 = "<th> <div class='iconApp' style='background:";
    var element2 = ";' draggable='false'> <span id ='notText'>";
    var element3 = "</span>";

    var notifications = JSON.parse(sessionStorage.getItem("notifications"));
    var contact_Table = document.getElementById("Table");

    switch(newnotif.function){
      case "NavigateToFriend":
        var backcolor = "#8d23c2";
      break;
      case "go2conversation":
        var backcolor = "#2bade0";
      break;
    }

    var body = contact_Table.tBodies[0];
    var rows = body.rows;
    
    // pick the last and prepend
    rows[rows.length - 1].insertAdjacentHTML('beforebegin', element1 + backcolor + element2 + notif.text + element3);
    anchors.push(i*138+10);
  }
}
         
function removeNotification(i){
 
  var notifications = sessionStorage.getItem("notifications");
  //if array does not exist create it else just parse it
  if(notifications){
    notifications = JSON.parse(notifications);

    //remove it
    notifications.splice(i,1);
      
    if(notifications.length<=0){
      sessionStorage.removeItem("notifications");
    }else{
      sessionStorage.setItem("notifications",JSON.stringify(notifications));
    }
  }
}

function createFloater(){
  if(sessionStorage.getItem("Deleted")=="true"){
    return;
  }

  var dir = window.location.pathname;
  var dirname = dir.substring(dir.lastIndexOf("/")+1,dir.length);

  if( dirname == "NotificationMenu.html"){
    return;
  }
  var counter      = document.createElement("span");
  var floater      = document.createElement("div");

  counter.id       = "Counter";

  floater.id       = "Floater";
  floater.className= "Floater";

  floater.style.position = "absolute";
  floater.style.height   = "45px";
  floater.style.cursor   = "pointer";
  floater.style.left     = "136px";
  floater.style.top      = "24px";

  var notifications = JSON.parse(sessionStorage.getItem("notifications"));


  counter.innerHTML          = notifications.length;
  
  counter.style.position     = "absolute";
  counter.style.textAlign    = "center";
  counter.style.color        = "#8d23c2"; 
  counter.style.fontFamily   = "'Open Sans', sans-serif";
  counter.style.fontWeight   = "bold";
  counter.style.fontSize     = "14px";
  counter.style.userSelect   = "none";
  counter.style.pointerEvents= "none";

  var floatercoords = sessionStorage.getItem("Floatercoords");
  if(floatercoords){
    floatercoords=JSON.parse(floatercoords);
    floater.style.left    = floatercoords[0];
    floater.style.top     = floatercoords[1];
  }

  counter.style.left    = parseInt(floater.style.left,10)+20 +"px";
  counter.style.top     = parseInt(floater.style.top,10)+16  +"px";
  
  var touch_screen = document.getElementById("Clock");
  touch_screen.insertBefore(floater,document.getElementById("Bezel"));
  touch_screen.insertBefore(counter,document.getElementById("Bezel"));

  floater = document.querySelector("#Floater");
    
  floater.addEventListener("mousedown", notifdown);
  floater.addEventListener("touchstart", notifdown);

  function notifdown(e){
    floater.style.transition = "";
    counter.style.transition = "";
    down = true;
    x_ = e.clientX;
    y_ = e.clientY;
  }

  floater.addEventListener("mousemove", (e) => {
    if (!down) return;
    
    var trash=document.getElementById("Trash");
    if(!trash){
      createTrash();
    }
 
    window.setTimeout(() =>{
      movefloater = true;
    },100);

    e.preventDefault();
    
    newx = x_ - e.clientX;
    newy = y_ - e.clientY;
    x_ = e.clientX;
    y_ = e.clientY;
    
    var floater = document.getElementById("Floater");

    if(distfloater(85,95,floater.offsetLeft - newx,floater.offsetTop - newy)>=95){
      //do nada
    }else{
      floater.style.top = (floater.offsetTop - newy) + "px";
      floater.style.left = (floater.offsetLeft - newx) + "px";
    }

    var coords = [floater.style.left,floater.style.top];
    sessionStorage.setItem("Floatercoords",JSON.stringify(coords));
 
    var counter  = document.getElementById("Counter");
    counter.style.left    = parseInt(floater.style.left,10)+20 +"px";
    counter.style.top     = parseInt(floater.style.top,10)+16 +"px";

  });

  floater.addEventListener("touchmove", notifmove);

  function notifmove(e){
    if (!down) return;

    var trash=document.getElementById("Trash");
    if(!trash){
      createTrash();
    }
    
    window.setTimeout(() =>{
      movefloater = true;
    },100);

    e.preventDefault();
  
    var mousex = e.clientY || e.targetTouches[0].pageX;
    var mousey = e.clientY || e.targetTouches[0].pageY;

    newx = x_ - mousex;
    newy = y_ - mousey;
    x_ = mousex
    y_ = mousey;
    
    var floater = document.getElementById("Floater");

    if(distfloater(85,95,floater.offsetLeft - newx,floater.offsetTop - newy)>=95){
      //do nada
    }else{
      floater.style.top = (floater.offsetTop - newy) + "px";
      floater.style.left = (floater.offsetLeft - newx) + "px";
    }

    var coords = [floater.style.left,floater.style.top];
    sessionStorage.setItem("Floatercoords",JSON.stringify(coords));
  
    var counter           = document.getElementById("Counter");
    counter.style.left    = parseInt(floater.style.left,10)+20 +"px";
    counter.style.top     = parseInt(floater.style.top,10)+16 +"px";
  }

  floater.addEventListener("mouseup", notifend);
  touch_screen.addEventListener("mouseleave", notifend);
  floater.addEventListener("touchend", notifend);

  function notifend(){
    down = false;
    insetfloater();
    
    if(sessionStorage.getItem("Deleted")=="false"){
      console.log("notifend");
      removeTrash();
    }
    
    window.setTimeout(() =>{
      movefloater = false;
    },100);
  }

  floater.addEventListener("click", () => {
    if(movefloater == false){
      var dir = window.location.pathname;
      var dirname = dir.substring(dir.lastIndexOf("/")+1,dir.length);
      switch(dirname){
        case "Menu.html":
          document.location.href = "Notifications/NotificationMenu.html";
        break;
        case "Watch.html":
          document.location.href = "Apps/Notifications/NotificationMenu.html"; 
        break;
        case "Write%20Message.html":
        case "Premade%20Messages%20Menu.html":
        case "New%20Contact.html":
          document.location.href = "../../Notifications/NotificationMenu.html"; 
        break;
        default:
          document.location.href = "../Notifications/NotificationMenu.html";
        break;
      }
    }
  });

  insetfloater();

}

var _x =0, _y=0, newx = 0, newy = 0;
var down = false, movefloater = false;

function distfloater(x1,y1,x2,y2){
  var a = Math.abs(x2-x1);
  var b = Math.abs(y2-y1);
  var distan = Math.sqrt((a*a)+(b*b));
  return distan;
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function insetfloater(){

  var floater = document.getElementById("Floater");
  var counter  = document.getElementById("Counter");
  floater.style.transition = "all 0.5s ease 0s";
  counter.style.transition = "all 0.5s ease 0s";

  len2center = distfloater(85,95,floater.offsetLeft,floater.offsetTop);

  var angle = Math.atan2((floater.offsetTop-95),(floater.offsetLeft-85)) * (180/Math.PI);

  var ltarget = floater.offsetLeft + (90-len2center) * Math.cos(toRadians(angle)); 
  var ttarget = floater.offsetTop + (90-len2center) * Math.sin(toRadians(angle));

  if(angle<-145 || angle>=145){
    ltarget=136;
    ttarget=24;
  }
  if(angle<110 && angle>=70){
    if(len2center>70){
      ltarget=86;
      ttarget=177;
      sessionStorage.setItem("Deleted","true");
      setTimeout(function() {
        var touch_screen = document.getElementById("Clock");
        touch_screen.removeChild(floater);
        touch_screen.removeChild(counter);
        sessionStorage.removeItem("Floatercoords");
        removeTrash();
      }, 600);
    }
  }

  floater.style.left = ltarget+"px";
  floater.style.top = ttarget+"px";

  counter.style.left    = parseInt(floater.style.left,10)+20 +"px";
  counter.style.top     = parseInt(floater.style.top,10)+16 +"px";

  var coords = [floater.style.left,floater.style.top];
  sessionStorage.setItem("Floatercoords",JSON.stringify(coords));
}

function createminifloaters(){

  if(sessionStorage.getItem("Deleted")=="true"){
    return;
  }
  
  var dir = window.location.pathname;
  var dirname = dir.substring(dir.lastIndexOf("/")+1,dir.length);

  if(dirname == "NotificationMenu.html"){ return;}

  //first things first lets do some clean up and make sure that they dont exist
  var floater = document.getElementById("Floater");
  temp = document.getElementById("Navigmini");
  if(temp){
    floater.removeChild(temp);
  }
  temp = document.getElementById("SMSmini");
  if(temp){
    floater.removeChild(temp);
  }

  //first let us iterate thrugh the array and find:
  //      - order they should go in
  //      - how many of each type there is

  var notifications = JSON.parse(sessionStorage.getItem("notifications"));
  var len = notifications.length;
  var navigcount=0, smscount=0, mostrecent;
  for (var i = 0; i < len; i++) {

    var notif = notifications[i];
    if(i==len-1){
      mostrecent = notif.function;      
    }
    switch(notif.function){
      case "NavigateToFriend":
        navigcount++;
      break;
      case "go2conversation":
        smscount++;
      break;
    }
  }
  //now that we have that info its a matter of making the images correspond
  if(navigcount > 0){
    var navigmini = document.createElement("img");
    navigmini.style.height="45px";
    navigmini.id = "Navigmini";
    navigmini.style.position="absolute";

    var dir = window.location.pathname;
    var dirname = dir.substring(dir.lastIndexOf("/")+1,dir.length);
    switch(dirname){
      case "Menu.html":
        navigmini.src = 'Images/notification.png'; 
      break;
      case "Watch.html":
        navigmini.src = 'Apps/Images/notification.png'; 
      break;
      case "Write%20Message.html":
      case "Premade%20Messages%20Menu.html":
      case "New%20Contact.html":
        navigmini.src = "../../Images/notification.png"; 
      break;
      default:
        navigmini.src = "../Images/notification.png";
      break;
    }
  }

  if(smscount > 0){
    var smsmini = document.createElement("img");
    smsmini.style.height="45px";
    smsmini.id = "SMSmini";
    smsmini.style.position="absolute";

    var dir = window.location.pathname;
    var dirname = dir.substring(dir.lastIndexOf("/")+1,dir.length);
    switch(dirname){
      case "Menu.html":
        smsmini.src = 'Images/notification2.png'; 
      break;
      case "Watch.html":
        smsmini.src = 'Apps/Images/notification2.png'; 
      break;
      case "Write%20Message.html":
      case "Premade%20Messages%20Menu.html":
      case "New%20Contact.html":
        smsmini.src = "../../Images/notification2.png"; 
      break;
      default:
        smsmini.src = "../Images/notification2.png"; 
      break;
    }
  }

  if(mostrecent == "NavigateToFriend"){
    
    var counter =document.getElementById("Counter");
    if(counter){ counter.style.color = "#8d23c2";}

    if(smscount>0){
      floater.appendChild(smsmini);
      smsmini.style.left = "5px";
      smsmini.style.top = "5px";
    }
    if(navigcount>0){
      floater.appendChild(navigmini);
    }
  }
  else{

    var counter =document.getElementById("Counter");
    if(counter){ counter.style.color = "#2bade0"; }

    if(navigcount>0){
      floater.appendChild(navigmini);
      navigmini.style.left = "5px";
      navigmini.style.top = "5px";
    }
    if(smscount>0){
      floater.appendChild(smsmini);
    }
    
  }
}

function createTrash(){
  var trash = document.createElement("img");
  trash.id             = "Trash";
  trash.style.position = "absolute";
  trash.style.height   = "45px";
  trash.style.cursor   = "pointer";
  trash.style.left     = "86px";
  trash.style.top      = "177px";
  trash.style.transition = "transform 0.40s"
  trash.style.transform = "scale(0)";
  trash.style.pointerEvents = "none";
  setTimeout(function() {
    trash.style.transform = "scale(1)";
  }, 100);

  var dir = window.location.pathname;
  var dirname = dir.substring(dir.lastIndexOf("/")+1,dir.length);
  switch(dirname){
    case "Menu.html":
      trash.src = 'Images/trash.png'; 
    break;
    case "Watch.html":
      trash.src = 'Apps/Images/trash.png'; 
    break;
    case "Write%20Message.html":
    case "Premade%20Messages%20Menu.html":
    case "New%20Contact.html":
      trash.src = "../../Images/trash.png"; 
    break;
    default:
      trash.src = "../Images/trash.png";
    break;
  }

  var touch_screen = document.getElementById("Clock");
  touch_screen.insertBefore(trash,document.getElementById("Bezel"));
}
function removeTrash(){
  
  var trash = document.getElementById("Trash");
  var touch_screen = document.getElementById("Clock");
  if(trash){
    trash.style.transform = "scale(0)";
    setTimeout(function() {
      touch_screen.removeChild(trash);
    }, 400); 
  } 
}