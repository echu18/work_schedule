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
      view: "month",
      size: "compact"
    };
    // this.workOrderList = this.workOrderList.bind(this);
    // this.handleEvent = this.handleEvent.bind(this);
    this.changeEventView = this.changeEventView.bind(this);
    this.mapCalEvents = this.mapCalEvents.bind(this);
    this.addBtnEventListeners = this.addBtnEventListeners.bind(this);
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
            }, () => this.mapCalEvents(this.state.view, this.state.size))
          )
        
  }


  componentDidUpdate(prevProps, prevState){
    let thisLocations = Object.values(this.props.locations).length > 0
    let thisTechnicians = Object.values(this.props.technicians).length > 0
    let thisWorkOrders = Object.values(this.props.workOrders).length > 0

    
    // if ((prevProps !== this.props) && (thisLocations && thisTechnicians && thisWorkOrders)) {
    if (prevProps !== this.props) {
      this.setState(
        {
          locations: this.props.locations,
          technicians: this.props.technicians,
          workOrders: this.props.workOrders,
        },
        () => this.mapCalEvents(this.state.view, this.state.size)
      );
      this.addBtnEventListeners(this.mapCalEvents)
    }

  }

//   handleDataType(e) {
//     e.preventDefault();
//     this.setState({ dataType: e.target.value });
//     //     if (e.target.files.length) {
//     //         this.setState({file: e.target.files[0]})
//     //     }
//   }

//   handleFile(data, fileInfo) {
//     console.log(data, fileInfo);
//     this.setState({ fileData: data });
//   }

//   handleSubmit(e) {
//     e.preventDefault();

//     if (this.state.fileData && this.state.dataType !== "") {
//       this.props.uploadFile(this.state.dataType, this.state.fileData);
//     }
//   }

    changeEventView(e){
      this.setState({view: e}, ()=> this.mapCalEvents(this.state.view, this.state.size))
    }

 
    mapCalEvents(view, size) {
      // if (
      //   this.state.workOrders.length < 1 ||
      //   this.state.locations.length < 1 ||
      //   this.state.technicians.length < 1
      // ) return;
      
      
  
      let technicians = this.state.technicians;
      let locations = this.state.locations;
      let workOrders = this.state.workOrders;

      if (
        Object.values(technicians).length < 1 || Object.values(locations).length < 1 || Object.values(workOrders).length < 1
      ) return;


      let events = []
      for (let i=0; i < Object.values(workOrders).length; i++) {
        
        let workOrder = Object.values(workOrders)[i]
        
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
        
        function formatTime(time) {
          return new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
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
              <div
                id={`work-order-${workOrder.id}`}
                className={view === "month" ? "compact-event" : "full-event"}
              >
                {/* {(view === "day" && size !== 'compact') ?  */}
                {(view === "day") ? 
                  (<div>
                    <p>{`Duration: ${workOrder.duration} mins`}</p>
                    <p>{`Location: ${location.name} (${location.city})`}</p>
                    {/* <p>{`City: ${location.city}`}</p> */}
                    <p>{`Price: $${workOrder.price}`}</p>
                  </div>) : 

                  (<div><p>
                    {formatTime(startTime)} - {formatTime(endTime)} |{" "}
                    {location.name} {location.city} | {technician.name}
                  </p>
                  </div>) 
                }
              </div>
            );
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
              {/* <div id={`work-order-${workOrder.id}`} className="full-event">
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
          // resourceId: `tech-${workOrder.technician_id === 1 ? "1" : workOrder.technician_id + 1 }`,
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
    // }


    addBtnEventListeners(mapEvents){
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
            case 'Month':
              child.addEventListener('click', e=> {e.preventDefault(); changeColumn('auto-width')} );
              break;
            case 'Week':
              child.addEventListener('click', e=> {e.preventDefault(); changeColumn('auto-width')} );
              break;
            default:
              child.addEventListener('click', e=> {e.preventDefault(); changeColumn('auto-width')} );
          }
        } 
      }


       const columnClasses = ['.rbc-time-view', '.rbc-row', '.rbc-time-view-resources', '.rbc-day-slot']


      const view = this.state.view
      const size = this.state.size


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


      function mapFixed(view){
        for (let i=0; i< elements.length; i++){
          $(elements[i]).css("min-width", "")
          $(elements[i]).css("min-width", "400px")
        }         

        let events = document.getElementsByClassName("compact-event");
        if (events.length === 0) return;

        for (let j = 0; j < events.length; j++) {
          events[j].classList.add("full-event");
          events[j].classList.remove("compact-event");
        }

        // mapEvents(view, size)
        // this.setState({ size: "full" }, () => this.mapCalEvents(this.state.view, this.state.size));
        // this.setState({ size: "full" });
      }
      
      function mapAuto(){
        for (let i=0; i< elements.length; i++){
          $(elements[i]).css("min-width", "")
          $(elements[i]).css("width", "100%")
        }         

        let events = document.getElementsByClassName("full-event");
        if (events.length === 0) return;


        for (let j = 0; j < events.length; j++) {
          events[j].classList.add("compact-event")
          events[j].classList.remove("full-event");
        }
        
        // mapEvents(view, size)
        // this.setState({size: "compact"}, () => this.mapCalEvents(this.state.view, this.state.size))
        // this.setState({size: "compact"})
      }
    }
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
    if (!technicians) return;
    let resources = [];

    for (let i=0; i < technicians.length; i++){
      let technician = technicians[i];
      
      resources.push({id:`tech-${technician.id}`, title: `${technician.name}`})
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
  


   

 
    // let btnGroup = document.getElementsByClassName("rbc-btn-group");
    // // let navBtns = btnGroup[0];
    // let viewBtns = btnGroup[1];

    // if (viewBtns) {
    //   let children = viewBtns.children;

    //   for (let i=0; i < children.length; i++){
    //     let child = children[i];

    //     if (child.innerHTML === "Day" && child.className === "rbc-active") {
    //         changeColumn('fixed-width');
    //     }
        
    //     switch (child.innerHTML){
    //       case 'Day':
    //         child.addEventListener('click', e=> {e.preventDefault(); changeColumn('fixed-width')} );
    //         child.addEventListener('dblclick', e=> {e.preventDefault(); changeColumn('auto-width')} );
    //         break;
    //       case 'Month':
    //         child.addEventListener('click', e=> {e.preventDefault(); changeColumn('auto-width')} );
    //         break;
    //       case 'Week':
    //         child.addEventListener('click', e=> {e.preventDefault(); changeColumn('auto-width')} );
    //         break;
    //       default:
    //         child.addEventListener('click', e=> {e.preventDefault(); changeColumn('auto-width')} );
    //     }
    //   } 
    
    
    
    

    
  
    // let testEvents = [
    //   {
    //     id: 0,
    //     title: "All Day Event very long title",
    //     allDay: true,
    //     start: new Date(2020, 6, 28, 8, 0),
    //     end: new Date(2020, 6, 28, 12, 0),
    //     resourceId: "tech-1",
    //   },
    //   {
    //     id: 1,
    //     title: "Long Event",
    //     start: new Date(2020, 6, 28, 14, 0),
    //     end: new Date(2020, 6, 28, 17, 0),
    //     resourceId: "tech-2",
    //   },

    //   {
    //     id: 2,
    //     title: "DTS STARTS",
    //     start: new Date(2020, 6, 29, 10, 30, 0),
    //     end: new Date(2020, 6, 29, 12, 30, 0),
    //     resourceId: "tech-3",
    //   },

    //   {
    //     id: 3,
    //     title: "DTS ENDS",
    //     start: new Date(2020, 6, 30, 14, 30, 0),
    //     end: new Date(2020, 6, 30, 17, 30, 0),
    //     resourceId: "tech-4",
    //   },
    // ];

    // let calComponents = {
    //     views : {day: true, month: true},  
    //     events: testEvents 
    // }
  
    return (
      <div>
        <h3>Schedule</h3>

        {Object.values(this.state.workOrders).length > 0 ? (
          <div>
            <Calendar
              selectable
              resources={mapCalResources(Object.values(this.state.technicians))}
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
              step={15}
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













    
    // function mapCalEvents(workOrders, locations) {
    //   if (workOrders.length < 1 || !locations ) return;
      

    //   for (let i = 0; i < workOrders.length; i++) {
    //     // debugger
    //     let workOrder = workOrders[i];
    //     // let time = new Date(workOrder.time)
    //     // let hours = time.getHours();
    //     // let minutes = time.getMinutes();
    //     let location = locations[workOrder.location_id];

    //     events.push({
    //       // id: `work-order-${workOrder.id}`,
    //       // title: `Start: ${hours}:${minutes}`,
    //       title: `Start: 10:30`,
    //       resourceId: `tech-${workOrder.technician_id}`,
    //       // start: time,
    //       // end: (time + workOrder.duration),
    //       start: new Date(2020, 6, 28, 10, 30),
    //       end: new Date(2020, 6, 28, 12, 0),
    //       // desc: `${location}`,
    //     });
    //   }

    // //     events.concat([{
    // //   id: 0,
    // //   title: "All Day Event very long title",
    // //   start: new Date(2020, 6, 28, 10, 30),
    // //   end: new Date(2020, 6, 28, 12, 0),
    // //   resourceId: "tech-1",
    // // },
    // // {
    // //   id: 1,
    // //   title: "Long Event",
    // //   start: new Date(2020, 6, 28, 13, 30),
    // //   end: new Date(2020, 6, 28, 15, 0),
    // //   resourceId: "tech-2",
    // // },

    // // {
    // //   id: 2,
    // //   title: "DTS STARTS",
    // //   start: new Date(2020, 6, 28, 17, 0, 0),
    // //   end: new Date(2020, 6, 28, 19, 0, 0),
    // //   resource: "tech-3",
    // // }])

    // debugger
    //   // return Object.assign({}, events);
    //   // return {event: events};
    //   // return {events};
    // }






    //   let children = viewBtns.children;
  //   for (let i=0; i < children.length; i++){
  //     let child = children[i];
      
  //     if (child.innerHTML === "Day" && child.className === "rbc-active") {
  //       let elements = columnClassElements();
  //       elements.forEach((el) => el.setAttribute("style", "min-width: 250px !important;"));
  //     }
      
  //     // updateCols(children[i])
  //     if (child.innerHTML === 'Day'){
  //       child.addEventListener('click', e=> {e.preventDefault(); 
  //         debugger
  //         let elements = columnClassElements();
  //         elements.forEach((el) => el.setAttribute("style", "min-width: 250px !important;"));
  //       })
  //     }
  //   }
  // };
  
  // function updateCols(child){
    
  //   if (child.innerHTML === 'Day' && child.className === 'rbc-active') {
  //     // child.addEventListener('click', function(){
  //       let elements = columnClassElements();
  //       elements.forEach(el => el.setAttribute("style", "min-width: 250px;"))
  //       // elements.forEach(el => el.setAttribute("style", "border: 1px solid red;"))
  //     // })
  //   }
  // }
  
