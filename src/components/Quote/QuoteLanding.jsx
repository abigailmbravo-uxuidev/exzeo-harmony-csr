import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Loader } from '@exzeo/core-ui';

import { startWorkflow, batchCompleteTask } from '../../state/actions/cg.actions';
import { setAppState } from '../../state/actions/appState.actions';
import { setAppError } from '../../state/actions/error.actions';
import { getQuoteforCreate } from '../../state/selectors/quote.selectors';

export class QuoteLanding extends Component {
  async componentDidMount() {
    const {
      match: { params }, startWorkflow, appState, setAppState
    } = this.props;

    try {
      const { stateCode, propertyId } = params;

      await startWorkflow('csrCreateQuote', { stateCode, igdId: propertyId });
    } catch (error) {
      setAppError(error);
    } finally {
      setAppState('csrCreateQuote', '', { ...appState.data, submitting: false });
    }
  }

  render() {
    const { quoteData } = this.props;
    return (
      <React.Fragment>
        {quoteData && quoteData._id ? <Redirect replace to={`/quote/${quoteData._id}/coverage`} /> : <Loader />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.appState,
  cgState: state.cg,
  quoteData: getQuoteforCreate(state)
});

export default connect(mapStateToProps, {
  batchCompleteTask,
  startWorkflow,
  setAppState,
  setAppError
})(QuoteLanding);
