import { connect } from 'react-redux';
import AgentsComponent from './Agents';

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  agents: state.agencyState.agents

});

export default connect(mapStateToProps)(AgentsComponent);
