import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import {
  getAgency,
  updateAgency,
  createAgency
} from '../../../state/actions/agency.actions';
import { getOrphanedAgentsList } from '../../../state/selectors/agency.selector';
import { getListAnswersAsKey } from '../../../state/selectors/questions.selectors';

import Create from './Create';

const selector = formValueSelector('Create');
const mapStateToProps = state => ({
  orphans: getOrphanedAgentsList(state),
  agency: state.agencyState.agency,
  initialValues: {
    status: 'Active',
    okToPay: true,
    mailingAddress: {},
    physicalAddress: {},
    agentOfRecord: {
      sameAsMailing: false,
      licenses: [
        {
          state: '',
          license: '',
          licenseType: '',
          licenseEffectiveDate: '',
          appointed: false
        }
      ]
    }
  },
  sameAsMailingValue: selector(state, 'sameAsMailing'),
  sameAsMailingAORValue: selector(state, 'agentOfRecord.sameAsMailing'),
  licenseValue: selector(state, 'licenses'),
  physicalStateValue: selector(state, 'physicalAddress.state'),
  physicalZipValue: selector(state, 'physicalAddress.zip'),
  territoryManagers: state.questions.territoryManagers,
  listAnswersAsKey: getListAnswersAsKey(state)
});

export default connect(
  mapStateToProps,
  {
    getAgency,
    updateAgency,
    createAgency
  }
)(
  reduxForm({
    form: 'Create',
    enableReinitialize: true
  })(Create)
);
