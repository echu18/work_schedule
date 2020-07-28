import React from "react";
import ReactDOM from "react-dom";

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
        .then(() => this.setState({ render: true }));


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






    return (
      <div>
        <h3>Schedule</h3>
        {/* {locations} */}
       
        <h3>Locations</h3>
       {this.props.locations.map(location => {
          return (
            <div>
              <p>{location.name} - {location.city}</p>
            </div>
          )
        })}

        <h3>Technicians</h3>
        {/* {this.props.workOrders.length > 0 ? mapTechnicians(technicians, workOrders) : null} */}
  


       
       







    </div>
    );
  }
}

export default Schedule;
