import { connect } from 'react-redux';
import Overview from './Overview';
import territoryManagers from '../components/territoryManagers';

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  territoryManagers
});

export default connect(mapStateToProps)(Overview);
