import { connect } from "react-redux";
import Schedule from './schedule';
import {fetchAllTechnicians, fetchTechnician} from '../../actions/technician_actions';
import {fetchAllLocations, fetchLocation} from '../../actions/location_actions';
import {fetchAllWorkOrders, fetchWorkOrder} from '../../actions/work_order_actions';

const mapStateToProps = (state, ownProps) => ({
    locations: state.entities.locations,
    technicians: Object.values(state.entities.technicians),
    workOrders: Object.values(state.entities.workOrders)
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllTechnicians: () => dispatch(fetchAllTechnicians()),
    fetchAllLocations: () => dispatch(fetchAllLocations()),
    fetchAllWorkOrders: () => dispatch(fetchAllWorkOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
