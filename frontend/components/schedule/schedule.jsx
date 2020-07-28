import React from "react";
import ReactDOM from "react-dom";

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: "",
      technicians: "",
      workOrders: ""
    };
  }

  componentDidMount(){
    this.props.fetchAllLocations()
    this.props.fetchAllTechnicians();

    // Promise.all(this.props.fetchAllTechnicians, this.props.fetchAllLocations, () => (this.setState({locations: this.props.locations, technicians: this.props.technicians})) ) 
    
    // return function(){ 
    //   this.props.fetchAllTechnicians();
    //   this.props.fetchAllLocations()
    //   this.setState({locations: this.props.locations, technicians: this.props.technicians})
    // }
  }


  componentDidUpdate(prevProps, prevState){
    if (prevProps !== this.props) {
      this.setState({locations: this.props.locations, technicians: this.props.technicians})
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

  render() {

    // const locations = (
    //    this.state.locations.map(location => {
    //       return (
    //         <div>
    //           <p>{location.name}</p>
    //           <p>{location.city}</p>
    //         </div>
    //       )
    //     })
    // )

    if (this.props.locations === "") return null;
    
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
        {this.props.technicians.map(technician => {
           return (
             <div>
               <p>id:{technician.id} - {technician.name}</p>
             </div>
           )
         })}
      </div>
    );
  }
}

export default Schedule;
