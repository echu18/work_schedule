import { RECEIVE_TECHNICIAN, RECEIVE_TECHNICIANS } from "../actions/technician_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TECHNICIAN:
      // const user = action.currentUser
      // return Object.assign({}, state, { [user.id]: user })

      return Object.assign({}, state, action.technician);
    case RECEIVE_TECHNICIANS:
      // const user = action.currentUser
      // return Object.assign({}, state, { [user.id]: user })

      return Object.assign({}, state, action.technicians);
    default:
      return state;
  }
};
