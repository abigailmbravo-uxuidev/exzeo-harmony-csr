import { connect } from 'react-redux';

import * as errorActions from '../../state/actions/error.actions';
import FinanceWorkflow from './@components/FinanceWorkflow';

export default connect(null, { errorHandler: errorActions.setAppError })(
  FinanceWorkflow
);
