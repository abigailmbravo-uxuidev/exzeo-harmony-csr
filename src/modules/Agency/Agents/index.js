import { connect } from 'react-redux';
import 'react-tagsinput/react-tagsinput.css'; // eslint-disable-line

import { updateAgent, addAgent, updateAgency } from '../../../state/actions/agencyActions';
import { getOrphanedAgentsList, getAgentsList } from '../../../state/selectors/agency.selector';

import Agents from './Agents';

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  agents: state.agencyState.agents,
  orphans: getOrphanedAgentsList(state),
  agentsList: getAgentsList(state)
});

export default connect(mapStateToProps, {
  updateAgent,
  addAgent,
  updateAgency
})(Agents);
