import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import ContractsComponent from './Contracts';
import { updateAgency } from '../../../state/actions/agencyActions';
import { getEditModalInitialValues } from '../../../state/selectors/agency.selector';

const agencyModalSelector = formValueSelector('AgencyModal');
const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  sameAsMailingValue: agencyModalSelector(state, 'sameAsMailing'),
  contractInitialValues: getEditModalInitialValues(state)
});

export default connect(mapStateToProps, { updateAgency })(ContractsComponent);
