import React from 'react';

const scrollToView = elementName => {
  const element = document.getElementById(elementName);
  if (element) {
    element.scrollIntoView(true);
  }
};

//TODO : Make dynamic with template
const GoToMenu = () => (
  <div className="endo-jump-menu">
    <button
      id="coverage-scroll"
      data-test="coverage-scroll"
      type="button"
      onClick={() => scrollToView('coverage')}
      className="btn btn-xs btn-link"
    >
      Coverage
    </button>
    <button
      id="home-scroll"
      data-test="home-scroll"
      type="button"
      onClick={() => scrollToView('home')}
      className="btn btn-xs btn-link"
    >
      Home / Location
    </button>
    <button
      id="policy-scroll"
      data-test="policy-scroll"
      type="button"
      onClick={() => scrollToView('policy')}
      className="btn btn-xs btn-link"
    >
      Policyholders
    </button>
    <button
      id="addresses-scroll"
      data-test="addresses-scroll"
      type="button"
      onClick={() => scrollToView('addresses')}
      className="btn btn-xs btn-link"
    >
      Addresses
    </button>
  </div>
);

GoToMenu.propTypes = {};

GoToMenu.defaultProps = {};

export default GoToMenu;
