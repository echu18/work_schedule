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

Calendar events will display if Technician, Location and Work Order files have been uploaded successfully.















### Demo

Note: the default date is set to October 1, 2019 for easier access to viewing sample events
	- This can be changed with the **defaultDate** prop within the Calendar component of schedule.jsx 
	
	
	
