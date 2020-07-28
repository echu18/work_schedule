import { importFile } from  '../util/upload_api_util';

export const RECEIVE_WORK_ORDER = "RECEIVE_WORK_ORDER";
export const RECEIVE_WORK_ORDERS = "RECEIVE_WORK_ORDERS";
export const RECEIVE_WORK_ORDER_ERRORS = "RECEIVE_WORK_ORDER_ERRORS";

const receiveWorkOrders = (workOrders) => ({
  type: RECEIVE_WORK_ORDERS,
  workOrders,
});

const receiveWorkOrder = (workOrder) => ({
  type: RECEIVE_WORK_ORDER,
  workOrder,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_WORK_ORDER_ERRORS,
  errors,
});

const removeErrors = () => ({
  type: CLEAR_ERRORS,
});

export const uploadFile = (dataType,fileData) => (dispatch) =>
         importFile(dataType, fileData).then(
           // (users) => dispatch(receiveUsers(users)),
           (error) => dispatch(receiveErrors(error.responseJSON))
         );

// export const fetchUser = (id) => (dispatch) =>
//   getUser(id).then(
//     (user) => dispatch(receiveUser(user)),
//     (error) => dispatch(receiveErrors(error.responseJSON))
//   );
