import React from 'react';

import Header from '../components/Common/Header';
import SearchBar from '../components/Search/SearchBar';

const Base = (props) => {
  const { isAuthenticated } = props.auth;
  return (<div className="app-wrapper csr">
    <Header {...props} />
    <div className="search ">
      { isAuthenticated() && <SearchBar /> }
    </div>
    <main role="document">
      <div className="content-wrapper">
        {props.children}
      </div>
    </main>
  </div>);
};

export default Base;
