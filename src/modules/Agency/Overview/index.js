import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import OverviewComponent from './Overview';
import { getAgency } from '../../../state/actions/serviceActions';

const agencyModalSelector = formValueSelector('AgencyModal');
const mapStateToProps = state => ({
  agency: state.service.agency,
  sameAsMailingValue: agencyModalSelector(state, 'sameAsMailing')
});

export default connect(mapStateToProps, { getAgency })(OverviewComponent);
