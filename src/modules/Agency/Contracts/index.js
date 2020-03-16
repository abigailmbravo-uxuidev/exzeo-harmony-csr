import { connect } from 'react-redux';

import { updateAgency } from '../../../state/actions/agency.actions';
import { getEditModalInitialValues } from '../../../state/selectors/agency.selector';
import {
  getListAnswers,
  getListAnswersAsKey
} from '../../../state/selectors/questions.selectors';

import Contracts from './Contracts';

const mapStateToProps = state => ({
  agency: state.agencyState.agency,
  contractInitialValues: getEditModalInitialValues(state),
  listAnswers: getListAnswers(state),
  listAnswersAsKey: getListAnswersAsKey(state),
  listOfAgents: [] // available agents to add to a license,
});

export default connect(mapStateToProps, { updateAgency })(Contracts);
