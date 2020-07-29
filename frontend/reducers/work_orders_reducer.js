import { RECEIVE_WORK_ORDER, RECEIVE_WORK_ORDERS } from "../actions/work_order_actions";
import { RECEIVE_TECHNICIAN, RECEIVE_TECHNICIANS } from "../actions/technician_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  
  switch (action.type) {
  
    case RECEIVE_WORK_ORDER:
      return Object.assign({}, state, action.workOrder);
    case RECEIVE_WORK_ORDERS:
      return Object.assign({}, state, action.workOrders);
    case RECEIVE_TECHNICIANS:
      return Object.assign({}, state, action.work_orders);
    case RECEIVE_TECHNICIAN:
      return Object.assign({}, state, action.work_orders);

    default:
      return state;
  }
};
