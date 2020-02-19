import { connect } from 'react-redux';
import 'react-tagsinput/react-tagsinput.css'; // eslint-disable-line

import {
  updateAgent,
  addAgent,
  updateAgency
} from '../../../state/actions/agency.actions';
import {
  getOrphanedAgentsList,
  getAgentsList,
  getSortedAgents
} from '../../../state/selectors/agency.selector';
import { getListAnswersAsKey } from 'state/selectors/questions.selectors';

import Agents from './Agents';

const mapStateToProps = (state, ownProps) => {
  const { branchCode } = ownProps;
  return {
    agency: state.agencyState.agency,
    agents: getSortedAgents(state, branchCode),
    orphans: getOrphanedAgentsList(state),
    agentsList: getAgentsList(state),
    listAnswersAsKey: getListAnswersAsKey(state)
  };
};

export default connect(mapStateToProps, {
  updateAgent,
  addAgent,
  updateAgency
})(Agents);
