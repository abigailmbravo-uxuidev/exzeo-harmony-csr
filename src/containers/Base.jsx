import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Common/Header';
import SearchBar from '../components/Search/SearchBar';

export const Base = (props) => {
  const { isAuthenticated } = props.auth;
  return (<div className="app-wrapper csr">
    <Header {...props} />
    <div className={props.search.policyAdvanceSearch ? 'policy-advanced search' : 'search'}>
      { isAuthenticated() && <SearchBar /> }
    </div>
    <main role="document" className={props.search.policyAdvanceSearch ? 'policy-advanced' : ''}>
      <div className="content-wrapper">
        {props.children}
      </div>
    </main>
  </div>);
};

const mapStateToProps = state => (
  {
    questions: state.questions,
    tasks: state.cg,
    appState: state.appState,
    error: state.error,
    search: state.search
  }
);

export default connect(mapStateToProps, null)(Base);
