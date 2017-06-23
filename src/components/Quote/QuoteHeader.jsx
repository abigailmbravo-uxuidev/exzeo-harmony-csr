import React from 'react';
import logo from '../../img/Harmony.svg';

const QuoteHeader = () => (
  <header>
    <div role="banner">
      <div className="tab-tag">
        <span>QUOTE</span>
      </div>
      <a href="/" id="logo" className="logo">
        <img src={logo} alt="Harmony" />
      </a>
    </div>
  </header>
);

export default QuoteHeader;
