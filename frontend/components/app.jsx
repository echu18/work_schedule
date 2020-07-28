import React from "react";
import { Route, Switch, Link } from "react-router-dom";
// import { AuthRoute } from "../util/route_util";
import UploadContainer from './upload/upload_container';



const App = () => (
  <div id="app">

    <div id="main">
      <h3>Work Schedule</h3>

      <UploadContainer />

      <Switch>
        {/* <Route exact path="/" component={scheduleContainer} /> */}
      </Switch>

    </div>
  </div>
);

export default App;
