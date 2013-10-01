/*
	HoverDate.js
	João Costa (https://github.com/JD557)
	
	A simple calendar in javascript that appears when
	the mouse is over a date.
*/

// Various Calendar Formats
function DateFormat(regex,day,month,year,separator) {
	this.regex = regex;
	this.day = day;
	this.month = month;
	this.year = year;
	this.separator = separator;
}

var dateFormatsMap = {
	"DD/MM/YYYY": new DateFormat(/\d{1,2}\/\d{1,2}\/\d{4}/g,0,1,2,'/'),
	"DD-MM-YYYY": new DateFormat(/\d{1,2}-\d{1,2}-\d{4}/g,0,1,2,'-'),
	"YYYY/MM/DD": new DateFormat(/\d{4}\/\d{1,2}\/\d{1,2}/g,2,1,0,'/'),
	"YYYY-MM-DD": new DateFormat(/\d{4}-\d{1,2}-\d{1,2}/g,2,1,0,'-'),
	"MM/DD/YYYY": new DateFormat(/\d{1,2}\/\d{1,2}\/\d{4}/g,1,0,2,'/'),
	"MM-DD-YYYY": new DateFormat(/\d{1,2}-\d{1,2}-\d{1,2}/g,1,0,2,'-'),
};

// Weekday names
var weekDays = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");

// Call this function to enable HoverDate
// id: html element id to parse
// formatString: date format string (Ex. "DD/MM/YYYY")
function HoverDate(id,formatString) {
	var element       = document.getElementById(id);
	element.innerHTML = element.innerHTML.replace(
		dateFormatsMap[formatString].regex,
		"<span class='HoverDate' onmouseover='showCalendar(event,\"$&\",\""
			+formatString+
		"\")' onmouseout='hideCalendar()'>$&</span>")+
		"<div id='HoverDateCalendar'></div>";	
	document.getElementById("HoverDateCalendar").style.position="absolute";
	document.getElementById("HoverDateCalendar").style.display="none";
}

// Shows the calendar (function called when a date is hovered)
function showCalendar(event,dateString,formatString) {
	var format=dateFormatsMap[formatString];
	var dateSplit    = dateString.split(format.separator);
	var day          = dateSplit[format.day];
	var month        = dateSplit[format.month]-1;
	var year         = dateSplit[format.year];
	var daysOfMonth  = new Date(year, month, 0).getDate();
	var firstWeekDay = new Date(year, month, 1).getDay();
	var today        = new Date();
	
	var outputString = "<table><thead><tr>";
	for (var i in weekDays) {
		outputString+="<th>"+weekDays[i]+"</th>";
	}
	outputString+="</tr></thead><tbody>"

	var d=0; // Current Day
	var i=0; // Current Weekday
	while (true) {
		if (i%7==0) {
			if (d>=daysOfMonth) {break;}
			outputString+="<tr>";
		}

		if (d==0 && i == firstWeekDay) {d = 1;}

		if (d>0 && d<=daysOfMonth) {
			var c="";
			if (d==day) {c+=" targetCell";}
			if (d==today.getDate() &&
			    month==today.getMonth() &&
				year==today.getFullYear()) {c+=" todayCell";}
			outputString+="<td class='"+c+"'>"+d+"</td>";
			d++;
		}
		else {outputString+="<td></td>";}

		if (i%7==6) {outputString+="</tr>";}
		i++;
	}
	outputString+="</tbody></table>";
	document.getElementById("HoverDateCalendar").innerHTML=outputString;
	document.getElementById("HoverDateCalendar").style.top=event.clientY+"px";
	document.getElementById("HoverDateCalendar").style.left=event.clientX+"px";
	document.getElementById("HoverDateCalendar").style.display="";
}

// Hides the calendar (function called when the mouse leaves the date)
function hideCalendar() {
	document.getElementById("HoverDateCalendar").innerHTML="";
	document.getElementById("HoverDateCalendar").style.display="none";
}
