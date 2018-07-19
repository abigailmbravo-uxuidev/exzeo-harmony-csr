import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from '@exzeo/core-ui/lib/Loader';
import { startWorkflow, batchCompleteTask } from '../../state/actions/cgActions';
import { setAppState } from '../../state/actions/appStateActions';
import { setAppError } from '../../state/actions/errorActions';
import { getQuoteDataFromCgState } from '../../state/selectors/quote.selectors';

class QuoteLanding extends Component {
  async componentDidMount() {
    const { match: { params }, startWorkflow, setAppState, appState, batchCompleteTask, newQuote } = this.props;
    const lastSearchData = JSON.parse(localStorage.getItem('lastSearchData'));

    try {
      const result = await startWorkflow('csrQuote', { dsUrl: `${process.env.REACT_APP_API_URL}/ds` });
      const steps = [{
        name: 'search',
        data: lastSearchData
      }];

      if (newQuote) {
        steps.push({
          name: 'chooseAddress',
          data: {
            igdId: params.propertyId,
            stateCode: params.stateCode
          }
        });
      } else {
        steps.push({
          name: 'chooseQuote',
          data: {
            quoteId: params.quoteId
          }
        });
      }

      const startResult = result.payload ? result.payload[0].workflowData.csrQuote.data : {};

      setAppState('csrQuote', startResult.modelInstanceId, {
        ...appState.data,
        submitting: true
      });

      await batchCompleteTask(startResult.modelName, startResult.modelInstanceId, steps);
      setAppState(appState.modelName, startResult.modelInstanceId, {
        ...appState.data,
        selectedLink: 'customerData'
      });

    } catch (error) {
      setAppError(error);
    }
  }

  render() {
    const { quoteData } = this.props;
    return (
      <React.Fragment>
        {quoteData && quoteData._id ? <Redirect push to={`/quote/${quoteData._id}/coverage`}/> : <Loader/>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.appState,
  cgState: state.cg,
  quoteData: getQuoteDataFromCgState(state)
});

export default connect(mapStateToProps, {
  batchCompleteTask,
  startWorkflow,
  setAppState,
  setAppError
})(QuoteLanding);
