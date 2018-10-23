import { connect } from 'react-redux';
import Contracts from './Contracts';
import { updateAgency } from '../../../state/actions/agencyActions';
import { getEditModalInitialValues } from '../../../state/selectors/agency.selector';

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  contractInitialValues: getEditModalInitialValues(state),
  listOfAgents: [] // available agents to add to a license
});

export default connect(mapStateToProps, { updateAgency })(Contracts);
