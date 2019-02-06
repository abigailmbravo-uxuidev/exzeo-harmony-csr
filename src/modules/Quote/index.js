import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from '@exzeo/core-ui';
import { Route } from 'react-router-dom';

import UnderwritingValidationBarConnect from '../../components/Quote/UnderwritingValidationBar';
import App from '../../components/AppWrapper';
import OpenDiariesBar from '../../components/OpenDiariesBar';
import DiaryPolling from '../../components/DiaryPolling';
import { QUOTE_RESOURCE_TYPE } from '../../constants/diaries';
import { startWorkflow } from '../../state/actions/cg.actions';
import { setAppState } from '../../state/actions/appState.actions';
import { setAppError } from '../../state/actions/error.actions';
import { getQuote } from '../../state/actions/quote.actions';
import Coverage from '../../components/Quote/Coverage';
import Underwriting from '../../components/Quote/Underwriting';
import AdditionalInterests from '../../components/Quote/AdditionalInterests';
import MailingAddressBilling from '../../components/Quote/MailingAddressBilling';
import NotesFiles from '../../components/Quote/NotesFiles';
import Summary from '../../components/Quote/Summary';
import Application from '../../components/Quote/Application';

export class QuoteBase extends React.Component {
  state = {
    showDiaries: false
  };

  handleToggleDiaries = () => {
    this.setState({ showDiaries: !this.state.showDiaries });
  };


  updateQuote = async (modelName, submitData, pageName) => {
    const { quoteData } = this.props;
    this.props.setAppState(modelName, '', { ...this.props.appState.data, submitting: true });
    try {
      await this.props.startWorkflow(modelName, {
        quoteId: quoteData._id,
        ...submitData
      });
  
      await this.props.getQuote(quoteData._id, pageName);
    } catch (error) {
      this.props.setAppError(error);
    } finally {
      this.props.setAppState(modelName, '', { ...this.props.appState.data, submitting: false });
    }
  }

  render() {
    const {
      appState,
      quoteData,
      match,
      children
    } = this.props;

    const { showDiaries } = this.state;

    return (
      <div className="app-wrapper csr quote">
        {(appState.data.submitting || !quoteData.quoteNumber) && <Loader />}
        <App
          resourceType={QUOTE_RESOURCE_TYPE}
          resourceId={quoteData.quoteNumber}
          pageTitle={`Q: ${quoteData.quoteNumber || ''}`}
          match={match}
          onToggleDiaries={this.handleToggleDiaries}
          showDiaries={showDiaries}
          render={() => (
            <React.Fragment>
              <div className="content-wrapper">
                    <Route exact path={`${match.url}/coverage`} render={props => <Coverage {...props} match={match} updateQuote={this.updateQuote} />} />
                    <Route exact path={`${match.url}/billing`} render={props => <MailingAddressBilling  {...props}  match={match} updateQuote={this.updateQuote} />} />
                    <Route exact path={`${match.url}/notes`} render={props => <NotesFiles {...props} match={match} updateQuote={this.updateQuote} />} />
                    <Route exact path={`${match.url}/summary`} render={props => <Summary {...props} match={match} updateQuote={this.updateQuote} />} />
                    <Route exact path={`${match.url}/additionalInterests`} render={props => <AdditionalInterests {...props}  match={match} updateQuote={this.updateQuote} />} />
                    <Route exact path={`${match.url}/underwriting`} render={props => <Underwriting {...props} match={match} updateQuote={this.updateQuote} />} />
                    <Route exact path={`${match.url}/application`} render={props => <Application {...props} match={match} updateQuote={this.updateQuote} />} />
                </div>

              <UnderwritingValidationBarConnect />

              <OpenDiariesBar
                entityEndDate={quoteData.endDate}
                resourceId={quoteData.quoteNumber}
                resourceType={QUOTE_RESOURCE_TYPE} />

              {(quoteData && quoteData.quoteNumber) &&
                <DiaryPolling filter={{ resourceId: quoteData.quoteNumber, resourceType: QUOTE_RESOURCE_TYPE }} />
              }

            </React.Fragment>
          )} />
      </div>
    );
  }
}

QuoteBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

const mapStateToProps = state => (
  {
    appState: state.appState,
    quoteData: state.quoteState.quote || {}
  }
);

export default connect(mapStateToProps, { startWorkflow, setAppState, setAppError, getQuote })(QuoteBase);
