import React from 'react';
import PropTypes from 'prop-types';
import QuoteBaseConnect from './QuoteBase';
import ClearErrorConnect from '../components/Error/ClearError';


const Coverage = () => (
  <QuoteBaseConnect>
    <ClearErrorConnect />

      <div className="route">
        <div className="detailHeader">
      <section id="quoteDetails" className="quoteDetails">
        <dl>
          <div>
            <dt className="fade">Quote Number</dt>
            <dd className="fade">-</dd>
          </div>
        </dl>
      </section>
      <section id="propertyDetails" className="propertyDetails">
        <dl>
          <div>
            <dt>Address</dt>
            <dd className="fade">123 NE 132ND TER</dd>
            <dd className="fade"></dd>
            <dd className="fade"></dd>
          </div>
        </dl>
      </section>
      <section id="yearBuilt" className="yearBuilt">
        <dl>
          <div>
            <dt className="fade">Year Built</dt>
            <dd className="fade">1980</dd>
          </div>
        </dl>
      </section>
      <section id="coverageDetails" className="coverageDetails">
        <dl>
          <div>
            <dt className="fade">Coverage A</dt>
            <dd className="fade"></dd>
          </div>
        </dl>
      </section>
      <section id="premium" className="premium">
        <dl>
          <div>
            <dt className="fade">Premium</dt>
            <dd className="fade">


              </dd>
          </div>
        </dl>
      </section>
    </div>

    <div className="route-content">
          <form id="CustomerInfo" novalidate="">
            <div className="scroll">
                test monkey
            </div>
          </form>
        </div>

      </div>





  </QuoteBaseConnect>
);

Coverage.propTypes = {
  splashScreen: PropTypes.bool
};

Coverage.displayName = 'Coverage';

export default Coverage;
