import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from '@exzeo/core-ui';

import UnderwritingValidationBarConnect from '../components/Quote/UnderwritingValidationBar';
import App from '../components/AppWrapper';
import OpenDiariesBar from '../components//OpenDiariesBar';
import DiaryPolling from '../components/DiaryPolling';

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
        {(appState.data.submitting || !quoteData._id) && <Loader />}
        <App
          resourceType="Quote"
          resourceId={quoteData._id}
          pageTitle={`Q: ${quoteData.quoteNumber || ''}`}
          match={match}
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
                resourceId={quoteData._id}
                resourceType="Quote" />

              {(quoteData && quoteData._id) &&
                <DiaryPolling filter={{ resourceId: quoteData._id, resourceType: 'Quote' }} />
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
