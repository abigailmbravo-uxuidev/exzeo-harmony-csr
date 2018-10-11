import { connect } from 'react-redux';
import Overview from './Overview';
import territoryManagers from '../components/territoryManagers';
import { getAgentOfRecord } from '../../../state/selectors/agency.selector';

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  territoryManagers,
  agentOfRecord: getAgentOfRecord(state)
});

export default connect(mapStateToProps)(Overview);
