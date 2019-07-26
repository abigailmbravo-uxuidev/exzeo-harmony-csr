import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
      label: 'Coverage / Rating',
      styleName: 'coverage',
      exact: true
    },
    {
      key: 'underwriting',
      to: `/quote/${quoteNumber}/underwriting`,
      label: 'Underwriting',
      styleName: 'underwriting',
      exact: true
    },
    {
      key: 'additionalInterests',
      to: `/quote/${quoteNumber}/additionalInterests`,
      label: 'Additional Interests',
      styleName: 'additionalInterests',
      exact: true
    },
    {
      key: 'billing',
      to: `/quote/${quoteNumber}/billing`,
      label: 'Mailing / Billing',
      styleName: 'billing',
      exact: true
    },
    {
      key: 'notes',
      to: `/quote/${quoteNumber}/notes`,
      label: 'Notes / Files / Diaries',
      styleName: 'notes',
      exact: true
    },
    {
      key: 'summary',
      to: `/quote/${quoteNumber}/summary`,
      label: 'Quote Summary',
      styleName: 'quote-summary'
    },
    {
      key: 'application',
      to: `/quote/${quoteNumber}/application`,
      label: 'Application',
      styleName: 'application',
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
  const { companyCode, state, product, quoteNumber, endDate } = quoteData;

  function newNote() {
    toggleNote({
      companyCode,
      state,
      product,
      noteType: 'Quote Note',
      documentId: quoteNumber,
      resourceType: QUOTE_RESOURCE_TYPE
    });
  }

  function newDiary() {
    toggleDiary({
      companyCode,
      state,
      product,
      resourceType: QUOTE_RESOURCE_TYPE,
      resourceId: quoteNumber,
      entityEndDate: endDate
    });
  }

  return (
    <React.Fragment>
      <nav className="site-nav">
        {activateRedirect && <Redirect to={activateRedirectLink} />}
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

export default connect(
  mapStateToProps,
  { toggleNote, toggleDiary }
)(SideNav);
