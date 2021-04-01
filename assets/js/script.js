var currentDay = document.querySelector("#currentDay");
var timeColumns = document.querySelectorAll(".data-entry");
var inputField = document.querySelectorAll(".input-field");



function setTimeColumnBackground(rightNow) {
    var currentHour = moment("12pm", "hA").format("H");
    console.log(currentHour);
    for (var i=0; i < timeColumns.length; i++) {
        console.log("currentHour = " + currentHour + " i+9 = " + (i+9) + " i = " + i);
        console.log((currentHour == (i+9)));
        if (currentHour == (i+9)) {  // present hour
            timeColumns[i].classList.remove("past");
            timeColumns[i].classList.remove("future");
            timeColumns[i].classList.add("present");

        } else if (currentHour > (i+9)) {  // past hours
            // console.log("before noon");
            timeColumns[i].classList.remove("present");
            timeColumns[i].classList.remove("future");
            timeColumns[i].classList.add("past");
        } else if (currentHour < (i+9)) {  // future hours
            timeColumns[i].classList.remove("present");
            timeColumns[i].classList.remove("past");
            timeColumns[i].classList.add("future");
        }
    }

}


// handle displaying the time
function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY');
    currentDay.textContent = rightNow;
    setTimeColumnBackground(rightNow);
  }




setInterval(displayTime, 1000);