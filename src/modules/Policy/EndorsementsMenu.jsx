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
      className="btn btn-secondary btn-xs"
    >
      Coverage
    </button>
    <button
      id="home-scroll"
      data-test="home-scroll"
      type="button"
      onClick={() => scrollToView('home')}
      className="btn btn-secondary btn-xs"
    >
      Home / Location
    </button>
    <button
      id="policy-scroll"
      data-test="policy-scroll"
      type="button"
      onClick={() => scrollToView('policy')}
      className="btn btn-secondary btn-xs"
    >
      Policyholders
    </button>
    <button
      id="addresses-scroll"
      data-test="addresses-scroll"
      type="button"
      onClick={() => scrollToView('addresses')}
      className="btn btn-secondary btn-xs"
    >
      Addresses
    </button>
  </div>
);

GoToMenu.propTypes = {};

GoToMenu.defaultProps = {};

export default GoToMenu;
