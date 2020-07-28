import { importFile } from "../util/upload_api_util";
import {getTechnician, allTechnicians, createTechnician, editTechnician, deleteTechnician} from '../util/technicians_api_util';

export const RECEIVE_TECHNICIAN = "RECEIVE_TECHNICIAN";
export const RECEIVE_TECHNICIANS = "RECEIVE_TECHNICIANS";
export const RECEIVE_TECHNICIAN_ERRORS = "RECEIVE_TECHNICIAN_ERRORS";

const receiveTechnicians = (technicians) => ({
  type: RECEIVE_TECHNICIANS,
  technicians,
});

const receiveTechnician = (technician) => ({
  type: RECEIVE_TECHNICIAN,
  technician,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_TECHNICIAN_ERRORS,
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

export const fetchAllTechnicians= () => (dispatch) =>
  allTechnicians().then(
    (technicians) => dispatch(receiveTechnicians(technicians)),
    (error) => dispatch(receiveErrors(error.responseJSON))
  );

export const fetchTechnician= (id) => (dispatch) =>
  getTechnician(id).then(
    (technician) => dispatch(receiveTechnician(technician)),
    (error) => dispatch(receiveErrors(error.responseJSON))
  );
