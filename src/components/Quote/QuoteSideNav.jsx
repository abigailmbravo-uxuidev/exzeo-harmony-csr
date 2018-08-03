import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import * as appStateActions from '../../state/actions/appStateActions';
import UWconditions from '../Common/UWconditions';
import * as uiActions from '../../state/actions/uiActions';
import * as cgActions from '../../state/actions/cgActions';

// Example of a possible schema
/**
 * {
 *  link,
 *  label,
 *  styleName,
 *  exact,
 *  outside
 * }
 */
const csrLinks = ({quoteId, workflowId}) => {
  return [{
    key: 'customerData',
    link: `/quote/${quoteId}/coverage/${workflowId}`,
    label: 'Coverage / Rating',
    styleName: 'coverage',
    exact: true
  }, {
    key: 'underwriting',
    link: `/quote/${quoteId}/underwriting/${workflowId}`,
    label: 'Underwriting',
    styleName: 'underwriting',
    exact: true
  }, {
    key: 'additionalInterests',
    link: `/quote/${quoteId}/additionalInterests/${workflowId}`,
    label: 'Additional Interests',
    styleName: 'additionalInterests',
    exact: true
  }, {
    key: 'mailing',
    link: `/quote/${quoteId}/billing/${workflowId}`,
    label: 'Mailing / Billing',
    styleName: 'billing',
    exact: true
  }, {
    key: 'notes',
    link: `/quote/${quoteId}/notes/${workflowId}`,
    label: 'Notes / Files',
    styleName: 'notes',
    exact: true
  }, {
    key: 'summary',
    link: `/quote/${quoteId}/summary/${workflowId}`,
    label: 'Quote Summary',
    styleName: 'quote-summary'
  }, {
    key: 'application',
    link: `/quote/${quoteId}/application/${workflowId}`,
    label: 'Application',
    styleName: 'application',
    exact: true
  }];
};

export const NewNoteFileUploaderPopup = (props) => {
  props.actions.uiActions.toggleNote({ noteType: 'Quote Note', documentId: props.quoteData.quoteNumber })
};

export const UWconditionsPopup = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.match.params.workflowId, { ...props.appState.data, showUWconditions: true });
};

export const closeUWConditions = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.match.params.workflowId, { ...props.appState.data, showUWconditions: false });
};

export const SideNav = (props) => {
  const { quoteData, match } = props;
  const redirect = (props.activateRedirect)
    ? (<Redirect to={props.activateRedirectLink} />)
    : null;

  return (
    <nav className="site-nav">
      { redirect }
      <ul>
        {csrLinks({quoteId: quoteData._id, workflowId: match.params.workflowId }).map((link) => (
          <li key={link.key}>
            <span className={link.styleName}>
              <NavLink to={link.link} activeClassName="active" exact>{link.label}</NavLink>
            </span>
          </li>
        ))}
        <hr className="nav-division" />
        <li>
          <button tabIndex={'0'} className="btn btn-primary btn-sm btn-block" onClick={() => NewNoteFileUploaderPopup(props)}><i className="fa fa-plus" /> Note / File</button>
        </li>
        <li>
          <button tabIndex={'0'} aria-label="open-btn form-newNote" className="btn btn-secondary btn-xs btn-block" onClick={() => UWconditionsPopup(props)}>Underwriting Conditions</button>
        </li>
      </ul>
      {props.appState.data.showUWconditions === true &&
        <UWconditions closeButtonHandler={() => closeUWConditions(props)} />
      }
    </nav>);
};

// TODO: Needs to be connected to wherever it's gonnna get nav links from
SideNav.propTypes = {
  completedTasks: PropTypes.any, // eslint-disable-line
  activateRedirectLink: PropTypes.string,
  activateRedirect: PropTypes.bool,
  appState: PropTypes.shape({
    instanceId: PropTypes.string,
    modelName: PropTypes.string,
    data: PropTypes.shape({
      showUWconditions: PropTypes.boolean,
      quote: PropTypes.object,
      updateUnderwriting: PropTypes.boolean
    })
  })
};

const mapStateToProps = state => ({
  appState: state.appState,
  completedTasks: state.completedTasks,
  activateRedirectLink: state.appState.data.activateRedirectLink,
  activateRedirect: state.appState.data.activateRedirect,
  cg: state.cg,
  quoteData: state.service.quote || {}
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    uiActions: bindActionCreators(uiActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
