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
   }

   handleDataType(e) {
       e.preventDefault();
       this.setState({ dataType: e.target.value });
       //     if (e.target.files.length) {
       //         this.setState({file: e.target.files[0]})
       //     }
   };

   handleFile(data, fileInfo) {
       console.log(data, fileInfo);
       this.setState({fileData: data})
   }

   handleSubmit(e) {
       e.preventDefault();
       
     if (this.state.fileData && this.state.dataType !== "") {
       this.props.uploadFile(this.state.dataType, this.state.fileData);
     }
   }

   render() {
     const papaparseOptions = {
       header: true,
       dynamicTyping: true,
       skipEmptyLines: true,
       transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
     };

     return (
       <div>
         {/* <input
                    type="file"
                    id="upload-button"
                    // style={{ display: "none" }}
                    onChange={this.handleChange}
                />

                <button onClick={e => this.handleSubmit(e)}>Upload</button> */}


         <CSVReader
           cssClass="csv-reader-input"
           label="Upload CSV File"
           onFileLoaded={this.handleFile}
           onError={this.handleDarkSideForce}
           parserOptions={papaparseOptions}
           inputId="ObiWan"
           inputStyle={{ color: "red" }}
         />
         <select
           name="file-type"
           id=""
           onChange={(e) => this.handleDataType(e)}
         >
           <option value="" disabled selected>
             Select a filetype
           </option>
           <option value="technician">Technician</option>
           <option value="location">Location</option>
           <option value="work-order">Work Order</option>
         </select>

         <button onClick={(e) => this.handleSubmit(e)}>Upload</button>
       </div>
     );
   }
 }

export default Upload;
