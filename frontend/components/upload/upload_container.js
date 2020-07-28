import { connect } from 'react-redux';
import Upload from './upload';
import {uploadFile} from '../../actions/work_order_actions'

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = dispatch => ({
    uploadFile: (dataType, fileData) => dispatch(uploadFile(dataType, fileData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Upload);