import React from 'react';

import logo from '../img/Harmony.svg';
import { useDiaryPolling } from '../modules/Diaries/hooks';

const Header = ({ diaryPollingFilter, title, children }) => {
  useDiaryPolling(diaryPollingFilter);

  return (
    <header>
      <div role="banner">
        {title}
        <a href="/" id="logo" className="logo">
          <img src={logo} alt="Harmony" />
        </a>
        {children}
      </div>
    </header>
  );
};

export default Header;
