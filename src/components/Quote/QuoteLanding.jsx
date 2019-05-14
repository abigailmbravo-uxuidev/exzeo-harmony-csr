import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Loader } from '@exzeo/core-ui';

import { setAppState } from '../../state/actions/appState.actions';
import { setAppError } from '../../state/actions/error.actions';
import { createQuote } from '../../state/actions/quote.actions';
import { getQuoteSelector } from '../../state/selectors/quote.selectors';

export class QuoteLanding extends Component {
  async componentDidMount() {
    const {
      match: { params }, appState, setAppState,
      userProfile
    } = this.props;

    try {
      const { stateCode, propertyId } = params;
      //TODO: fix user profile to match harmony-web 
      // userProfile.entity.companyCode
      this.props.createQuote('0', propertyId, stateCode, 'TTIC' , 'HO3' );    
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
        {quoteData && quoteData.quoteNumber ? <Redirect replace to={`/quote/${quoteData.quoteNumber}/coverage`} /> : <Loader />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.appState,
  quoteData: getQuoteSelector(state),
  userProfile: state.authState.userProfile,
});

export default connect(mapStateToProps, {
  createQuote,
  setAppState,
  setAppError
})(QuoteLanding);
