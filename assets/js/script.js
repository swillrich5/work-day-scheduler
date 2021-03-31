var currentDay = document.querySelector("#currentDay");






// handle displaying the time
function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY');
    currentDay.textContent = rightNow;
  }




setInterval(displayTime, 1000);