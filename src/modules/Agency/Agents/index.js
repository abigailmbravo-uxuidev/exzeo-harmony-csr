import { connect } from 'react-redux';
import AgentsComponent from './Agents';
import { updateAgent } from '../../../state/actions/agencyActions';

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  agents: state.agencyState.agents

});

export default connect(mapStateToProps, { updateAgent })(AgentsComponent);
