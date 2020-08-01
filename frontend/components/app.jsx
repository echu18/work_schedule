import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import UploadContainer from './upload/upload_container';
import ScheduleContainer from './schedule/schedule_container';



const App = () => (
  <div id="app">

    <div id="main">
      <nav className='navbar'>
        <h3>Work Schedule</h3>

        <UploadContainer />
      </nav>
      
      <ScheduleContainer />
      
    </div>
  </div>
);

export default App;
