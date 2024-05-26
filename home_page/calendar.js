document.addEventListener("DOMContentLoaded", function() {
    generateCalendar(currentMonth, currentYear)
    showScheduleToday(today)
    colorCodeCalendar()
})

var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var currentMonth = currentDate.getMonth();
var today = currentDate.getDate();

var months_days = {
    "January": 31,
    "February": 28,
    "March": 31,
    "April": 30,
    "May": 31,
    "June": 30,
    "July": 31,
    "August": 31,
    "September": 30,
    "October": 31,
    "November": 30,
    "December": 31
};

var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var events = {
    "5/25/2024": [0, 1],
    "5/26/2024": [1, 0],
    "5/27/2024": [0, 0]
}

var events = {
    "5/25/2024": [0, 1],
    "5/26/2024": [1, 0],
    "5/27/2024": [0, 0]
}

function generateCalendar(month, year) {

    var header = document.getElementById("monthAndYear")
    header.innerHTML = `${months[month]} ${year}`

    var firstDay = new Date(year, month, 1).getDay();
    var cal = document.getElementById("calendar_body")
    cal.innerHTML = ''

    for (let i = 0; i < 6; i++) {
        var week = document.createElement("tr");
        week.id = `week${i}`;
        cal.appendChild(week);
    }

    if (month === 1) {
        var isLeap = determineLeap(year);
        months_days[months[month]] = (isLeap === 0) ? 28 : 29;
    } 

    var day_index = 1
    var week_index = 0

    for (var j = 0; j <= months_days[months[month]] + firstDay - 1; j++) {
        
        if (j < firstDay) {
            var empty_box = document.createElement("td")
            var week = document.getElementById("week0")
            week.appendChild(empty_box)

        } else {
            var box = document.createElement("td")
            box.id = `${day_index}`
            box.id = `${day_index}`
            box.classList.add("calendargrid");

            box.addEventListener("click", function() {
                showScheduleToday(this.id)
                showScheduleToday(this.id)
            });


            box.innerHTML = `${day_index}`
            day_index++
            
            week = document.getElementById(`week${week_index}`)
            if (week.childElementCount === 7) {
                week_index++
                week = document.getElementById(`week${week_index}`)
                week.appendChild(box)
            } else {
                week.appendChild(box)
            }
        }
    }
}

function determineLeap(year) {
    var isLeap = 0
    if (year.toString().slice(-2) === "00" && year % 400 === 0) {
        isLeap = 1
    } else if (year.toString().slice(-2) != "00" && year % 4 === 0) {
        isLeap = 1        
    }
    return isLeap
}

function next() {
    currentYear = currentMonth === 11 ?
        currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    generateCalendar(currentMonth, currentYear);
    colorCodeCalendar()
}

function previous() {
    currentYear = currentMonth === 0 ?
        currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ?
        11 : currentMonth - 1;
    generateCalendar(currentMonth, currentYear);
    colorCodeCalendar()
}

function showScheduleToday(day) {
    date = `${currentMonth+1}/${day}/${currentYear}`

    var todayHTML = ''
    if (date in events) {
        if (events[date][0] === 1) {
            todayHTML = `Your child is with Mom.`
        } else if (events[date][1] === 1) {
            todayHTML = `Your child is with Dad.`
        } else {
            todayHTML = `Your child is with a babysitter. <button>Contact</button>`
        }
            
    } else {
        todayHTML = `Oh no! Your child may be unattended. <button onclick="switchActive('babysitterslink')">Find an available babysitter</button><br><br>
        Is someone else watching your child? Let their other parent know!`
    }

    eventDiv = document.getElementById("eventDIV")
    eventDiv.innerHTML = ''
    eventHTML = `<div class="shadow-sm p-3 mb-2 rounded" style="border: solid 1px; border-color:gainsboro; border-radius: 30px; box-shadow: black;">
    <h3>${date}</h3>
    <br>
    <div id="schedule_today">${todayHTML}</div>
    <br>
    <button id="${date}" onclick="showAddEventPage(this.id)">Add Event</button>
    </div>`
    eventDiv.innerHTML += eventHTML

}


function showAddEventPage(date) {
    eventDiv = document.getElementById("eventDIV")
    eventDiv.innerHTML = ''
    new_eventHTML = `<div id="new_eventDIV" class="shadow-sm p-3 mb-2 rounded">
    <button onclick="showScheduleToday(${date.split("/")[1]})"><</button>
    <h3>New Event</h3>
    <input id="event_name" type="text" placeholder="Name">
    <input id="event_start_time" type="text" placeholder="Start time">
    <input id="event_end_time" type="text" placeholder="End time">
    <button onclick="addEventToDict(${date.split("/")[1]}); showScheduleToday(${date.split("/")[1]})">Submit</button>
    </div>`
    eventDiv.innerHTML += new_eventHTML
}

function addEventToDict(day) {
    new_event = document.getElementById("event_name").value
    date = `${currentMonth+1}/${day}/${currentYear}`
    if (date in events) {
        events[date].push(new_event)
    } else {
        events[date] = [new_event]
    }
}

function showScheduleToday(day) {
    date = `${currentMonth+1}/${day}/${currentYear}`

    var todayHTML = ''
    if (date in events) {
        if (events[date][0] === 1) {
            todayHTML = `Your child is with Mom.`
        } else if (events[date][1] === 1) {
            todayHTML = `Your child is with Dad.`
        } else {
            todayHTML = `Your child is with a babysitter. <button>Contact</button>`
        }
            
    } else {
        todayHTML = `Oh no! Your child may be unattended. <button onclick="switchActive('babysitterslink')">Find an available babysitter</button><br><br>
        Is someone else watching your child? Let their other parent know!`
    }

    eventDiv = document.getElementById("eventDIV")
    eventDiv.innerHTML = ''
    eventHTML = `<div class="shadow-sm p-3 mb-2 rounded" style="border: solid 1px; border-color:gainsboro; border-radius: 30px; box-shadow: black;">
    <h3>${date}</h3>
    <br>
    <div id="schedule_today">${todayHTML}</div>
    <br>
    <button id="${date}" onclick="showAddEventPage(this.id)">Add Event</button>
    </div>`
    eventDiv.innerHTML += eventHTML

}

function colorCodeCalendar() {
    for (date in events) {
        if (date.split("/")[0] === currentMonth+1) {
            var day = date.split("/")[1]
            grid = document.getElementById(`${day}`)
            if (events[date][0] === 1) {
                grid.style.backgroundColor = "pink"
            } else if (events[date][1] === 1) {
                grid.style.backgroundColor = "lightblue"
            } else {
                grid.style.backgroundColor = "lightgreen"
            }
        }
        
    }
}

function showAddEventPage(date) {
    eventDiv = document.getElementById("eventDIV")
    eventDiv.innerHTML = ''
    new_eventHTML = `<div id="new_eventDIV" class="shadow-sm p-3 mb-2 rounded">
    <button onclick="showScheduleToday(${date.split("/")[1]})"><</button>
    <h3>New Event</h3>
    <input id="event_name" type="text" placeholder="Name">
    <input id="event_start_time" type="text" placeholder="Start time">
    <input id="event_end_time" type="text" placeholder="End time">
    <button onclick="addEventToDict(${date.split("/")[1]}); showScheduleToday(${date.split("/")[1]})">Submit</button>
    </div>`
    eventDiv.innerHTML += new_eventHTML
}

function addEventToDict(day) {
    new_event = document.getElementById("event_name").value
    date = `${currentMonth+1}/${day}/${currentYear}`
    if (date in events) {
        events[date].push(new_event)
    } else {
        events[date] = [new_event]
    }
}

function sendData() { 
    var value = document.getElementById('input').value; 
    $.ajax({ 
        url: '/process', 
        type: 'POST', 
        contentType: 'application/json', 
        data: JSON.stringify({ 'value': value }), 
        success: function(response) { 
            document.getElementById('output').innerHTML = response.result; 
        }, 
        error: function(error) { 
            console.log(error); 
        } 
    }); 
} 