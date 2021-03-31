var currentDay = document.querySelector("#currentDay");
var timeColumns = document.querySelectorAll(".time-block")



function setTimeColumnBackground(rightNow) {
    for (var i=0; i < timeColumns.length; i++) {
        if (moment("11am", "hA").format("H") == (i+9)) {
            timeColumns[i].classList.remove("past");
            timeColumns[i].classList.remove("future");
            timeColumns[i].classList.add("present");
        } else if (moment("11am", "hA").format("H") > (i+9)) {
            timeColumns[i].classList.remove("present");
            timeColumns[i].classList.remove("future");
            timeColumns[i].classList.add("past");
        } else if (moment("11am", "hA").format("H") < (i+9)) {
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
    setTimeColumnBackground();
  }




setInterval(displayTime, 1000);