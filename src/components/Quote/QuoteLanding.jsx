import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Loader } from '@exzeo/core-ui';

import { SEARCH_TYPES } from '../../constants/search';
import { startWorkflow, batchCompleteTask } from '../../state/actions/cg.actions';
import { setAppState } from '../../state/actions/appState.actions';
import { setAppError } from '../../state/actions/error.actions';
import { TEMP_GetQuoteforCreate } from '../../state/selectors/quote.selectors';

export class QuoteLanding extends Component {
  async componentDidMount() {
    const {
      match: { params }, startWorkflow, setAppState, appState, batchCompleteTask, newQuote
    } = this.props;

    try {
      const { stateCode, propertyId } = params;
      await startWorkflow('csrCreateQuote', { stateCode, igdId: propertyId });
    } catch (error) {
      setAppError(error);
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
  quoteData: TEMP_GetQuoteforCreate(state)
});

export default connect(mapStateToProps, {
  batchCompleteTask,
  startWorkflow,
  setAppState,
  setAppError
})(QuoteLanding);
