import { connect } from 'react-redux';
import Upload from './upload';
import {uploadFile} from '../../actions/upload_actions'

const mapStateToProps = (state, ownProps) => ({
    locations: state.entities.locations,
    technicians: state.entities.technicians,
    workOrders: state.entities.workOrders
})

const mapDispatchToProps = dispatch => ({
    uploadFile: (dataType, fileData) => dispatch(uploadFile(dataType, fileData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Upload);