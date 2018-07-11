import { connect } from 'react-redux';
import ContractsComponent from './Contracts';
import { updateAgency } from '../../../state/actions/agencyActions';
import { getEditModalInitialValues, getListOfAgents } from '../../../state/selectors/agency.selector';

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  contractInitialValues: getEditModalInitialValues(state),
  listOfAgents: getListOfAgents(state) // available agents to add to a license
});

export default connect(mapStateToProps, { updateAgency })(ContractsComponent);
