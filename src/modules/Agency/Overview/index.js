import { connect } from 'react-redux';

import territoryManagers from '../components/territoryManagers';
import { getAgentOfRecord, getEditModalInitialValues } from '../../../state/selectors/agency.selector';

import Overview from './Overview';

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  territoryManagers,
  agentOfRecord: getAgentOfRecord(state),
  addressInitialValues: getEditModalInitialValues(state)
});

export default connect(mapStateToProps)(Overview);
