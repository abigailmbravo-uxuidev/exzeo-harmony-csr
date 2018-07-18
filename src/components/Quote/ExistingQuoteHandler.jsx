import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom'
import Loader from '@exzeo/core-ui/lib/Loader';
import {startWorkflow, batchCompleteTask} from "../../state/actions/cgActions";
import {setAppState} from '../../state/actions/appStateActions';
import {setAppError} from "../../state/actions/errorActions";
import _ from "lodash";

class ExistingQuoteHandler extends Component {
  componentDidMount() {
    this.props.getUIQuestionsAction('askToCustomizeDefaultQuoteCSR');

    const isNewTab = localStorage.getItem('isNewTab') === 'true';
    if (isNewTab) {
      localStorage.setItem('isNewTab', false);

      this.props.startWorkflowAction('csrQuote', { dsUrl: `${process.env.REACT_APP_API_URL}/ds` }).then((result) => {
        const steps = [];
        const lastSearchData = JSON.parse(localStorage.getItem('lastSearchData'));

        steps.push({ name: 'search', data: lastSearchData });

        if (lastSearchData.searchType === 'quote') {
          const quoteId = localStorage.getItem('quoteId');

          this.props.getLatestQuoteAction(true, quoteId);

          steps.push({
            name: 'chooseQuote',
            data: {
              quoteId
            }
          });
        } else if (lastSearchData.searchType === 'address') {
          const igdID = localStorage.getItem('igdID');
          const stateCode = localStorage.getItem('stateCode');
          steps.push({
            name: 'chooseAddress',
            data: {
              igdId: igdID,
              stateCode
            }
          });
        }

        steps.push({ name: 'hasUserEnteredData', data: { answer: 'No' } });
        steps.push({ name: 'moveTo', data: { key: 'customerData' } });

        const startResult = result.payload ? result.payload[0].workflowData.csrQuote.data : {};

        this.props.setAppStateAction('csrQuote', startResult.modelInstanceId, { ...this.props.appState.data, submitting: true });
        this.props.batchCompleteTaskAction(startResult.modelName, startResult.modelInstanceId, steps).then(() => {
          this.props.setAppStateAction(
            this.props.appState.modelName,
            startResult.modelInstanceId, { ...this.props.appState.data, selectedLink: 'customerData' }
          );
        });
      });
    } else if (this.props.appState.instanceId) {
      this.props.setAppStateAction(this.props.appState.modelName, this.props.appState.instanceId, {
        ...this.props.appState.data,
        submitting: true
      });
      const steps = [
        { name: 'hasUserEnteredData', data: { answer: 'No' } },
        { name: 'moveTo', data: { key: 'customerData' } }
      ];

      const workflowId = this.props.appState.instanceId;
      this.props.batchCompleteTaskAction(this.props.appState.modelName, workflowId, steps)
        .then(() => {
          this.props.getLatestQuoteAction(true, this.props.quoteData._id);
          this.props.setAppStateAction(this.props.appState.modelName, this.props.appState.instanceId, {
            ...this.props.appState.data,
            selectedLink: 'customerData'
          });
        });
    }
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default ExistingQuoteHandler;
