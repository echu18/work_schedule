import { RECEIVE_LOCATION, RECEIVE_LOCATIONS } from "../actions/location_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LOCATION:
      return Object.assign({}, state, action.location);
    case RECEIVE_LOCATIONS:
      return Object.assign({}, state, action.locations);
    default:
      return state;
  }
};
