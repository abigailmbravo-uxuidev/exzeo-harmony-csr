import React from 'react';
import PropTypes from 'prop-types';
import {scrollToView} from "./index";

const GoToMenu = (props) => {
  return (
    <div className="endo-jump-menu">
      <button id="coverage-scroll" type="button" onClick={() => scrollToView('coverage')} className="btn btn-secondary btn-xs">Coverage</button>
      <button id="home-scroll" type="button" onClick={() => scrollToView('home')} className="btn btn-secondary btn-xs">Home / Location</button>
      <button id="policy-scroll" type="button" onClick={() => scrollToView('policy')} className="btn btn-secondary btn-xs">Policyholders</button>
      <button id="addresses-scroll" type="button" onClick={() => scrollToView('addresses')} className="btn btn-secondary btn-xs">Addresses</button>
    </div>
  );
};

GoToMenu.propTypes = {};

GoToMenu.defaultProps = {};

export default GoToMenu;
