import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import ContractsComponent from './Contracts';
import { getAgency } from '../../../state/actions/agencyActions';

const agencyModalSelector = formValueSelector('AgencyModal');
const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  sameAsMailingValue: agencyModalSelector(state, 'sameAsMailing')
});

export default connect(mapStateToProps, { getAgency })(ContractsComponent);
