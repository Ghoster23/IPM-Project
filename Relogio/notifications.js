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
  notif.text     = text;                                        //notification text 
  notif.function = functionName;                                         //function that will be called upon clicking
  notif.timeStep = timeStep;                                                      //amount of time to wait 
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
        addNotification(notif);

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
    createFloater();
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
    }
  }

  var dir = window.location.pathname;
  var dirname = dir.substring(dir.lastIndexOf("/")+1,dir.length);

  if( dirname == "NotificationMenu.html"){
    //lets add that new notification to this menu
  
    var element1 = "<th> <div class='iconApp'";
    var element2 = "draggable='false'> <span id ='notText'>";
    var element3 = "</span>";

    var notifications = JSON.parse(sessionStorage.getItem("notifications"));
    var contact_Table = document.getElementById("Table");

    var body = contact_Table.tBodies[0];
    var rows = body.rows;
    
    // pick the last and prepend
    rows[rows.length - 1].insertAdjacentHTML('beforebegin', element1 + element2 + notif.text + element3);
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

  var dir = window.location.pathname;
  var dirname = dir.substring(dir.lastIndexOf("/")+1,dir.length);

  if( dirname == "NotificationMenu.html"){
    return;
  }
  var counter      = document.createElement("span");
  var floater      = document.createElement("img");

  counter.id       = "Counter";

  floater.id       = "Floater";
  floater.className= "Floater";

  switch(dirname){
    case "Menu.html":
      floater.src = 'Images/notification.png'; 
    break;
    case "Watch.html":
      floater.src = 'Apps/Images/notification.png'; 
    break;
    case "Write%20Message.html":
    case "Premade%20Messages%20Menu.html":
    case "New%20Contact.html":
      floater.src = "../../Images/notification.png"; 
    break;
    default:
      floater.src = "../Images/notification.png";
    break;
  }

  floater.style.position = "absolute";
  floater.style.height   = "60px";
  floater.style.cursor   = "pointer";
  floater.style.left     = "136px";
  floater.style.top      = "24px";

  var notifications = JSON.parse(sessionStorage.getItem("notifications"));

  counter.innerHTML          = notifications.length;
  counter.style.position     = "absolute";
  counter.style.textAlign    = "center";
  counter.style.color        = "rgb(41, 204, 141)"; 
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

  counter.style.left    = parseInt(floater.style.left,10)+27 +"px";
  counter.style.top     = parseInt(floater.style.top,10)+22 +"px";
  
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
    
    window.setTimeout(() =>{
      movefloater = true;
    },100);

    e.preventDefault();
    
    newx = x_ - e.clientX;
    newy = y_ - e.clientY;
    x_ = e.clientX;
    y_ = e.clientY;
    
    var floater = document.getElementById("Floater");

    if(distfloater(77,88,floater.offsetLeft - newx,floater.offsetTop - newy)>=95){
      //do nada
    }else{
      floater.style.top = (floater.offsetTop - newy) + "px";
      floater.style.left = (floater.offsetLeft - newx) + "px";
    }

    var coords = [floater.style.left,floater.style.top];
    sessionStorage.setItem("Floatercoords",JSON.stringify(coords));
 
    var counter  = document.getElementById("Counter");
    counter.style.left    = parseInt(floater.style.left,10)+27 +"px";
    counter.style.top     = parseInt(floater.style.top,10)+22 +"px";

  });

  floater.addEventListener("touchmove", notifmove);

  function notifmove(e){
    if (!down) return;
    
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

    if(distfloater(77,88,floater.offsetLeft - newx,floater.offsetTop - newy)>=95){
      //do nada
    }else{
      floater.style.top = (floater.offsetTop - newy) + "px";
      floater.style.left = (floater.offsetLeft - newx) + "px";
    }

    var coords = [floater.style.left,floater.style.top];
    sessionStorage.setItem("Floatercoords",JSON.stringify(coords));
  
    var counter  = document.getElementById("Counter");
    counter.style.left    = parseInt(floater.style.left,10)+27 +"px";
    counter.style.top     = parseInt(floater.style.top,10)+22 +"px";
  }

  floater.addEventListener("mouseup", notifend);
  floater.addEventListener("mouseleave", notifend);
  floater.addEventListener("touchend", notifend);

  function notifend(){
    down = false;
    insetfloater();
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

  len2center = distfloater(77,88,floater.offsetLeft,floater.offsetTop);

  var angle = Math.atan2((floater.offsetTop-88),(floater.offsetLeft-77)) * (180/Math.PI);

  var ltarget = floater.offsetLeft + (90-len2center) * Math.cos(toRadians(angle)); 
  var ttarget = floater.offsetTop + (90-len2center) * Math.sin(toRadians(angle));

  if(angle<-145 || angle>=145){
    ltarget=136;
    ttarget=24;
  }

  floater.style.left = ltarget+"px";
  floater.style.top = ttarget+"px";

  counter.style.left    = parseInt(floater.style.left,10)+27 +"px";
  counter.style.top     = parseInt(floater.style.top,10)+22 +"px";

  var coords = [floater.style.left,floater.style.top];
  sessionStorage.setItem("Floatercoords",JSON.stringify(coords));
}


/*=======================| TO USE LATER |=====================


function setSMSAlert(){
  setAlert("friend.name",friend.name+" aceitou\no seu pedido.\nNavegar at&eacute local?","NavigateToFriend",getRandomArbitrary(2000, 7500));
  var accept = document.getElementById('Sent');
  accept.style.transform = "scale(1,1)";
  document.getElementById("menu").style.overflow = "hidden";
  setTimeout(function() {
    document.getElementById("menu").style.overflow = "auto";
    accept.style.transform = "scale(0,0)";
  }, 1300);
}

*/