import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Loader } from '@exzeo/core-ui';

import { startWorkflow } from '../../state/actions/cg.actions';
import { setAppError } from '../../state/actions/error.actions';
import { getQuoteForCreate } from '../../state/selectors/quote.selectors';

export class QuoteLanding extends Component {
  async componentDidMount() {
    const {
      match: { params }, startWorkflow
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
  quoteData: getQuoteForCreate(state)
});

export default connect(mapStateToProps, {
  startWorkflow,
  setAppError
})(QuoteLanding);
