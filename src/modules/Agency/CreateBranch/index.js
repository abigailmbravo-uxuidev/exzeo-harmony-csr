import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import { getAgency, updateAgency, createBranch } from '../../../state/actions/agency.actions';
import { getOrphanedAgentsList } from '../../../state/selectors/agency.selector';

import CreateBranch from './CreateBranch';

const selector = formValueSelector('CreateBranch');
const mapStateToProps = state => ({
  orphans: getOrphanedAgentsList(state),
  agency: state.agencyState.agency,
  initialValues: {
    licenses: [{
      state: '', license: '', licenseType: '', licenseEffectiveDate: ''
    }]
  },
  sameAsMailingValue: selector(state, 'sameAsMailing'),
  licenseValue: selector(state, 'licenses'),
  physicalStateValue: selector(state, 'physicalAddress.state'),
  physicalZipValue: selector(state, 'physicalAddress.zip'),
  territoryManagers: state.questions.territoryManagers
});

export default connect(mapStateToProps, {
  getAgency, updateAgency, createBranch
})(reduxForm({
  form: 'CreateBranch',
  enableReinitialize: true
})(CreateBranch));
