# Work Schedule

Work Schedule is a demo project that displays technicians' work order schedules all on one calendar view.

It was built using Ruby on Rails, PostgreSQL, JavaScript, React (+ React-tooltip, React-big-calendar, React-csv-reader), HTML/CSS.


---
### [Demo](https://work-order-schedule.herokuapp.com/)

A demo of the work schedule calendar with preloaded event data can be viewed [here](https://work-order-schedule.herokuapp.com/).

Note: the default date is set to October 1, 2019 for easier access to viewing sample events
	- This can be changed with the **defaultDate** prop within the Calendar component of schedule.jsx 
	
---	


Setup and Running the App Locally
---

1. ``bundle install`` and then ``npm install``.
2. On the command line, use ``npm start`` to run the start script, then use ``rails s`` to start up the server.
3. Navigate to ``localhose:3000`` in your web browser to view the app.


### Seed Data
The only seed data included are technicians named 'demo user', to demo the **wide day view** of the calendar. 

User can directly upload csv files from the top right corner of the page. Day view will not display if Technicians, Locations and Work Orders have all been uploaded.






Features and Use
---

### Uploading CSV files

The user can upload CSV files from the box in the top right corner.

Steps:

1) Select a file to upload with the ``Choose File`` button and popup
2) Select data type (Technician, Location, or Work Order)
3) Click on the ``Upload`` button
4) Success or error message will appear depending on upload status

**Note: Both Technician files and Location files must be uploaded prior to uploading Work Orders.**


---  



### Viewing and Navigation

Calendar will display events if Technician, Location and Work Order files have been uploaded successfully.


#### Navigation


Use the following buttons to navigate throughout the calendar:

``Today`` - will change calendar to display the current month (if in month view) or the current day (if in day view)

``Back`` - will navigate to the previous month (if in month view) or the previous day (if in day view)

``Next`` - will navigate to the next month (if in month view) or the next day (if in day view)


``Month`` - switches current view to month view

``Day`` - switches current view to day view

``Wide View`` - [Day view only] widens columns so users can see full width of events. Because columns have exanded, some technician columns will be hidden. They can be viewed by scrolling left and right on the calendar. Click on ``Month`` and then ``Day`` to reset the day view.


--

### Month View



The month view displays the entire month's work orders (compact events) at a glance. 
- Days that have a lot of work orders will have a ``+[number] more`` link - clicking on this will display a popup of all of that day's events.

- **Hovering** over a compact event block in the month view will summon a tooltip that displays details of that work order.


**Navigating to day view** 

1. Clicking on the ``Day`` button from month view will display the programmed default date. If the user navigated to a specific date, then switched to month view, the next click on ``Day`` will navigate back to the previously accessed date.

2. Clicking directly on the calendar date number (will change color when hovered over) will navigate to the selected date



### Day View

The day view displays all technicians' work orders for the selected date. 


- By default the day begins at 5:00 and ends at 19:00, but custom time ranges can be changed in the minAccessor and maxAccessor within the Calendar component of _schedule.jsx_.


- If the calendar cannot fit all technician columns onto the current page, the hidden technician columns can be accessed by scrolling right on the calendar day view (works with both regular and wide view).


- Just like with the month view, **hovering** over a full event in the day view will summon a popup that displays details of that work order. Some work order events may be too short in duration (thus having a smaller block on the calendar), for the event block to display full details.

---

### Available Time (day view only)

- Double-clicking on any blank time slot (where there is no event) will summon a popup that displays the duration of available time between the previous and next work orders for that technician of that column.

- Click once anywhere on the page to hide the time availability popup





---







