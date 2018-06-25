import { connect } from 'react-redux';
import AgentsComponent from './Agents';
import { updateAgent, addAgent } from '../../../state/actions/agencyActions';

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  agencyAgents: state.agencyState.agencyAgents,
  agents: state.agencyState.agents
});

export default connect(mapStateToProps, { updateAgent, addAgent })(AgentsComponent);
