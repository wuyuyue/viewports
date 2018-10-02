import moment from 'moment'

export function getTimeDurationStringV2(timeduration,timeUnits) {
  var timeUnitsArray = timeUnits.split('/');
  // //console.log(timeduration,typeof timeduration);
  var result="";
  var unitLabel=timeUnitsArray[5];
  var left = timeduration;
  var years = timeduration / (365*24*60*60)
  if(years>=1){
    result+=Math.floor(years) + ""+ timeUnitsArray[0];
    left = left-Math.floor(years)*(365*24*60*60);
  }
  var months = left / (30*24*60*60) ;
  if(months>=1){
    result+=Math.floor(months) + ""+ timeUnitsArray[1];
    left = left-Math.floor(months)*(30*24*60*60);

  }
  var days = left / (24*60*60);
  if(days>=1){
    result+=Math.floor(days) + ""+ timeUnitsArray[2];
    left = left-Math.floor(days)*(24*60*60);

  }
  var hours = left / (60*60);
  if(hours>=1){
    result+=Math.floor(hours) + ""+ timeUnitsArray[3];
    left = left-Math.floor(hours)*(60*60);

  }
  var minutes = left / 60;
  if(minutes>=1){
    result+=Math.floor(minutes) + ""+ timeUnitsArray[4];
    left = left-Math.floor(minutes)*60;

  }
  var seconds = left;
  if(seconds>=1){
    result+=seconds + ""+ timeUnitsArray[5];
  }
  return result;
}
