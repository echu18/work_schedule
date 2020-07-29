import React from "react";
import ReactDOM from "react-dom";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";





class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      locations: [],
      technicians:[],
      workOrders: [],
      events: []
    };
    // this.workOrderList = this.workOrderList.bind(this);
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
            }, () => this.mapCalEvents())
          )
        
  }


  componentDidUpdate(prevProps, prevState){
    if (prevProps !== this.props) {
      this.setState(
        {
          locations: this.props.locations,
          technicians: this.props.technicians,
          workOrders: this.props.workOrders,
        },
        () => this.mapCalEvents()
      );
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

  

 
    mapCalEvents() {
      if (this.state.workOrders.length < 1 || this.state.locations.length < 1 ) return;
      let events = []

      
      let locations = this.state.locations;

      this.state.workOrders.forEach(workOrder => {
        // let workOrder = Object.values(this.state.workOrders)[i];
        let time = new Date(workOrder.time)
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let year = time.getFullYear()
        let month = time.getMonth()
        let date = time.getDate()


        let newTime = new Date(time.getTime()+1000*60*60*(workOrder.duration/60))
        let newHours = newTime.getHours();
        let newMinutes = newTime.getMinutes();
        let newYear = newTime.getFullYear();
        let newMonth = newTime.getMonth();
        let newDate = newTime.getDate();

        let location = locations[workOrder.location_id];
        
        
        let title = (
          <div>
            {/* <p>{`Start at: ${hours}:${minutes}`}</p> */}
            {/* <p>{`Start at: ${time}`}</p> */}
            {/* <p>{`End at: ${newTime}`}</p> */}
            <p>{`Duration: ${workOrder.duration} mins`}</p>
            <p>{`Location: ${location.name}`}</p>
            <p>{`City: ${location.city}`}</p>
            <p>{`Price: $${workOrder.price}`}</p>
          </div>
          // `Start at ${time}
          // Location: ${location.name}
          // City: ${location.city}`
          );
        
          events.push({
            id: `work-order-${workOrder.id}`,
            // title: `Start: ${hours}:${minutes}`,
            title: title,
            resourceId: `tech-${workOrder.technician_id}`,
            // start: time,
            // end: (time + workOrder.duration),
            start: new Date(year, month, date, hours, minutes),
            end: new Date(newYear, newMonth, newDate, newHours, newMinutes),
            // desc: `${location.name}-${location.city}`,
          });
        
      })

    //     events.push({
    //   id: 0,
    //   title: "All Day Event very long title",
    //   start: new Date(2020, 6, 28, 10, 30),
    //   end: new Date(2020, 6, 28, 12, 0),
    //   resourceId: "tech-1",
    // },
    // {
    //   id: 1,
    //   title: "Long Event",
    //   start: new Date(2020, 6, 28, 13, 30),
    //   end: new Date(2020, 6, 28, 15, 0),
    //   resourceId: "tech-2",
    // },

    // {
    //   id: 2,
    //   title: "DTS STARTS",
    //   start: new Date(2020, 6, 28, 17, 0, 0),
    //   end: new Date(2020, 6, 28, 19, 0, 0),
    //   resource: "tech-3",
    // })

      this.setState({events: events})
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
  


  
    return (
      <div>
        <h3>Schedule</h3>

        {this.state.workOrders.length > 0 ? (
          <Calendar
            resources={mapCalResources(this.state.technicians)}
            // events={[mapCalEvents(this.state.workOrders, this.state.locations)]}
            events={this.state.events}
            // events={events}
            localizer={localizer}
            culture="en-US"
            startAccessor="start"
            endAccessor="end"
            defaultDate={new Date()}
            views={["day", "week", "month"]}
            // views={['day', 'week', 'month']}
            defaultView="day"
            // step={7.5}
            min={dayStartTime()}
            max={dayEndTime()}
            style={{ height: 800 }}
            // onSelectEvent={(event) => console.log(event.title.innhe)}

            // onView={changeMinWidth(this.view)}
          />
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
  
