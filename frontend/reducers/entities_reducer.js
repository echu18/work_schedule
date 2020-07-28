import { combineReducers } from "redux";
import techniciansReducer from "./technicians_reducer";
import locationsReducer from "./locations_reducer";
import workOrdersReducer from "./work_orders_reducer";

const entitiesReducer = combineReducers({
  technicians: techniciansReducer,
  locations: locationsReducer,
  workOrders: workOrdersReducer
});

export default entitiesReducer;
