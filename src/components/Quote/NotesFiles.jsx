import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as appStateActions from '../../state/actions/appState.actions';
import * as serviceActions from '../../state/actions/service.actions';
import * as quoteActions from '../../state/actions/quote.actions';
import * as errorActions from '../../state/actions/error.actions';
import NoteList from '../Common/NoteList';
import Footer from '../Common/Footer';

const MODEL_NAME = 'csrQuote';

export class NotesFiles extends Component {
  componentDidMount() {
    const {
      actions, match, appState
    } = this.props;

    actions.appStateActions.setAppState(
      MODEL_NAME, '',
      {
        ...appState.data,
        submitting: true
      }
    );

    actions.quoteActions.getQuote(match.params.quoteNumber, 'notes')
      .then((quoteData) => actions.serviceActions.getNotes(quoteData.quoteNumber))
      .then(() => actions.appStateActions.setAppState(
        MODEL_NAME, '', { ...appState.data, submitting: false }
      ));
  }

  render() {
    const { match, quoteData } = this.props;
    return (
      <React.Fragment match={match}>
        <div className="route-content">
          <div className="scroll">
            <NoteList {...this.props} entityEndDate={quoteData.endDate} />
          </div>
        </div>
        <div className="basic-footer">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

NotesFiles.propTypes = {
  quoteData: PropTypes.shape()
};

const mapStateToProps = state => ({
  appState: state.appState,
  notes: state.service.notes,
  quoteData: state.quoteState.quote || {},
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  actions: {
    appStateActions: bindActionCreators(appStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    quoteActions: bindActionCreators(quoteActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesFiles);
