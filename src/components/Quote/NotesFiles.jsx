import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QuoteBaseConnect from '../../containers/Quote';
import * as appStateActions from '../../state/actions/appStateActions';
import * as serviceActions from '../../state/actions/serviceActions';
import * as errorActions from '../../state/actions/errorActions';
import NoteList from '../Common/NoteList';
import Footer from '../Common/Footer';

const MODEL_NAME = 'csrQuote';

export class NotesFiles extends Component {
  componentDidMount() {
    const { quoteData, actions, match, appState } = this.props;
    const workflowId = match.params.workflowId;

    actions.appStateActions.setAppState(
      MODEL_NAME, workflowId,
      {
        ...appState.data,
        submitting: true
      }
    );
    if (quoteData && quoteData.quoteNumber) {
      actions.serviceActions.getNotes(quoteData.quoteNumber, quoteData.quoteNumber).then(() => {
        actions.appStateActions.setAppState(
          MODEL_NAME, workflowId,
          {
            ...appState.data,
            submitting: false
          }
        );
      });
    } else {
      actions.serviceActions.getQuote(match.params.quoteId)
        .then((quoteData) => {
          actions.serviceActions.getNotes(quoteData.quoteNumber, quoteData.quoteNumber);
          actions.appStateActions.setAppState(
            MODEL_NAME, workflowId,
            {
              ...appState.data,
              submitting: false
            }
          );
        });
    }
  }

  render() {
    const { match } = this.props;
    return (
      <QuoteBaseConnect match={match}>
        <div className="route-content">
          <div className="scroll">
            <NoteList {...this.props} />
          </div>
        </div>
        <div className="basic-footer">
          <Footer />
        </div>
      </QuoteBaseConnect>
    );
  }
}

NotesFiles.propTypes = {
  quoteData: PropTypes.shape()
};

const mapStateToProps = state => ({
  appState: state.appState,
  notes: state.service.notes,
  quoteData: state.service.quote || {},
  error: state.error,
  appState: state.appState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    appStateActions: bindActionCreators(appStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesFiles);
