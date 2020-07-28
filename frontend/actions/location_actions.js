// import { importFile } from "../util/upload_api_util";
import { allLocations, createLocation, getLocation, editLocation, deleteLocation} from '../util/locations_api_util';

export const RECEIVE_LOCATION = "RECEIVE_LOCATION";
export const RECEIVE_LOCATIONS = "RECEIVE_LOCATIONS";
export const RECEIVE_LOCATION_ERRORS = "RECEIVE_LOCATION_ERRORS";

const receiveLocations = (locations) => ({
  type: RECEIVE_LOCATIONS,
  locations,
});

const receiveLocation = (location) => ({
  type: RECEIVE_LOCATION,
  location,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_LOCATION_ERRORS,
  errors,
});

const removeErrors = () => ({
  type: CLEAR_ERRORS,
});

// export const uploadFile = (dataType, fileData) => (dispatch) =>
//   importFile(dataType, fileData).then(
//     // (users) => dispatch(receiveUsers(users)),
//     (error) => dispatch(receiveErrors(error.responseJSON))
// );

export const fetchAllLocations= () => (dispatch) =>
  allLocations().then(
    (locations) => dispatch(receiveLocations(locations)),
    (error) => dispatch(receiveErrors(error.responseJSON))
  );

export const fetchLocation= (id) => (dispatch) =>
  getLocation(id).then(
    (location) => dispatch(receiveLocation(location)),
    (error) => dispatch(receiveErrors(error.responseJSON))
  );
