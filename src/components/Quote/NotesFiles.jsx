import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuoteBaseConnect from '../../containers/Quote';
import { getQuote } from '../../state/actions/quote.actions';
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
      <React.Fragment>
        {quoteData.quoteNumber && <Notes numbers={[quoteData.quoteNumber]} numberType="quoteNumber" />}
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => ({
  quoteData: state.quoteState.quote || {}
});

export default connect(mapStateToProps, { getQuote })(NotesFiles);

