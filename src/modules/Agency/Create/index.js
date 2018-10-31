import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import { getAgency, updateAgency, createAgency } from '../../../state/actions/agency.actions';
import { getOrphanedAgentsList } from '../../../state/selectors/agency.selector';

import Create from './Create';

const selector = formValueSelector('Create');
const mapStateToProps = state => ({
  orphans: getOrphanedAgentsList(state),
  agency: state.agencyState.agency,
  initialValues: {
    mailingAddress: {},
    physicalAddress: {},
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
  getAgency, updateAgency, createAgency
})(reduxForm({
  form: 'Create',
  enableReinitialize: true
})(Create));
