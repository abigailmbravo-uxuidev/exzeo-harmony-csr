import { connect } from 'react-redux';

import {
  getAgency,
  updateAgency,
  createBranch
} from '../../../state/actions/agency.actions';
import { getOrphanedAgentsList } from '../../../state/selectors/agency.selector';
import { getListAnswersAsKey } from '../../../state/selectors/questions.selectors';

import CreateBranch from './CreateBranch';

const mapStateToProps = state => ({
  orphans: getOrphanedAgentsList(state),
  agency: state.agencyState.agency,
  initialValues: {
    status: 'Active',
    mailingAddress: {},
    physicalAddress: {},
    mailPolicyDocsToBranch: false,
    mailCommissionChecksToBranch: false,
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
  territoryManagers: state.questions.territoryManagers,
  listAnswersAsKey: getListAnswersAsKey(state)
});

export default connect(mapStateToProps, {
  getAgency,
  updateAgency,
  createBranch
})(CreateBranch);
