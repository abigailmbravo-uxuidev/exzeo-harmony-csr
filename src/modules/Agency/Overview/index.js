import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getAgentOfRecord,
  getEditModalInitialValues,
  getAgencyBranchData,
  getAgentsList
} from '../../../state/selectors/agency.selector';
import {
  updateAgency,
  updateAgent
} from '../../../state/actions/agency.actions';

import Overview from './Overview';
import { getListAnswersAsKey } from 'state/selectors/questions.selectors';

const mapStateToProps = (state, props) => {
  return {
    branchCode: props.branchCode,
    agencyBranchData: getAgencyBranchData(state, props.branchCode),
    agency: state.agencyState.agency,
    agentOfRecord: getAgentOfRecord(state, props.branchCode),
    addressInitialValues: getEditModalInitialValues(state, props.branchCode),
    agentsList: getAgentsList(state),
    listAnswersAsKey: getListAnswersAsKey(state)
  };
};

Overview.propTypes = {
  agencyCode: PropTypes.string.isRequired,
  branchCode: PropTypes.string.isRequired
};

export default connect(mapStateToProps, { updateAgency, updateAgent })(
  Overview
);
