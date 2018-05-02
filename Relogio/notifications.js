window.addEventListener('load', loadAlerts);
window.addEventListener('unload', updateAlerts);

//run this function to set a new alert 
function setAlert(){
  var alerts = sessionStorage.getItem("alerts");
  //if array does not exist create it else just parse it
  if(!alerts){
    alerts=[];
  }
  else{
    alerts = JSON.parse(alerts);
  }

  var notif = {};
  notif.name     = friend.name;                                                //name of person that sent                                               //function to run when clicked
  notif.text     = "place holder text";                                        //notification text 
  notif.timeStep = 10000;                                                      //amount of time to wait 
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

