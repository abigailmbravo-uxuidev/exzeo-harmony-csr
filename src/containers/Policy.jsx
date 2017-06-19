import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import PolicyHeader from '../components/Policy/PolicyHeader';
import QuoteSideNav from '../components/Policy/PolicySideNav';
import PolicyDetailHeader from '../components/Policy/DetailHeader';
import Footer from '../components/Common/Footer';

export const Policy = props => (
  <div className="app-wrapper csr policy">
    {/*TODO: dynamically add policy # to title*/}
    <Helmet><title>Policy [policyNumber]</title></Helmet>
    {/*<NewNoteFileUploader/>*/}
    <PolicyHeader />
    <PolicyDetailHeader />
    <main role="document">
      <aside className="content-panel-left">
        <QuoteSideNav />
      </aside>
      <div className="content-wrapper">
        {props.children}
        <Footer />
      </div>
    </main>
  </div>
);

Policy.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Policy;
