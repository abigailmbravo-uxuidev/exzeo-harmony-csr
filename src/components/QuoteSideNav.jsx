import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SideNavigation } from '@exzeo/core-ui/src/@Harmony';

import { toggleDiary, toggleNote } from '../state/actions/ui.actions';
import { QUOTE_RESOURCE_TYPE } from '../constants/diaries';

import PlusButton from './PlusButton';
import UWConditions from './UWconditions';

const getNavLinks = ({ quoteNumber }) => {
  return [
    {
      key: 'coverage',
      to: `/quote/${quoteNumber}/coverage`,
      label: <span>Coverage / Rating</span>,
      className: 'coverage',
      exact: true
    },
    {
      key: 'underwriting',
      to: `/quote/${quoteNumber}/underwriting`,
      label: <span>Underwriting</span>,
      className: 'underwriting',
      exact: true
    },
    {
      key: 'additionalInterests',
      to: `/quote/${quoteNumber}/additionalInterests`,
      label: <span>Additional Interests</span>,
      className: 'additionalInterests',
      exact: true
    },
    {
      key: 'billing',
      to: `/quote/${quoteNumber}/billing`,
      label: <span>Mailing / Billing</span>,
      className: 'billing',
      exact: true
    },
    {
      key: 'notes',
      to: `/quote/${quoteNumber}/notes`,
      label: <span>Notes / Files / Diaries</span>,
      className: 'notes',
      exact: true
    },
    {
      key: 'summary',
      to: `/quote/${quoteNumber}/summary`,
      label: <span>Quote Summary</span>,
      className: 'quote-summary'
    },
    {
      key: 'application',
      to: `/quote/${quoteNumber}/application`,
      label: <span>Application</span>,
      className: 'application',
      exact: true
    }
  ];
};

export const SideNav = ({
  quoteData,
  toggleNote,
  toggleDiary,
  activateRedirect,
  activateRedirectLink
}) => {
  const [showUWPopup, setUWPopup] = useState(false);
  const { companyCode, state, product, quoteNumber } = quoteData;

  function newNote() {
    toggleNote({
      companyCode,
      state,
      product,
      noteType: 'Quote Note',
      documentId: quoteNumber,
      resourceType: QUOTE_RESOURCE_TYPE,
      entity: quoteData
    });
  }

  function newDiary() {
    toggleDiary({
      companyCode,
      state,
      product,
      resourceType: QUOTE_RESOURCE_TYPE,
      resourceId: quoteNumber,
      entity: quoteData
    });
  }

  return (
    <React.Fragment>
      <nav className="site-nav">
        <SideNavigation
          navLinks={getNavLinks({ quoteNumber: quoteData.quoteNumber })}
        >
          <hr className="nav-division" />
          {product === 'HO3' && ( // TODO temporary fix for CSP specific navigation bar config
            <li>
              <button
                tabIndex="0"
                aria-label="open-btn form-newNote"
                className="btn btn-secondary btn-xs btn-block"
                onClick={() => setUWPopup(true)}
              >
                Underwriting Conditions
              </button>
            </li>
          )}
        </SideNavigation>
        {showUWPopup && (
          <UWConditions closeButtonHandler={() => setUWPopup(false)} />
        )}
        <PlusButton newNote={newNote} newDiary={newDiary} />
      </nav>
    </React.Fragment>
  );
};

SideNav.propTypes = {
  activateRedirectLink: PropTypes.string,
  activateRedirect: PropTypes.bool,
  quoteData: PropTypes.shape({})
};

const mapStateToProps = state => {
  return {
    activateRedirectLink: state.appState.data.activateRedirectLink,
    activateRedirect: state.appState.data.activateRedirect,
    quoteData: state.quoteState.quote || {}
  };
};

export default connect(mapStateToProps, { toggleNote, toggleDiary })(SideNav);
