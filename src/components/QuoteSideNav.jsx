import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { SideNavigation } from '@exzeo/core-ui/src/@Harmony';

import * as appStateActions from '../state/actions/appState.actions';
import * as uiActions from '../state/actions/ui.actions';
import * as cgActions from '../state/actions/cg.actions';
import { QUOTE_RESOURCE_TYPE } from '../constants/diaries';

import PlusButton from './PlusButton';
import UWConditions from './UWconditions';

export const newDiary = props => {
  const {
    quoteData: { companyCode, state, product, quoteNumber, endDate }
  } = props;
  props.actions.uiActions.toggleDiary({
    companyCode,
    state,
    product,
    resourceType: QUOTE_RESOURCE_TYPE,
    resourceId: quoteNumber,
    entityEndDate: endDate
  });
};

export const newNote = props => {
  const {
    quoteData: { companyCode, state, product, quoteNumber }
  } = props;
  props.actions.uiActions.toggleNote({
    companyCode,
    state,
    product,
    noteType: 'Quote Note',
    documentId: quoteNumber,
    resourceType: QUOTE_RESOURCE_TYPE
  });
};

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

export const NewNoteFileUploaderPopup = props => {
  props.actions.newNoteActions.toggleNote({
    noteType: 'Quote Note',
    documentId: props.quoteData.quoteNumber
  });
};

export const UWconditionsPopup = props => {
  props.actions.appStateActions.setAppState(
    props.appState.modelName,
    props.match.params.workflowId,
    { ...props.appState.data, showUWconditions: true }
  );
};

export const closeUWConditions = props => {
  props.actions.appStateActions.setAppState(
    props.appState.modelName,
    props.match.params.workflowId,
    { ...props.appState.data, showUWconditions: false }
  );
};

export const SideNav = props => {
  const { quoteData, match } = props;
  const redirect = props.activateRedirect ? (
    <Redirect to={props.activateRedirectLink} />
  ) : null;

  return (
    <React.Fragment>
      <nav className="site-nav">
        {redirect}
        <SideNavigation
          navLinks={getNavLinks({ quoteNumber: quoteData.quoteNumber })}
        >
          <hr className="nav-division" />
          <li>
            <button
              tabIndex="0"
              aria-label="open-btn form-newNote"
              className="btn btn-secondary btn-xs btn-block"
              onClick={() => UWconditionsPopup(props)}
            >
              Underwriting Conditions
            </button>
          </li>
        </SideNavigation>
        {props.appState.data.showUWconditions === true && (
          <UWConditions closeButtonHandler={() => closeUWConditions(props)} />
        )}
        <PlusButton
          newNote={() => newNote(props)}
          newDiary={() => newDiary(props)}
        />
      </nav>
    </React.Fragment>
  );
};

SideNav.propTypes = {
  activateRedirectLink: PropTypes.string,
  activateRedirect: PropTypes.bool,
  appState: PropTypes.shape({
    instanceId: PropTypes.string,
    modelName: PropTypes.string,
    data: PropTypes.shape({
      showUWconditions: PropTypes.bool,
      quote: PropTypes.object,
      updateUnderwriting: PropTypes.bool
    })
  })
};

const mapStateToProps = state => ({
  appState: state.appState,
  activateRedirectLink: state.appState.data.activateRedirectLink,
  activateRedirect: state.appState.data.activateRedirect,
  quoteData: state.quoteState.quote || {}
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    uiActions: bindActionCreators(uiActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);
