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
  console.log("update");

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

  console.log("Alerts loaded");

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

        console.log("Notification received!!!");
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
    floater.style.animation = "boing 300ms ease-in-out";
    var counter  = document.getElementById("Counter");
    counter.innerHTML        = notifications.length;
    setTimeout(function() {
      floater.style.animation = "";
    }, 1000);
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

  counter.innerHTML        = notifications.length;
  counter.style.position   = "absolute";
  counter.style.textAlign  = "center";
  counter.style.color      = "white";
  counter.style.fontFamily = "'Open Sans', sans-serif";
  counter.style.fontWeight = "normal";
  counter.style.fontSize   = "14px";
  counter.style.textShadow = "0px 0px 3px #000000";

  var floatercoords = sessionStorage.getItem("Floatercoords");
  if(floatercoords){
    floatercoords=JSON.parse(floatercoords);
    floater.style.left    = floatercoords[0];
    floater.style.top     = floatercoords[1];
    counter.style.left    = parseInt(floater.style.left,10)+10 +"px";
    counter.style.top     = parseInt(floater.style.top,10)+10 +"px";
  }
  
  var touch_screen = document.getElementById("Clock");
  touch_screen.insertBefore(floater,document.getElementById("Bezel"));
  touch_screen.insertBefore(counter,document.getElementById("Bezel"));

  floater = document.querySelector("#Floater");
    
  floater.addEventListener("mousedown", (e) => {
    down = true;
    x_ = e.clientX;
    y_ = e.clientY;
  });

  floater.addEventListener("mousemove", (e) => {
    if (!down) return;
    e.preventDefault();
    
    newx = x_ - e.clientX;
    newy = y_ - e.clientY;
    x_ = e.clientX;
    y_ = e.clientY;
    
    clickable = false;
    var floater = document.getElementById("Floater");

    if(dist(77,88,floater.offsetLeft - newx,floater.offsetTop - newy)>=80){
      //do nada
    }else{
      floater.style.top = (floater.offsetTop - newy) + "px";
      floater.style.left = (floater.offsetLeft - newx) + "px";
    }

    var coords = [floater.style.left,floater.style.top];
    sessionStorage.setItem("Floatercoords",JSON.stringify(coords));
 
    var counter  = document.getElementById("Counter");
    counter.style.left    = parseInt(floater.style.left,10)+10 +"px";
    counter.style.top     = parseInt(floater.style.top,10)+10 +"px";

  });

  floater.addEventListener("mouseup", () => {
    down = false;
    var floater = document.getElementById("Floater");
    window.setTimeout(() =>{
      clickable = true;
    },300);
  });

  floater.addEventListener("mouseleave", () => {
    down = false;
    window.setTimeout(() =>{
      clickable = true;
    },300);
  });

  floater.addEventListener("click", () => {
   
      console.log("lets goooo");
      var dir = window.location.pathname;
      var dirname = dir.substring(dir.lastIndexOf("/")+1,dir.length);
      switch(dirname){
        case "Menu.html":
          document.location.href = "Notifications/NotificationMenu.html";
        break;
        case "Watch.html":
          document.location.href = "Apps/Notifications/NotificationMenu.html"; 
        break;
        default:
          document.location.href = "../Notifications/NotificationMenu.html";
        break;
      }
  });
}

var _x =0, _y=0, newx = 0, newy = 0;
var down = false, clickable = true;

function dist(x1,y1,x2,y2){
  var a = Math.abs(x2-x1);
  var b = Math.abs(y2-y1);
  var distan = Math.sqrt((a*a)+(b*b));
  return distan;
}
