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
          <div className="form-group" role="group">

            <div className="demographics flex-parent">
                <div className="policy-holder flex-child">
                  <h4>Name of Insured</h4>
                  <div className="flex-parent">
                    <div className="flex-child">
                      <label>Label</label>
                      <input type="text" name="" placeholder="placeholder" />
                    </div>
                    <div className="flex-child">
                      <label>Label</label>
                      <input type="text" name="" placeholder="placeholder" />
                    </div>
                  </div>

                </div>
                <div className="producer flex-child">
                  <h4>Produced By</h4>
                </div>
            </div>

            <div className="property flex-parent">
                <div className="property-address flex-child">
                  <h4>Property (Risk)</h4>
                </div>
                <div className="property-details flex-child">
                  <h4>Home and Location</h4>
                </div>
            </div>

            <div className="coverage-options flex-parent">
                <div className="coverages flex-child">
                  <h4>Coverages</h4>
                </div>
                <div className="other-coverages flex-child">
                  <h4>Other Coverages</h4>
                </div>
                <div className="deductibles flex-child">
                  <h4>Deductibles</h4>
                </div>
                <div className="discounts flex-child">
                  <h4>Discounts</h4>
                </div>
            </div>


            <div className="wind flex-parent">
                <div className="wind-col1">
                  <h4>Wind Mitigation</h4>
                </div>
                <div className="wind-col2">
                  <h4>&nbsp;</h4>
                </div>
            </div>


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
