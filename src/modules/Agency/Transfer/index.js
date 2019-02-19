import { connect } from 'react-redux';
import 'react-tagsinput/react-tagsinput.css'; // eslint-disable-line

import { getAgentsList } from '../../../state/selectors/agency.selector';
import { getPoliciesByAgencyCode, getPolicyNumberList } from '../../../state/selectors/policy.selectors';
import { getListAnswersAsKey } from '../../../state/selectors/questions.selectors';

import Transfer from './Transfer';
  

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  agentsList: getAgentsList(state),
  policies: getPoliciesByAgencyCode(state),
  policyNumberList: getPolicyNumberList(state),
  listAnswersAsKey: getListAnswersAsKey(state)
});

export default connect(mapStateToProps, {})(Transfer);
