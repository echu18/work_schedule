import React from "react";
import { Route, Switch, Link } from "react-router-dom";
// import { AuthRoute } from "../util/route_util";
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
      
      {/* <Switch>
        <Route exact path="/" component={scheduleContainer} />
      </Switch> */}

    </div>
  </div>
);

export default App;
