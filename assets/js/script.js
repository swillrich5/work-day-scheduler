var currentDay = document.querySelector("#currentDay");
var timeColumns = document.querySelectorAll(".data-entry");
var inputField = document.querySelectorAll(".input-field");
var textAreas = document.querySelectorAll("textarea");
var savedCalendarEvents = [];




function setTimeColumnBackground(rightNow) {
    // var currentHour = moment("12pm", "hA").format("H");
    var currentHour = moment().format("H");    // console.log(currentHour);
    for (var i=0; i < timeColumns.length; i++) {
        // console.log("currentHour = " + currentHour + " i+9 = " + (i+9) + " i = " + i);
        // console.log((currentHour == (i+9)));
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

function setUpAppointmentArray() {
    var storedCalendarEvents = JSON.parse(localStorage.getItem("calendarEvents"));
    if (storedCalendarEvents === null) {
        // savedCalendarEvents[0] = { 
        //     description: "",
        //     time: i
        // }
        for (var i = 0; i < 9; i++) {
            savedCalendarEvents.push( {
                description: "",
                time: i
            });
            localStorage.setItem("calendarEvents", JSON.stringify(savedCalendarEvents));
        }
    } else {
        savedCalendarEvents = storedCalendarEvents;
        for (var i = 0; i < 9; i++) {
            textAreas[i].value = savedCalendarEvents[i].description;
        }
    }
}


// handle displaying the time
function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY');
    currentDay.textContent = rightNow;
    setTimeColumnBackground(rightNow);
  }



setUpAppointmentArray()
setInterval(displayTime, 1000);

document.querySelectorAll('.saveBtn').forEach(item => {
    item.addEventListener('click', event => {
        var calendarEvent = { };
        for (var i = 0; i < textAreas.length; i++) {
            if (textAreas[i].value != savedCalendarEvents[i].description) {
                // create calendar event
                calendarEvent.description = textAreas[i].value;
                calendarEvent.time = i;
                savedCalendarEvents[i].description = calendarEvent.description;
                localStorage.setItem("calendarEvents", JSON.stringify(savedCalendarEvents));


            }
        }
    })
});