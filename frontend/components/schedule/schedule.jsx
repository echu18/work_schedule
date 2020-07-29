import React from "react";
import ReactDOM from "react-dom";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";





class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false
      // locations: "",
      // technicians: "",
      // workOrders: ""
    };
    // this.workOrderList = this.workOrderList.bind(this);
  }

  componentDidMount(){
      this.props.fetchAllWorkOrders()
        .then(this.props.fetchAllTechnicians())
        .then(this.props.fetchAllLocations())
        // .then(() => this.setState({ render: true }));


      // this.props.fetchAllTechnicians()
      // .then(() => this.props.fetchAllLocations())
      //   .then(() => this.props.fetchAllWorkOrders())
      //   .then(() => this.setState({ render: true }));
    

    // Promise.all([this.props.fetchAllWorkOrders(), this.props.fetchAllTechnicians(), this.props.fetchAllLocations() ])
    //   .then(this.setState({render: true}))  
    
    // return function(){ 
    //   this.props.fetchAllTechnicians();
    //   this.props.fetchAllLocations()
    //   this.setState({locations: this.props.locations, technicians: this.props.technicians})
    // }
  }


  componentDidUpdate(prevProps, prevState){
    if (prevProps !== this.props) {
      this.setState({render: true})
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



    // workOrderList() {
    
    //   // let list = this.props.workOrders.filter(workOrder =>
    //   //   workOrder.technician_id === technicianId)
    //   // debugger
    //   // return list.map(workOrder => {
    //   //   let location = this.props.locations[workOrder.location_id];
    //   //   let technician = this.props.technicians[technicianId];

    //   //   if (!location || !technician) return null;


    //   //   return (<ul>
    //   //     <li>WorkOrder id: {workOrder.id}</li>
    //   //     <li>Location name: {location.name}</li>
    //   //     <li>Location city: {location.city}</li>
          
    //   //     </ul>)
    //   // })


    //   if (!this.props.locations || !this.props.technicians) return null;

    //     this.props.technicians.map((technician) => {
    //     let list = this.props.workOrders.filter(workOrder =>
    //       workOrder.technician_id === technician.id)

          
    //       return (
    //         <div><p>id: {technician.id} - {technician.name}</p>

    //         {list.map(workOrder => {
    //           let location = this.props.locations[workOrder.location_id];
    //           let technician = this.props.technicians[technician.id];

    //           return (
    //             <ul>
    //               <li>Technician: {technician.name}</li>
    //               <li>WorkOrder id: {workOrder.id}</li>
    //               <li>Location name: {location.name}</li>
    //               <li>Location city: {location.city}</li>
    //             </ul>
    //             )
    //         })}
    //         </div>
    //       );
    //     });
    // }

  render() {

    

    // if (
    //   !this.props.locations ||
    //   !this.props.technicians ||
    //   !this.props.workOrders
    // ) return null;
    


    let {locations, technicians, workOrders} = this.props;


    // function mapTechnicians(technicians, workOrders) {
    //   debugger
    //   function getWorkOrders(technicianId){
    //     return workOrders.filter(workOrder => workOrder.technician_id === technicianId)
    //   }


    //   let mappedTechnicians = []

    //   for (let i=0; i < technicians.length; i++) {
    //       let technician = technicians[i]
    //       let filteredOrders = getWorkOrders(technician.id)

    //       mapped.push([<div>
    //               <p>{technician.name}-{technician.id}</p>
    //               <p>{filteredOrders[0].time}</p>
    //       </div>])
    //   }
    

    //   return mappedTechnicians;
    // }



    // const localizer = globalizeLocalizer(globalize);

    // const MyCalendar = (props) => (
    //   <div>
    //     <Calendar
    //       localizer={localizer}
    //       events={myEventsList}
    //       startAccessor="start"
    //       endAccessor="end"
    //       style={{ height: 500 }}
    //     />
    //   </div>
    // );


  const localizer = momentLocalizer(moment);


  // const events = [
  //   {
  //     title: "Muffin fiesta",
  //     resourceId: "a",
  //     start: new Date(2015, 3, 1, 5, 30, 0, 0),
  //     end: new Date(2015, 3, 1, 10, 30, 0, 0),
  //   },
  //   {
  //     title: "Cake fiesta",
  //     resourceId: "b",
  //     start: new Date(2015, 3, 1, 2, 30, 0, 0),
  //     end: new Date(2015, 3, 1, 4, 30, 0, 0),
  //   },
  // ];



    const myEventsList = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1)
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10)
  },

  {
    id: 2,
    title: "DTS STARTS",
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0)
  },

  {
    id: 3,
    title: "DTS ENDS",
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0)
  },

  {
    id: 4,
    title: "Some Event",
    start: new Date(2015, 3, 9, 0, 0, 0),
    end: new Date(2015, 3, 9, 0, 0, 0)
  },
  {
    id: 5,
    title: "Conference",
    start: new Date(2015, 3, 11),
    end: new Date(2015, 3, 13),
    desc: "Big conference for important people"
  },
  {
    id: 6,
    title: "Meeting",
    start: new Date(2015, 3, 12, 10, 30, 0, 0),
    end: new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting"
  },
  {
    id: 7,
    title: "Lunch",
    start: new Date(2015, 3, 12, 12, 0, 0, 0),
    end: new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: "Power lunch"
  },
  {
    id: 8,
    title: "Meeting",
    start: new Date(2015, 3, 12, 14, 0, 0, 0),
    end: new Date(2015, 3, 12, 15, 0, 0, 0)
  },
  {
    id: 9,
    title: "Happy Hour",
    start: new Date(2015, 3, 12, 17, 0, 0, 0),
    end: new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: "Most important meal of the day"
  },
  {
    id: 10,
    title: "Dinner",
    start: new Date(2015, 3, 12, 20, 0, 0, 0),
    end: new Date(2015, 3, 12, 21, 0, 0, 0)
  },
  {
    id: 11,
    title: "Birthday Party",
    start: new Date(2015, 3, 13, 7, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0)
  },
  {
    id: 12,
    title: "Late Night Event",
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 18, 2, 0, 0)
  },
  {
    id: 13,
    title: "Multi-day Event",
    start: new Date(2015, 3, 20, 19, 30, 0),
    end: new Date(2015, 3, 22, 2, 0, 0)
  },
  {
    id: 14,
    title: "Today",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3))
  }]


  // const groups = ["A", "B", "C","D"]

  const resources = [
    {
      id: "a",
      title: `Bill Keller`,
    },
    {
      id: "b",
      title: "Juan Garcia",
    },
    {
      id: "c",
      title: "Room C",
    },
  ];



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

        <Calendar
          resources={resources}
          localizer={localizer}
          events={myEventsList}
          culture="en-US"
          startAccessor="start"
          endAccessor="end"
          defaultDate={new Date()}
          views={["month", "day"]}
          defaultView="day"
          step={7.5}
          min={dayStartTime()}
          max={dayEndTime()}
          // max={new Date('19:00:00')}
          style={{ height: 800 }}
        />
      </div>
    );
  }
}

export default Schedule;
