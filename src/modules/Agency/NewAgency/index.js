import { connect } from 'react-redux';
import NewAgency from './NewAgency';

const mapStateToProps = state => ({
  agency: state.agencyState.agency
});

export default connect(mapStateToProps)(NewAgency);
