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
        let newTime = new Date(time.getTime()+1000*60*60*(workOrder.duration/60))
        let location = locations[workOrder.location_id];
        
        
        let title = (
          <div>
            {/* <p>{`Start at: ${hours}:${minutes}`}</p> */}
            <p>{`Start at: ${time}`}</p>
            {/* <p>{`End at: ${newTime}`}</p>
            <p>{`Duration: ${workOrder.duration}`}</p>
            <p>{`Location: ${location.name}`}</p>
            <p>{`City: ${location.city}`}</p> */}
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
            start: new Date(2020, 6, 28, 10, 30),
            end: new Date(2020, 6, 28, 12, 0),
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
    
    

  // let {locations, technicians, workOrders} = this.props;


  const localizer = momentLocalizer(moment);


  // const events = [
  //   {
  //     id: 1,
  //     title: "Muffin fiesta",
  //     resourceId: "tech-1",
  //     start: new Date(2020, 7, 28, 5, 30, 0, 0),
  //     end: new Date(2020, 7, 28, 10, 30, 0, 0),
  //     desc: "",
  //   },
  //   {
  //     title: "Cake fiesta",
  //     resourceId: "tech-1",
  //     start: new Date(2020, 7, 28, 13, 30, 0, 0),
  //     end: new Date(2020, 7, 28, 17, 30, 0, 0),
  //   },
  // ];


  // const events = [
  //   {
  //     id: 0,
  //     title: "All Day Event very long title",
  //     start: new Date(2020, 6, 28, 10, 30),
  //     end: new Date(2020, 6, 28, 12, 0),
  //     resourceId: "tech-1",
  //     tooltip: "nugget",
  //   },
  //   {
  //     id: 1,
  //     title: "Long Event",
  //     start: new Date(2020, 6, 28, 13, 30),
  //     end: new Date(2020, 6, 28, 15, 0),
  //     resourceId: "tech-2",
  //     tooltip: "fries",
  //   },

  //   {
  //     id: 2,
  //     title: "DTS STARTS",
  //     start: new Date(2020, 6, 28, 17, 0, 0),
  //     end: new Date(2020, 6, 28, 19, 0, 0),
  //     resourceId: "tech-3",
  //     tooltip: "hello",
  //     desc: "hello"
  //   },
  // ];

    // const events = [];

    
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
  
  
    return (
      <div>
        <h3>Schedule</h3>

        {/* <h3>Locations</h3>
        {this.props.locations.map((location) => {
          return (
            <div>
              <p>
                {location.name} - {location.city}
              </p>
            </div>
          );
        })}

        <h3>Technicians</h3> */}
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
          defaultView="day"
          step={7.5}
          min={dayStartTime()}
          max={dayEndTime()}
          style={{ height: 800 }}
        />
    ) : null}
      </div>
    );
  }
}

export default Schedule;
