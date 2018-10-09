import { connect } from 'react-redux';
import Overview from './Overview';

const mapStateToProps = state => ({
  agency: state.agencyState.agency
});

export default connect(mapStateToProps)(Overview);
