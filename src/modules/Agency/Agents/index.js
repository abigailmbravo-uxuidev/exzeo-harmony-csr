import { connect } from 'react-redux';
import 'react-tagsinput/react-tagsinput.css'; // eslint-disable-line

import { updateAgent, addAgent, updateAgency } from '../../../state/actions/agency.actions';
import { getOrphanedAgentsList, getAgentsList, getSortedAgents } from '../../../state/selectors/agency.selector';

import Agents from './Agents';

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  agents: getSortedAgents(state),
  orphans: getOrphanedAgentsList(state),
  agentsList: getAgentsList(state)
});

export default connect(mapStateToProps, {
  updateAgent,
  addAgent,
  updateAgency
})(Agents);
