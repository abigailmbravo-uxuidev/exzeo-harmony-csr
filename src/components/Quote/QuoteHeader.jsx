import React from 'react';
import logo from '../../img/Harmony.svg';
import DiaryButton from '../DiaryButton';

const QuoteHeader = ({ toggleDiaries, showDiaries }) => (
  <header>
    <div role="banner">
      <div className="tab-tag">
        <span>QUOTE</span>
      </div>
      <a href="/" id="logo" className="logo">
        <img src={logo} alt="Harmony" />
      </a>
      <DiaryButton toggleDiaries={toggleDiaries} showDiaries={showDiaries} />
    </div>
  </header>
);

export default QuoteHeader;
