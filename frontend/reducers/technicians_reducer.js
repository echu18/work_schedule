import { RECEIVE_TECHNICIAN, RECEIVE_TECHNICIANS } from "../actions/technician_actions";

export default (state = {}, action) => {
  
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TECHNICIAN:
      return Object.assign({}, state, action.technician);
    case RECEIVE_TECHNICIANS:
      return Object.assign({}, state, action.technicians);
    default:
      return state;
  }
};
