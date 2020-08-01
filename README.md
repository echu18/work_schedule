# Work Schedule

Work Schedule is a demo project that displays technicians' work order schedules all on one calendar view.

It was built using Ruby on Rails, PostgreSQL, JavaScript, React (+ React-tooltip, React-big-calendar, React-csv-reader), HTML/CSS.





Setup and Running Examples Locally
---

1. ``bundle install`` and then ``npm install``.
2. On the command line, use ``npm start`` to run the start script, then use ``rails s`` to start up the server.

### Seed Data
The only seed data included are technicians named 'demo user', to demo the **wide day view** of the calendar. 

User can directly upload csv files from the top right corner of the page. Day view will not display if Technicians, Locations and Work Orders have all been uploaded.






Use
---

### Uploading CSV files

The user can upload CSV files from the box in the top right corner, by

1) Selecting a file to upload with the ``Choose File`` button and popup
2) Selecting a data type (Technician, Location, or Work Order)
3) Clicking on the ``Upload`` button

Note: Both Technician files and Location files must be uploaded prior to uploading Work Orders.




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




#### Month View
--- clicking on dates will go to day view as well



#### Day View













### Demo

Note: the default date is set to October 1, 2019 for easier access to viewing sample events
	- This can be changed with the **defaultDate** prop within the Calendar component of schedule.jsx 
	
	
	
