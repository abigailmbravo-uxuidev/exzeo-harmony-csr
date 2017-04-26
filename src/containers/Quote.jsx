import React from 'react';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import BaseConnect from './Base';
import ClearErrorConnect from '../components/Error/ClearError';
import Footer from '../components/Common/Footer';
import NewNoteFileUploader from '../components/Common/NewNoteFileUploader';

const Splash = () => (
  <BaseConnect>
    <ClearErrorConnect/>
    <div className="dashboard" role="article">
      <div className="route">
        <div className="quote route-content">
            <div className="form-group">
                    <h1>QUOTE HERE</h1>
            </div>
            <Footer/>
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
