import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

<<<<<<< HEAD
import * as appStateActions from '../../state/actions/appState.actions';
import * as serviceActions from '../../state/actions/service.actions';
import * as quoteActions from '../../state/actions/quote.actions';
import * as errorActions from '../../state/actions/error.actions';
import Notes from '../Notes';
import Footer from '../Common/Footer';

export class NotesFiles extends Component {
  componentDidMount() {
    const { getQuote, match } = this.props;
    getQuote(match.params.quoteNumber, 'notes');
  }

  render() {
    const { match, quoteData } = this.props;
    return (
      <React.Fragment match={match}>
        <div className="route-content">
          <div className="scroll">
            {quoteData.quoteNumber && <Notes numbers={[quoteData.quoteNumber]} numberType="quoteNumber" />}
          </div>
        </div>
        <div className="basic-footer">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => ({
  quoteData: state.quoteState.quote || {}
});

export default connect(mapStateToProps, { getQuote })(NotesFiles);

