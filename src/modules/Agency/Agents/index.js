import { connect } from 'react-redux';
import 'react-tagsinput/react-tagsinput.css';
import Agents from './Agents';
import { updateAgent, addAgent, updateAgency, applyLicenseToAgency } from '../../../state/actions/agencyActions';
import { getOrphanedAgentsList } from '../../../state/selectors/agency.selector';

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  agents: state.agencyState.agents,
  orphans: getOrphanedAgentsList(state)
});

export default connect(mapStateToProps, {
  updateAgent,
  addAgent,
  updateAgency,
  applyLicenseToAgency
})(Agents);
