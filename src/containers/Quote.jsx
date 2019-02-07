import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from '@exzeo/core-ui';

import UnderwritingValidationBarConnect from '../components/Quote/UnderwritingValidationBar';
import App from '../components/AppWrapper';
import OpenDiariesBar from '../components/OpenDiariesBar';
import DiaryPolling from '../components/DiaryPolling';
import { QUOTE_RESOURCE_TYPE } from '../constants/diaries';

export class QuoteBase extends React.Component {
  state = {
    showDiaries: false
  };

  handleToggleDiaries = () => {
    this.setState({ showDiaries: !this.state.showDiaries });
  };

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
        {quoteData && quoteData.envelopeId && <span data-envelopeid={quoteData.envelopeId} />}
        {(appState.data.submitting || !quoteData.quoteNumber) && <Loader />}
        <App
          resourceType={QUOTE_RESOURCE_TYPE}
          resourceId={quoteData.quoteNumber}
          pageTitle={`Q: ${quoteData.quoteNumber || ''}`}
          match={match}
          context={match.path.split('/')[1]}
          onToggleDiaries={this.handleToggleDiaries}
          showDiaries={showDiaries}
          render={() => (
            <React.Fragment>
              <div className="content-wrapper">
                {children}
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

export default connect(mapStateToProps)(QuoteBase);
