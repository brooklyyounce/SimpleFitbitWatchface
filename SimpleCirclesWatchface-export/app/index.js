import clock from "clock";
import { HeartRateSensor } from "heart-rate";
import document from "document";
import { preferences } from "user-settings";
import { battery } from "power"; // import battery level (see line26)
import userActivity from "user-activity";
import * as util from "../common/utils";


//clock update every second
clock.granularity = "seconds";

/// Grab text handles for UI display
const myClock = document.getElementById("myClock");
const myClockSeconds = document.getElementById("myClockSeconds")
const mySteps = document.getElementById("mySteps");
const myHR  = document.getElementById("myHR");
const myBatteryLevel = document.getElementById("myBatteryLevel");
const todayDate = document.getElementById("todayDate");
const day = document.getElementById("day");

//// Grab heart rate sensor and value
const hrm = new HeartRateSensor();
hrm.onreading = function(){
  myHR.text = `${hrm.heartRate}` + " <3";
}
hrm.start();

console.log("Hr" + myHR.text);

// Update the <text> element every tick with the current time
clock.ontick = function(evt) {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  let seconds = util.zeroPad(today.getSeconds());
  myClock.text = `${hours}:${mins}`;
  myClockSeconds.text = "(" + `${seconds}` + ")";
  
  let shortDate = evt.date.toString().split(" ",3);
  day.text = shortDate[0];
  
  
  ////// Steps inside tick handler

  mySteps.text = `${userActivity.today.adjusted["steps"] || 0}` + " steps";
  console.log("num steps" + mySteps.text);
  
    ////// Battery inside tick handler
  myBatteryLevel.text = `${battery.chargeLevel}%`;
  console.log("battery level:" + myBatteryLevel.text);

   ////// Today's Date inside tick handler
  
  shortDate = evt.date.toString().split(" ",3);
  todayDate.text = shortDate[1] + " " + shortDate[2];
  
  console.log(todayDate.text);
}



