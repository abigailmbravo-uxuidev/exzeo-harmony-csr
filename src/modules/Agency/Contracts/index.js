import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import get from 'lodash/get';
import ContractsComponent from './Contracts';
import { updateAgency } from '../../../state/actions/agencyActions';
import { getEditModalInitialValues, getListOfAgencyAgents, getListOfAgents } from '../../../state/selectors/agency.selector';

const agencyModalSelector = formValueSelector('AgencyModal');
const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  agencyAgents: state.agencyState.agencyAgents,
  sameAsMailingValue: agencyModalSelector(state, 'sameAsMailing'),
  contractInitialValues: getEditModalInitialValues(state),
  agencyAgentsList: getListOfAgencyAgents(state),
  listOfAgents: getListOfAgents(state),
  contractFieldValues: get(state.form, 'ContractsModal.values', {})

});

export default connect(mapStateToProps, { updateAgency })(ContractsComponent);
