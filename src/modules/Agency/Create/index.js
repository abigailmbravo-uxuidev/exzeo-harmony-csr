import { connect } from 'react-redux';

import {
  getAgency,
  updateAgency,
  createAgency
} from '../../../state/actions/agency.actions';
import { getOrphanedAgentsList } from '../../../state/selectors/agency.selector';
import { getListAnswersAsKey } from '../../../state/selectors/questions.selectors';

import Create from './Create';

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
  listAnswersAsKey: getListAnswersAsKey(state)
});

export default connect(mapStateToProps, {
  getAgency,
  updateAgency,
  createAgency
})(Create);
