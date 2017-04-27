import React from 'react';
import PropTypes from 'prop-types';
import QuoteBaseConnect from './QuoteBase';
import ClearErrorConnect from '../components/Error/ClearError';

const Coverage = () => (
  <QuoteBaseConnect>
    <ClearErrorConnect/>
    <div className="route-content">
      <form>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            test
          </div>
        </div>
      </form>
    </div>
  </QuoteBaseConnect>
);

Coverage.propTypes = {
  splashScreen: PropTypes.bool
};

Coverage.displayName = 'Coverage';

export default Coverage;
