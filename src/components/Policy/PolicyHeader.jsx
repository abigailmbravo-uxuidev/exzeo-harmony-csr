import React from 'react';
import logo from '../../img/Harmony.svg';
import DiaryButton from '../DiaryButton';

const PolicyHeader = ({ toggleDiaries, showDiaries, openDiaryCount }) => (
  <header>
    <div role="banner">
      <div className="tab-tag">
        <span>POLICY</span>
      </div>
      <a href="/" id="logo" className="logo">
        <img src={logo} alt="Harmony" />
      </a>
      <DiaryButton
        toggleDiaries={toggleDiaries}
        showDiaries={showDiaries}
        openDiaryCount={openDiaryCount}
      />
    </div>
  </header>
);

export default PolicyHeader;
