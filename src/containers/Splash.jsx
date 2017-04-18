import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

import BaseConnect from './Base';
import ClearErrorConnect from '../components/Error/ClearError';
import Footer from '../components/Common/Footer';

const Splash = () => (
  <BaseConnect>
    <ClearErrorConnect />
    <div className="dashboard" role="article">
      <div className="route">
        <div className="route-content">
          <div className="scroll">
            <div className="dashboard-message">
              <h1 className="app-header">Agency Portal</h1>
              <h4>Easily quote Flood and HO3 insurance for Florida properties</h4>
              <p>Getting a quote is always quick and simple with <strong>TypTap Insurance</strong>. You can start a quote or find an existing quote using the start and retrieve buttons below.</p>
            </div>
            <div className="survey-wrapper">
              <div className="product-wrapper">
                <div className="product card">
                  <div className="card-header image card-header-image-flood">
                    <h4 className="product-name"><i className="fa fa-tint" /> Flood Insurance</h4>
                  </div>
                  <div className="card-block">
                    <p>TypTap currently offers stand-alone flood policies for single family residential dwellings in Florida.</p>
                  </div>
                  <div className="card-footer">
                    <Link to="https://www.typtap.com/agency" className="btn btn-secondary"><i className="fa fa-plus" />New Quote</Link>
                    <Link to="https://www.typtap.com/agency" className="btn btn-primary"><i className="fa fa-history" />Retrieve Quote</Link>
                  </div>
                </div>
                <div className="product card">
                  <div className="card-header image card-header-image-home">
                    <h4 className="product-name"><i className="fa fa-home" /> Homeowners Insurance</h4>
                  </div>
                  <div className="card-block">
                    <p>TypTap currently offers HO3 homeowner&apos;s policies for single family residential dwellings in Florida.</p>
                  </div>
                  <div className="card-footer">
                    <Link to={{ pathname: '/quote', state: { searchType: 'address' } }} className="btn btn-secondary btn-block"><i className="fa fa-plus" />New Quote</Link>
                    <Link to={{ pathname: '/quote/retrieve', state: { searchType: 'quote' } }} className="btn btn-primary btn-block"><i className="fa fa-history" />Retrieve Quote</Link>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  </BaseConnect>
);

Splash.propTypes = {
  splashScreen: PropTypes.bool
};

Splash.displayName = 'Splash';

export default Splash;
