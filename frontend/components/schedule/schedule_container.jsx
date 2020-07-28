import { connect } from "react-redux";
import Schedule from './schedule';
import {fetchAllTechnicians, fetchTechnician} from '../../actions/technician_actions';
import {fetchAllLocations, fetchLocation} from '../../actions/location_actions';

const mapStateToProps = (state, ownProps) => ({
    locations: Object.values(state.entities.locations),
    technicians: Object.values(state.entities.technicians),
    // workOrders: Object.values(state.entities.workOrders)
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllTechnicians: () => dispatch(fetchAllTechnicians()),
    fetchAllLocations: () => dispatch(fetchAllLocations())
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
