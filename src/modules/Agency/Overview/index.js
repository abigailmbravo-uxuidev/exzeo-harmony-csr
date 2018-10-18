import { connect } from 'react-redux';

import territoryManagers from '../components/territoryManagers';
import { getAgentOfRecord, getEditModalInitialValues, getAgencyBranchData } from '../../../state/selectors/agency.selector';

import Overview from './Overview';

const mapStateToProps = (state, props) => {
  return {
    agencyBranchData: getAgencyBranchData(state, props.branchCode),
    agency: state.agencyState.agency,
    territoryManagers,
    agentOfRecord: getAgentOfRecord(state),
    addressInitialValues: getEditModalInitialValues(state, props.branchCode)
  };
};

export default connect(mapStateToProps)(Overview);
