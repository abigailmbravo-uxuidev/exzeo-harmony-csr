import { connect } from 'react-redux';
import 'react-tagsinput/react-tagsinput.css';
import Agents from './Agents';
import { updateAgent, addAgent, updateAgency } from '../../../state/actions/agencyActions';
import { getListOfAgents, getAgencyLicenseArray } from '../../../state/selectors/agency.selector';

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  agents: state.agencyState.agents,
  listOfAgents: getListOfAgents(state),
  agencyLicenseArray: getAgencyLicenseArray(state)
});

export default connect(mapStateToProps, { updateAgent, addAgent, updateAgency })(Agents);
