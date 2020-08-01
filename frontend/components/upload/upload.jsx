import React from 'react';
import ReactDOM from "react-dom";
import CSVReader from "react-csv-reader";


 class Upload extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       dataType: "",
       fileData: "",
     };
     this.handleDataType = this.handleDataType.bind(this);
     this.handleFile = this.handleFile.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
    //  this.handleError = this.handleError.bind(this);
     this.alertError = this.alertError.bind(this);
   }

   handleDataType(e) {
     e.preventDefault();
     this.setState({ dataType: e.target.value });
   }

   handleFile(data, fileInfo) {
     console.log(data, fileInfo);
     this.setState({ fileData: data });
   }



   alertError(errorType) {
    switch (errorType) {
      case "no-file":
          alert("Please upload a file.");
        break;
      case "no-datatype":
          alert("Please select a datatype");
        break;
      case "invalid-data":
        alert('Data type does not match')
        break;
        case "unknown-error":
          alert('Please refresh and try again.')
        break;
      default:
    }


  

   }
  

   handleSubmit(e, fileData, dataType) {
     e.preventDefault();
     let data = Object.values(fileData);
     
     if (!fileData) {
       this.alertError("no-file");
       return;
      } else if (dataType === "") {
        this.alertError("no-datatype");
        return;
      } else if (!validData(data)) {
        this.alertError("invalid-data");
      } else {
        this.props.uploadFile(dataType, fileData);
      }
      
      
      
    function validData(data){  
      let colNames;
      switch (dataType) {
        case "technician":
          colNames = ['id', 'name']
          break;
        case "location":
          colNames = ['id', 'name', 'city']
          break;
        case "work-order":
          colNames = ["id", 'technician_id', "location_id", 'time', 'duration', 'price'];
          break;
        default:
          break;
      }


      for (let i=0; i<data.length; i++){
        let cols = Object.keys(data[i])
        if (cols.length !== colNames.length) return false;

        for (let j=0; j < colNames.length; j++){
          if (!cols.includes(colNames[j])) {
            return false;
          }
        }
      }
     return true;
    }
  }

    //  if (this.state.fileData && this.state.dataType !== "") {
    //    this.props.uploadFile(this.state.dataType, this.state.fileData);
    //  }

   render() {
     const papaparseOptions = {
       header: true,
       dynamicTyping: true,
       skipEmptyLines: true,
       transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
     };

     return (
       <div className="upload-container">
         <CSVReader
           className="csv-reader-input"
           label="Upload CSV File"
           onFileLoaded={this.handleFile}
           onError={this.handleError}
           parserOptions={papaparseOptions}
           inputId="input-id"
           inputStyle={{ color: "red" }}
         />

         <div className="upload-lower">
           <select
             className="upload-select"
             name="file-type"
             id=""
             onChange={(e) => this.handleDataType(e)}
           >
             <option value="" disabled selected>
               Select data type
             </option>
             <option value="technician">Technician</option>
             <option value="location">Location</option>
             <option value="work-order">Work Order</option>
           </select>

           <button onClick={(e) => this.handleSubmit(e, this.state.fileData, this.state.dataType)}>Upload</button>
         </div>
       </div>
     );
   }
 }

export default Upload;
