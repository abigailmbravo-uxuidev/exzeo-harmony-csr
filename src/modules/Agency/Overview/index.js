import { connect } from 'react-redux';

import territoryManagers from '../components/territoryManagers';
import { getAgentOfRecord,
  getEditModalInitialValues,
  getAgencyBranchData,
  getAgentsList
} from '../../../state/selectors/agency.selector';
import { updateAgency, updateAgent } from '../../../state/actions/agency.actions';

import Overview from './Overview';

const mapStateToProps = (state, props) => {
  return {
    agencyBranchData: getAgencyBranchData(state, props.branchCode),
    agency: state.agencyState.agency,
    territoryManagers,
    agentOfRecord: getAgentOfRecord(state),
    addressInitialValues: getEditModalInitialValues(state, props.branchCode),
    agentsList: getAgentsList(state)
  };
};

export default connect(mapStateToProps, { updateAgency, updateAgent })(Overview);
