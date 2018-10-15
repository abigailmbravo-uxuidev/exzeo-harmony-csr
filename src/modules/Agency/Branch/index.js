import { connect } from 'react-redux';

import territoryManagers from '../components/territoryManagers';
import { getAgentOfRecord } from '../../../state/selectors/agency.selector';

import Branch from './Branch';

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  territoryManagers,
  agentOfRecord: getAgentOfRecord(state)
});

export default connect(mapStateToProps)(Branch);
