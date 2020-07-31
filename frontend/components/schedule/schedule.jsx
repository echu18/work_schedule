import React from "react";
import ReactDOM from "react-dom";

import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import ReactTooltip from "react-tooltip";






class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      locations: [],
      technicians:[],
      workOrders: [],
      events: [],
      view: "month"
    };
    // this.workOrderList = this.workOrderList.bind(this);
    // this.handleEvent = this.handleEvent.bind(this);
    this.changeEventView = this.changeEventView.bind(this);
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount(){
      this.props
        .fetchAllWorkOrders()
        .then(this.props.fetchAllTechnicians())
        .then(this.props.fetchAllLocations())
        .then(
          this.setState(
            {
              locations: this.props.locations,
              technicians: this.props.technicians,
              workOrders: this.props.workOrders,
            }
            ))
            this.mapCalEvents(this.state.view)
        
  }


  componentDidUpdate(prevProps, prevState){
    if (prevProps !== this.props) {
      this.setState(
        {
          locations: this.props.locations,
          technicians: this.props.technicians,
          workOrders: this.props.workOrders,
        }, () =>this.mapCalEvents(this.state.view)
        );
      }
  }


    changeEventView(e){
      this.setState({view: e}, ()=> this.mapCalEvents(this.state.view))
    }

 
    mapCalEvents(view) {
      let techArr = Object.values(this.state.technicians);
      let locArr = Object.values(this.state.locations);
      let workArr = Object.values(this.state.workOrders);

      
      if (
        workArr.length < 1 ||
        locArr.length < 1 ||
        techArr.length < 1
      )
        return;


      let technicians = this.state.technicians;
      let locations = this.state.locations;
      let events = []

      for (let i=0; i <  workArr.length; i++){
        let workOrder = workArr[i]

        let startTime = new Date(workOrder.time)
        let startHours = startTime.getHours();
        let startMinutes = startTime.getMinutes();
        let startYear = startTime.getFullYear()
        let startMonth = startTime.getMonth()
        let startDate = startTime.getDate()

        
        let endTime = new Date(startTime.getTime()+1000*60*60*(workOrder.duration/60))
        let endHours = endTime.getHours();
        let endMinutes = endTime.getMinutes();
        let endYear = endTime.getFullYear();
        let endMonth = endTime.getMonth();
        let endDate = endTime.getDate();

        let technician = technicians[workOrder.technician_id];
        let location = locations[workOrder.location_id];
        
        function formatTime(time){
          return new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }).replace(/^0(?:0:0?)?/, "");

        }
        
        
        function returnToolTip(){
          return <ReactTooltip id={`tooltip-${workOrder.id}`} place="left" type="dark" effect="float">
            
            <p>{formatTime(startTime)} - {formatTime(endTime)}</p>

             {/* Interpolated variables for readability */}
            <p>{`Technician: ${technician.name}`}</p>
            <p>{`Duration: ${workOrder.duration} mins`}</p>
            <p>{`Location: ${location.name} (${location.city})`}</p>
            <p>{`Price: $${workOrder.price}`}</p>
          </ReactTooltip>;
        }


        
          function eventDetails() {
            
            return (
              <div id={`work-order-${workOrder.id}`} className={view === "month" ? "compact-event" : "full-event"}>
                {view === "month" ? 
                  (<p>
                      {formatTime(startTime)} {" | "} 
                      {location.name} ({location.city}) - {technician.name}
                  </p>) : 
                  (
                    <div>
                        <p>{`${location.name} (${location.city})`}</p>
                        <p>{`$${workOrder.price} | ${workOrder.duration} mins`}</p>
                    </div>
                  )
                }
              </div>
            )
          }
          

        
        let title = (
          // <div className="event-container">
            <a
            className='tooltip'
              // className={this.state.event === "month" ? 'compact-event' : 'full-event' }
              data-tip="React-tooltip"
              data-for={`tooltip-${workOrder.id}`}
              // style={{ "z-index": 100 }}
            >
              
              {eventDetails()}
              {/* <div id={`work-order-${workOrder.id}`} className="event-title">
                <p>{`Duration: ${workOrder.duration} mins`}</p>
                <p>{`Location: ${location.name}`}</p>
                <p>{`City: ${location.city}`}</p>
                <p>{`Price: $${workOrder.price}`}</p>
              </div> */}


              {returnToolTip()}
            </a>
          // </div>
        );
        
          events.push({
            id: `work-order-${workOrder.id}`,
            title: title,
            resourceId: `tech-${workOrder.technician_id}`,
            start: new Date(startYear, startMonth, startDate, startHours, startMinutes),
            end: new Date(endYear, endMonth, endDate, endHours, endMinutes),
            // desc: `${location.name}-${location.city}`,
          });
      }
      this.setState({events: events})
    }




    // handleEvent(e){
    //   // let eventDivId = e.title.props.id;
    //   // let event = document.getElementById(eventDivId);

    //   let element = document.getElementsByClassName('rbc-selected')[0]
    //   debugger
    // }


    handleSelect(e){
      let resourceId = e.resourceId;
      let clickedTime = e.start;

      // Filter - select events that match clicked column's resourceId (aka technician) AND date
      let filtered = Object.values(this.state.events).filter(event => {
        return (
          (event.resourceId === resourceId) &&
          (event.start.getDate() === e.start.getDate() ||event.end.getDate() === e.start.getDate()) &&
          (event.start.getMonth() === e.start.getMonth() ||event.end.getMonth() === e.start.getMonth()) &&
          (event.start.getFullYear() === e.start.getFullYear() ||event.end.getFullYear() === e.start.getFullYear()) 
        )
      })

      if (filtered.length === 0) return;

      let startTime, endTime, dayStartMS, dayEndMS, durationMS, msg, duration;

      dayStartMS = new Date(clickedTime.getFullYear(), clickedTime.getMonth(), clickedTime.getDate(), 5, 0).getTime();
      dayEndMS = new Date(clickedTime.getFullYear(), clickedTime.getMonth(), clickedTime.getDate(), 19, 0).getTime();



      // 1) If clickedTime is before the first event, set 5am as the beginning of the day
      // 2) Else if clickedTime is after last event, set 7pm as end of day
      // 3) Else - get the difference of clickedTime's immediate neighbor events' endTime and StartTime for availabile duration

      if (clickedTime <= filtered[0].start) {
          if (clickedTime.getTime() < dayStartMS) {
            msg = 'Outside of working hours'
          } else {
            durationMS = filtered[0].start.getTime() - dayStartMS;
            duration = `${convertDuration(dayStartMS)} - ${convertDuration(filtered[0].start.getTime())}`
          }
      } else if (clickedTime >= filtered[filtered.length-1].end) {
          if (clickedTime.getTime() > dayEndMS) {
            msg = 'Outside of working hours'
          } else {
            durationMS = dayEndMS - filtered[filtered.length-1].end.getTime();
            duration = `${convertDuration(filtered[filtered.length-1].end.getTime())} - ${convertDuration(dayEndMS)} `
          }
      } else {
        for (let i =0; i < filtered.length-1; i++){
          if ((clickedTime >= filtered[i].end) && (clickedTime <= filtered[i+1].start)){
            startTime = filtered[i].end.getTime();
            endTime = filtered[i+1].start.getTime();
            durationMS = endTime - startTime;
            duration = `${convertDuration(startTime)} - ${convertDuration(endTime)} `
          }
        }
      }
      
      msg = msg || `${convertHoursAndMinutes(durationMS)} (${convertMinutes(durationMS)} mins)`
      

      function convertDuration(millisecTimeStamp) {
        let time = new Date(millisecTimeStamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }).replace(/^0(?:0:0?)?/, "");
        return time;
      }


      function convertHoursAndMinutes(millisec){
        let totalMins = convertMinutes(millisec)
        let calculatedHours = Math.floor(totalMins/60);
        let calculatedMins = totalMins % 60
        return `${calculatedHours} hrs ${calculatedMins} mins`
      }
    
      
      function convertMinutes(millisec) {
        let minutes = Math.floor(millisec / 60000);
        return minutes;
      }

      const alertMsg = (
        // <div>
        //   <p>{duration}</p>
        //   <p>{msg}</p>
        // </div>
        `${duration} | ${msg}`
      )

      alert(alertMsg);
    }





  render() {
    // if (
    //   !this.props.locations ||
    //   !this.props.technicians ||
    //   !this.props.workOrders
    // ) return null;
    
  
    const localizer = momentLocalizer(moment);


  // Resource JSON format:
  // const resources = [
  //   {
  //     id: "a",
  //     title: `Bill Keller`,
  //   },
  //   {
  //     id: "b",
  //     title: "Juan Garcia",
  //   },
  //   {
  //     id: "c",
  //     title: "Room C",
  //   },
  // ];


  function mapCalResources(technicians){

    let techniciansArr = Object.values(technicians);

    // if (techniciansArr.length === 0) return;
    let resources = [];

    for (let i = 0; i < techniciansArr.length; i++) {
      let technician = techniciansArr[i];

      resources.push({
        id: `tech-${technician.id}`,
        title: `${technician.name}`,
      });
    }
    
    return resources;
  }


  function dayStartTime(){
    let date = new Date();
      date.setHours(5);
      date.setMinutes(0);
      return date;
  }

  function dayEndTime(){
    let date = new Date();
      date.setHours(19);
      date.setMinutes(0);
      return date;
  }
  


  const columnClasses = [
    '.rbc-time-view', '.rbc-row', '.rbc-time-view-resources', '.rbc-day-slot'
    // '.rbc-time-view', '.rbc-row', '.rbc-time-view-resources', '.rbc-day-slot'
  ]

  function columnClassElements(){
    let elementGroup = [];

    for (let i=0; i < columnClasses.length; i++){
      let elements = document.getElementsByClassName(columnClasses[i])

      elementGroup = elementGroup.concat(Array.from(elements));
    }
    return elementGroup;
  }


    let btnGroup = document.getElementsByClassName("rbc-btn-group");
    // let navBtns = btnGroup[0];
    let viewBtns = btnGroup[1];

    if (viewBtns) {
      let children = viewBtns.children;

      for (let i=0; i < children.length; i++){
        let child = children[i];
        

        if (child.innerHTML === "Day" && child.className === "rbc-active") {
            changeColumn('fixed-width');
        }


        switch (child.innerHTML){
          case 'Day':
            child.addEventListener('click', e=> {e.preventDefault(); changeColumn('fixed-width')} );
            child.addEventListener('dblclick', e=> {e.preventDefault(); changeColumn('auto-width')} );
            break;
          case 'Week':
            child.addEventListener('click', e=> {e.preventDefault(); changeColumn('auto-width')} );
            break;
          default:
            child.addEventListener('click', e=> {e.preventDefault(); changeColumn('auto-width')} );
        }

      } 
    }
    
    function changeColumn(type){
      let elements = columnClasses;

      switch (type) {
        case 'fixed-width':
          mapFixed();
          break;
        case 'auto-width':
          mapAuto();
          break;
        default:
          mapAuto();
      }

        function mapFixed(){
          for (let j=0; j< elements.length; j++){
            $(elements[j]).css("min-width", "")
            $(elements[j]).css("min-width", "450px")
          }         
        }
        
        function mapAuto(){
          for (let j=0; j< elements.length; j++){
            $(elements[j]).css("min-width", "")
            $(elements[j]).css("width", "100%")
          }         
        }
    }
  
    let customEvent = [
      {
        id: 0,
        title: "All Day Event very long title",
        allDay: true,
        start: new Date(2020, 6, 28, 8, 0),
        end: new Date(2020, 6, 28, 12, 0),
        resourceId: "tech-1",
      },
      {
        id: 1,
        title: "Long Event",
        start: new Date(2020, 6, 28, 14, 0),
        end: new Date(2020, 6, 28, 17, 0),
        resourceId: "tech-2",
      },

      {
        id: 2,
        title: "DTS STARTS",
        start: new Date(2020, 6, 29, 10, 30, 0),
        end: new Date(2020, 6, 29, 12, 30, 0),
        resourceId: "tech-3",
      },

      {
        id: 3,
        title: "DTS ENDS",
        start: new Date(2020, 6, 30, 14, 30, 0),
        end: new Date(2020, 6, 30, 17, 30, 0),
        resourceId: "tech-4",
      },
    ];

    // let calComponents = {
    //     views : {day: true, month: true},  
    //     events: customEvent 
    // }
  
    return (
      <div>
        <h3>Schedule</h3>

        {Object.values(this.state.workOrders).length > 0 ? (
          <div>
            <Calendar
              selectable
              onSelectSlot={e => this.handleSelect(e)}
              resources={mapCalResources(this.state.technicians)}
              // {...calComponents}

              events={this.state.events}
              localizer={localizer}
              culture="en-US"
              startAccessor="start"
              endAccessor="end"
              defaultDate={new Date()}
              // views={["day", "week", "month"]}
              views={{ day: true, month: true }}
              // defaultView="day"
              defaultView={Views.MONTH}
              defaultDate={new Date(2019, 9, 1)}
              popup={true}
              // step={7.5}
              min={dayStartTime()}
              max={dayEndTime()}
              style={{ height: 800 }}
              // onSelectEvent={(event) => this.handleEvent(event)}
              onView={(event) => this.changeEventView(event)}
            />
          </div>
        ) : null}
      </div>
    );
  }
}


export default Schedule;













    
    