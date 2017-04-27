import React from 'react';
import PropTypes from 'prop-types';
import QuoteBaseConnect from './QuoteBase';
import ClearErrorConnect from '../components/Error/ClearError';
import Footer from '../components/Common/Footer';
import NewNoteFileUploader from '../components/Common/NewNoteFileUploader';

const Coverage = () => (
  <QuoteBaseConnect>
    <ClearErrorConnect />
    <div className="dashboard" role="article">
      <div className="route">
        <div className="search route-content">
          <div className="results-wrapper">
            <div className="grid-controls">
    
            </div>
          </div>
          <NewNoteFileUploader />
          <Footer />
        </div>
      </div>
    </div>
  </QuoteBaseConnect>
);

Coverage.propTypes = {
  splashScreen: PropTypes.bool
};

Coverage.displayName = 'Coverage';

export default Coverage;
