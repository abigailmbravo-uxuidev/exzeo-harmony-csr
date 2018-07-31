import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as serviceActions from '../../state/actions/serviceActions';
import QuoteBaseConnect from '../../containers/Quote';
import * as errorActions from '../../state/actions/errorActions';
import NoteList from '../Common/NoteList';
import Footer from '../Common/Footer';

export class NotesFiles extends Component {

  componentDidMount () {
    const { quoteData, actions, match } = this.props;
    if (quoteData && quoteData.quoteNumber) {
      actions.serviceActions.getNotes(quoteData.quoteNumber, quoteData.quoteNumber);
    } else {
      actions.serviceActions.getQuote(match.params.quoteId)
        .then((quoteData) => {
          actions.serviceActions.getNotes(quoteData.quoteNumber, quoteData.quoteNumber)
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
  notes: state.service.notes,
  quoteData: state.service.quote || {},
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesFiles);
