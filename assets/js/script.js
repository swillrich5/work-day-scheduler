    // the field where the date will be displayed in the jumbotron
var currentDay = document.querySelector("#currentDay");
    // the columns (divs) in the planner hwere the event descriptions will be displayed
    // used to set the background color according to time of day
var timeColumns = document.querySelectorAll(".data-entry");
    // the actual textAreas that will hold the event descriptions
var textAreas = document.querySelectorAll("textarea");
    // the array that holds the event objects
var savedCalendarEvents = [];


// sets the color of each time row according to the time of day
// use var currentHour = moment("12pm", "hA").format("H"); for testing
// if time of day is after 5pm.
function setTimeColumnBackground(rightNow) {
    var currentHour = moment().format("H");    
    for (var i=0; i < timeColumns.length; i++) {
        if (currentHour == (i+9)) {  // present hour
            timeColumns[i].classList.remove("past");
            timeColumns[i].classList.remove("future");
            timeColumns[i].classList.add("present");
        } else if (currentHour > (i+9)) {  // past hours
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


// when site first loads, check local storage for prior entries
// if they exist, grab them from local storage, display them and
// put them in an array for adds, changes, deletes
function setUpAppointmentArray() {
    var storedCalendarEvents = JSON.parse(localStorage.getItem("calendarEvents"));
    if (storedCalendarEvents === null) {
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


// grabs the current date from moment() and displays it in the jumbotron
// calls setTimeColumnBackground to set the background of the hour rows
// based on time of day
function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY');
    currentDay.textContent = rightNow;
    setTimeColumnBackground(rightNow);
  }



// --------------------------------------------------------------------
// ------------------->> application sarting point <<------------------
// --------------------------------------------------------------------
setUpAppointmentArray()
setInterval(displayTime, 1000);



// sets up an event listener for each button on the screen that
// grabs any changes to the textareas in each row and writes them
// to local storage
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