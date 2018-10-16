import { connect } from 'react-redux';

import territoryManagers from '../components/territoryManagers';
import { getAgentOfRecord } from '../../../state/selectors/agency.selector';
import { updateAgency } from '../../../state/actions/agencyActions';

import Branch from './Branch';

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  territoryManagers,
  agentOfRecord: getAgentOfRecord(state),
  updateAgencyAction: updateAgency
});

export default connect(mapStateToProps)(Branch);
