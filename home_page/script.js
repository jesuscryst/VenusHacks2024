document.addEventListener("DOMContentLoaded", function() {
    generateCalendar(currentMonth, currentYear)
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
            box.id = `date${day_index}`
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
}

function previous() {
    currentYear = currentMonth === 0 ?
        currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ?
        11 : currentMonth - 1;
    generateCalendar(currentMonth, currentYear);
}