import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Loader from '@exzeo/core-ui/lib/Loader';
import QuoteHeader from '../components/Quote/QuoteHeader';
import QuoteSideNav from '../components/Quote/QuoteSideNav';
import QuoteDetailHeader from '../components/Quote/DetailHeader';
import UnderwritingValidationBarConnect from '../components/Quote/UnderwritingValidationBar';


import { OpenDiariesBar } from '../components//OpenDiariesBar';

export class QuoteBase extends React.Component {
  state = {
    showDiaries: false
  }

  toggleDiariesHandler = () => {
    this.setState({ showDiaries: !this.state.showDiaries });
  }

  render() {
    const {
 appState, quoteData, match, children 
} = this.props;
    const { showDiaries } = this.state;
    return (
      <div className="app-wrapper csr quote">
        <Helmet><title>{quoteData.quoteNumber ? `Q: ${quoteData.quoteNumber}` : 'Harmony - CSR Portal'}</title></Helmet>
        {/* <NewNoteFileUploader /> */}
        <QuoteHeader toggleDiaries={this.toggleDiariesHandler} showDiaries={showDiaries} />
        <QuoteDetailHeader />
        <main role="document">
          {(appState.data.submitting || !quoteData._id) && <Loader />}
          <aside className="content-panel-left">
            <QuoteSideNav match={match} />
          </aside>
          <div className="content-wrapper">
            {children}
          </div>
          <UnderwritingValidationBarConnect />
          {showDiaries && <OpenDiariesBar />}
        </main>
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
    quoteData: state.service.quote || {}
  }
);

export default connect(mapStateToProps)(QuoteBase);
