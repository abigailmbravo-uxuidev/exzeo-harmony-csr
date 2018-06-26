import { connect } from 'react-redux';
import 'react-tagsinput/react-tagsinput.css';
import AgentsComponent from './Agents';
import { updateAgent, addAgent, updateAgency } from '../../../state/actions/agencyActions';

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  agencyAgents: state.agencyState.agencyAgents,
  agents: state.agencyState.agents
});

export default connect(mapStateToProps, { updateAgent, addAgent, updateAgency })(AgentsComponent);
