import React from 'react';

import logo from '../img/Harmony.svg';

const WorkflowHeader = ({ title, children }) => (
  <header>
    <div role="banner">
      <div className="tab-tag">
        <span>{title}</span>
      </div>
      <a href="/" id="logo" className="logo">
        <img src={logo} alt="Harmony" />
      </a>
      {children}
    </div>
  </header>
);

export default WorkflowHeader;
