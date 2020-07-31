import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import ReactTooltip from "react-tooltip";
// import { debug } from "webpack";






class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      locations: [],
      technicians:[],
      workOrders: [],
      events: [],
      view: "month",
      tooltipAvailability: ""
    };
    // this.workOrderList = this.workOrderList.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.changeEventView = this.changeEventView.bind(this);
    this.handleSelectSlot = this.handleSelectSlot.bind(this)
    this.addToolbarBtns = this.addToolbarBtns.bind(this);
  }

  componentDidMount(){
    //  let switchViewBtn = document.getElementById('switch-view');

    // if (switchViewBtn) switchViewBtn.parentElement.removeChild(switchViewBtn);
    
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
        }, () => {this.mapCalEvents(this.state.view)
            this.addToolbarBtns();
          }
        );
    }

    let switchViewBtn = document.getElementById('switch-view')
    if (!!switchViewBtn){
      if (prevState.view !== this.state.view){
        // addActive(this.state.view)
        if (this.state.view === "month") {
          switchViewBtn.classList.remove("rbc-active");
          switchViewBtn.style.backgroundColor = "white";
        }
      }
        switchViewBtn.addEventListener('click', () => addActive(this.state.view))
    }
    
    function addActive(view){
      // e.preventDefault();
      if (view === 'day'){
        switchViewBtn.style.backgroundColor = "";
        switchViewBtn.classList.add('rbc-active')
      } else if (view === 'month') {
        switchViewBtn.classList.remove('rbc-active')
        switchViewBtn.style.backgroundColor ='white'
      }
    }
  }

  // componentWillUnmount(){
  //   let switchViewBtn = document.getElementById('switch-view');

  //   switchViewBtn.parentElement.removeChild(switchViewBtn);
  // }


  
  
   addToolbarBtns(){
      const columnClasses = ['.rbc-time-view', '.rbc-row', '.rbc-time-view-resources', '.rbc-day-slot']

      let btnGroup = document.getElementsByClassName("rbc-btn-group");
      // let toolbar = document.getElementsByClassName('rbc-toolbar')[0]
      
      let viewBtns = btnGroup[1];
      
      let switchViewBtn = document.createElement('button')
      switchViewBtn.textContent = 'Wide View'
      switchViewBtn.id = 'switch-view'

      switchViewBtn.addEventListener('click', function(e){
        e.preventDefault()
          changeColumn("fixed-width");
      })

      if (viewBtns) {
        
        if (viewBtns.parentElement.querySelector('#switch-view') === null) {
          viewBtns.parentElement.appendChild(switchViewBtn);
        }
      
        let children = viewBtns.children;

        for (let i=0; i < children.length; i++){
          let child = children[i];

          if (child.innerHTML === "Day" && child.className === "rbc-active") {
              changeColumn('auto-width');
          }
        }
      }
      


       function changeColumn(type) {
         let elements = columnClasses;

         switch (type) {
           case "fixed-width":
             mapFixed();
             break;
           case "auto-width":
             mapAuto();
             break;
           default:
             mapAuto();
         }

         function mapFixed() {
           for (let j = 0; j < elements.length; j++) {
             $(elements[j]).css("min-width", "");
             $(elements[j]).css("min-width", "450px");
           }
         }

         function mapAuto() {
           for (let j = 0; j < elements.length; j++) {
             $(elements[j]).css("min-width", "");
             $(elements[j]).css("width", "100%");
           }
         }
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
          return (
            <ReactTooltip
              id={`tooltip-${workOrder.id}`}
              className="tooltip-event"
              // place={view === "month" ? "left" : "top"}
              place={"top"}
              // type="dark"
              // effect={"float"}
            >
              <h3>
                {formatTime(startTime)} - {formatTime(endTime)}
              </h3>

              {/* Interpolated variables for readability */}
              <p>{`Technician: ${technician.name}`}</p>
              <p>{`Location: ${location.name} (${location.city})`}</p>
              <p>{`Duration: ${workOrder.duration} mins`}</p>
              <p>{`Price: $${workOrder.price}`}</p>
            </ReactTooltip>
          );
        }


        
          function eventDetails() {
            
            return (
              <div
                id={`work-order-${workOrder.id}`}
                className={view === "month" ? "compact-event" : "full-event"}
              >
                {view === "month" ? (
                  <p>
                    {formatTime(startTime)} {" | "}
                    {location.name} ({location.city}) - {technician.name}
                  </p>
                ) : (
                  <div>
                    <strong>
                      <p>{`${location.name} (${location.city})`}</p>
                    </strong>
                      <p>{`$${workOrder.price} - ${workOrder.duration} mins`}</p>
                  </div>
                )}
              </div>
            );
          }
          

        
        let title = (
          <a
            className="tooltip-event"
            data-tip="React-tooltip"
            data-for={`tooltip-${workOrder.id}`}
            type="dark"
            // data-border="true"
            // data-background-color="white"
            // data-border-color="#3174ad"
            // data-border-color="#dcdcdc"
          >
            {eventDetails()}
            {returnToolTip()}
          </a>
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




    handleEvent(e){
      // Disables tooltip popup when dblclicking on event
      this.setState({ tooltipAvailability: "" });
    }


    handleSelectSlot(e){
      
      let resourceId = e.resourceId;
      let clickedTime = e.start;

      // Filter - select events that match clicked slot's resourceId (aka technician) AND date
      let filtered = Object.values(this.state.events).filter(event => {
        return (
          (event.resourceId === resourceId) &&
          (event.start.getDate() === e.start.getDate() ||event.end.getDate() === e.start.getDate()) &&
          (event.start.getMonth() === e.start.getMonth() ||event.end.getMonth() === e.start.getMonth()) &&
          (event.start.getFullYear() === e.start.getFullYear() ||event.end.getFullYear() === e.start.getFullYear()) 
        )
      })

      filtered = filtered.sort(function (a, b) {
        return a.start.getTime() - b.start.getTime();
      });

      let startTime, endTime, dayStartMS, dayEndMS, durationMS, msg, duration;

      dayStartMS = new Date(clickedTime.getFullYear(), clickedTime.getMonth(), clickedTime.getDate(), 5, 0).getTime();
      dayEndMS = new Date(clickedTime.getFullYear(), clickedTime.getMonth(), clickedTime.getDate(), 19, 0).getTime();



      // 1) If clickedTime is before the first event, set 5am as the beginning of the day
      // 2) Else if clickedTime is after last event, set 7pm as end of day
      // 3) Else - get the difference of clickedTime's immediate neighbor events' endTime and StartTime for availabile duration
      if (filtered.length === 0) {
        msg = "All Day"
      } else if (clickedTime <= filtered[0].start) {
        if (clickedTime.getTime() < dayStartMS) {
          msg = "Outside of working hours";
        } else {
          durationMS = filtered[0].start.getTime() - dayStartMS;
          duration = `${convertDuration(dayStartMS)} - ${convertDuration(
            filtered[0].start.getTime()
          )}`;
        }
      } else if (clickedTime >= filtered[filtered.length - 1].end) {
        if (clickedTime.getTime() > dayEndMS) {
          msg = "Outside of working hours";
        } else {
          durationMS = dayEndMS - filtered[filtered.length - 1].end.getTime();
          duration = `${convertDuration(
            filtered[filtered.length - 1].end.getTime()
          )} - ${convertDuration(dayEndMS)} `;
        }
      } else {
        
        for (let i = 0; i < filtered.length - 1; i++) {
            let iEvent = filtered[i];
            let jEvent = filtered[i+1];

          if ((clickedTime >= iEvent.start.getTime() && clickedTime < iEvent.end.getTime())){
            return;
          }
          

          if (iEvent.end.getTime() > jEvent.start.getTime() || jEvent.end.getTime() < clickedTime) {
              continue
          } else if (clickedTime <= iEvent.end.getTime() && clickedTime < jEvent.start.getTime()) {
            startTime = iEvent.end.getTime();
            endTime = jEvent.start.getTime();
            durationMS = endTime - startTime;
            duration = `${convertDuration(startTime)} - ${convertDuration(endTime)} `;
            break;
          }
            
            
            else if (clickedTime < jEvent.start.getTime() && clickedTime >= iEvent.end.getTime()){
                startTime = iEvent.end.getTime();
                endTime = jEvent.start.getTime();
                durationMS = endTime - startTime;
                duration = `${convertDuration(startTime)} - ${convertDuration(endTime)} `;
                break;
              }
            }
          }

       




            // if (iEvent.end.getTime() <= jEvent.start.getTime() || jEvent.end.getTime() <= clickedTime )  {
            //   continue;
            // } else if (iEvent.end.getTime() < jEvent.start.getTime()){
            //   startTime = iEvent.end.getTime();
            //   endTime = jEvent.start.getTime();


              
            // } else if (iEvent.end.getTime() <= clickedTime && clickedTime <= jEvent.start.getTime()){
            //   startTime = iEvent.end.getTime();
            //   endTime = jEvent.start.getTime();

            //   durationMS = endTime - startTime;
            //   duration = `${convertDuration(startTime)} - ${convertDuration(endTime)} `;
            // }
            
            // } else {
            //   startTime = iEvent.end.getTime();
            //   endTime = jEvent.start.getTime();
            //   durationMS = endTime - startTime;
            //   duration = `${convertDuration(startTime)} - ${convertDuration(endTime)}`
            // }


            
            // } else if (iEvent.end.getTime() <= clickedTime && clickedTime <= jEvent.start.getTime()){
            //   startTime = iEvent.end.getTime();
            //   endTime = jEvent.start.getTime();

            //   durationMS = endTime - startTime;
            //   duration = `${convertDuration(startTime)} - ${convertDuration(endTime)} `;
            // } else {
            //   continue;
            // }
            
        // }
      // }



          // if (
          //   clickedTime >= filtered[i].end &&
          //   clickedTime <= filtered[i + 1].start
          // ) {
          //   startTime = filtered[i].end.getTime();
          //   endTime = filtered[i + 1].start.getTime();
          //   durationMS = endTime - startTime;
          //   duration = `${convertDuration(startTime)} - ${convertDuration(
          //     endTime
          //   )} `;
          // }
      
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
        <div>
          <h3>Available Time</h3>
          <p>{duration ? duration : null}</p>
          <p>{msg}</p>
        </div>
        // `${duration} | ${msg}`
      );
      this.setState({tooltipAvailability: alertMsg})
    }





  render() {
    // if (
    //   !this.props.locations ||
    //   !this.props.technicians ||
    //   !this.props.workOrders
    // ) return null;
      
    
    const localizer = momentLocalizer(moment);

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
  

  
    return (
      <div>
        {/* <h3>Schedule</h3> */}

        {Object.values(this.state.workOrders).length > 0 ? (
            <div
              className="tooltip-availability"
              data-tip=""
              data-for={`tooltip-availability`}
              data-event={"dblclick"}
            >
              <Calendar
                selectable
                onSelectSlot={(e) => this.handleSelectSlot(e)}
                onSelectEvent={(e) => this.handleEvent(e)}
                resources={mapCalResources(this.state.technicians)}
                events={this.state.events}
                localizer={localizer}
                culture="en-US"
                startAccessor="start"
                endAccessor="end"
                defaultDate={new Date()}
                views={{ month: true, day: true }}
                defaultView={Views.MONTH}
                defaultDate={new Date(2019, 9, 1)}
                popup={true}
                // Step 7.5 for 15min increments, 15 for 30min increments, default 1hr
                // step={7.5} 
                min={dayStartTime()}
                max={dayEndTime()}
                // style={{ maxHeight: '90vw', 'maxWidth': '99vw', padding: 15 }}
                style={{ height:  850, width: '99vw', padding: 0, overflow: 'scroll' }}
                onView={(event) => this.changeEventView(event)}
              />
            </div>

) : null}
            { this.state.view === 'day' ?
              (<ReactTooltip
              id={`tooltip-availability`}
              aria-haspopup="true"
              place="top"
              type="dark"
              effect="float"
              globalEventOff="click"
              >
                {/* <h3>Available Time</h3> */}
                {this.state.tooltipAvailability}
              </ReactTooltip>) : null
            }
      </div>
    );
  }
}


export default Schedule;













    
    