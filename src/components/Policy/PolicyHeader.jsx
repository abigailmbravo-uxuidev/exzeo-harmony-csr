import React from 'react';
import logo from '../../img/Harmony.svg';
import Button from '@exzeo/core-ui/lib/Button/index';

const PolicyHeader = ({ toggleDiaries, showDiaries }) => (
  <header>
    <div role="banner">
      <div className="tab-tag">
        <span>POLICY</span>
      </div>
      <a href="/" id="logo" className="logo">
        <img src={logo} alt="Harmony" />
      </a>
      <div className="tab-tag">
        <span>Open Diaries</span>
        <Button
          onClick={toggleDiaries}
          baseClass="btn btn-primary"
          type="button"
          dataTest="button"
        >
          { showDiaries && <span><i className="fa fa-arrow-circle-right" />Hide</span>}
          { !showDiaries && <span><i className="fa fa-arrow-circle-left" />Show</span>}
        </Button>
      </div>

    </div>
  </header>
);

export default PolicyHeader;
