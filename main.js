"use strict";
let timer, result, start, stop, startTime, firstTime, newTime;
let min = 7;
let max = 15;
let elapsedTime = 0;
let intervalId;

function init() {

   timer = document.getElementById("timer");
   result = document.getElementById("result");
   start = document.getElementById("start");
   stop = document.getElementById("stop");

 firstTime =("000" + Math.floor(Math.random() * (max + 1 - min) + min)).slice(-3) + ".000";
 timer.innerHTML =  firstTime;

 start.addEventListener("click", function () {
  startTime = new Date();
  intervalId = setInterval(gameStart, 100);
   console.log(startTime);
 })

 stop.addEventListener("click", function () {
   clearInterval(intervalId);
   timer.style.opacity = "1"

   if (newTime <= 0.8 && newTime >= -0.8) {
     result.innerHTML = "good!";
   } else {
     result.innerHTML = "bad!";
   }
 })

}

function gameStart() {
    let date = new Date();
    elapsedTime = ((date - startTime) / 1000) ;

    console.log(date, elapsedTime)

    newTime = (firstTime - elapsedTime).toFixed(3);
    timer.innerHTML = ("000" + newTime).slice(-7);

    if (elapsedTime > 3) {
      timer.style.opacity = "0";
    }
    

}
