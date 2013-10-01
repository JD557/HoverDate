HoverDate.js
============

A simple calendar in javascript that appears when the mouse is over a date.

Usage
-----

To use HoverDate.js, simply include the hoverdate.js file and call
    HoverDate(element,dateFormatString)
Where `element` is the id of the element that you want to parse and
`dateFormatString` is the date format (for example "DD/MM/YYYY").

You can see an usage example in the `example.html` file.

Styling
-------

HoverDate.js comes with no default CSS.

Having said that, it's pretty easy to apply styles to it.

* `span.HoverDate` is a span that's applied to all the dates found
* `div#HoverDateCalendar` is the div that contains the calendar
* `div#HoverDateCalendar table` is the calendar
* `#HoverDateCalendar td.targetCell` is the cell that represents the target day
* `#HoverDateCalendar td.todayCell` is the cell that represents the current day

You can see an usage example in the `example.html` file.
