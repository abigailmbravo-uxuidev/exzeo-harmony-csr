import { connect } from 'react-redux';
import Create from './Create';

const mapStateToProps = state => ({
  agency: state.agencyState.agency
});

export default connect(mapStateToProps)(Create);
