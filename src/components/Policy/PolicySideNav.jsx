import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { reduxForm, propTypes } from 'redux-form';
import * as appStateActions from '../../actions/appStateActions';
import * as cgActions from '../../actions/cgActions';
import NewNoteFileUploader from '../Common/NewNoteFileUploader';

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
const csrLinks = [{
  key: 'coverage',
  link: '/policy/coverage',
  label: 'Coverage / Rating',
  styleName: 'coverage',
  exact: true
}, {
  key: 'policyholder',
  link: '/policy/policyholder',
  label: 'Policyholder / Agent',
  styleName: 'policyholder',
  exact: true
}, {
  key: 'billing',
  link: '/policy/billing',
  label: 'Mortgage / Billing',
  styleName: 'billing',
  exact: true
}, {
  key: 'notes',
  link: '/policy/notes',
  label: 'Notes / Files',
  styleName: 'notes',
  exact: true
}, {
  key: 'cancel',
  link: '/policy/cancel',
  label: 'Cancel Policy',
  styleName: 'cancel',
  exact: true
},
{
  key: 'endorsements',
  link: '/policy/endorsements',
  label: 'Endorsements',
  styleName: 'endoresments',
  exact: true
}];

export const NewNoteFileUploaderPopup = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { ...props.appState.data, showNewNoteFileUploader: true });
};

export const closeNewNoteFileUploader = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { ...props.appState.data, showNewNoteFileUploader: false });
};

export const SideNav = (props) => {
  const documentId = props.policy.policyNumber;

  return (
    <nav className="site-nav">
      <ul>
        {csrLinks && csrLinks.length > 0 && csrLinks.map((agentLink, index) => (
        agentLink.outside ?
          <li key={index}>
            {/* <a className={agentLink.styleName} href={agentLink.link}>*/}
            <a className="csr-dashboard" href="/">
              <span>{agentLink.label}</span>
            </a>
          </li> :
          <li key={index}>
            <span className={agentLink.styleName}>
              <NavLink to={agentLink.link} activeClassName="active" exact>{agentLink.label}</NavLink>
            </span>
          </li>
      ))}
        {/* <hr className="quote-hr" />
        <li>
          <button className="btn btn-secondary btn-xs" onClick={() => UWconditionsPopup(props)}>Underwriting Conditions</button>
        </li>
        { props.appState.data.showUWconditions === true &&
          <UWconditions
            closeButtonHandler={() => closeUWConditions(props)}
            />
          }*/}
        <hr className="nav-division" />
        <li>
          <button aria-label="open-btn form-newNote" className="btn btn-primary btn-sm btn-block" onClick={() => NewNoteFileUploaderPopup(props)}><i className="fa fa-plus" /> Note / File</button>
        </li>
      </ul>
      { props.appState.data.showNewNoteFileUploader === true &&
        <NewNoteFileUploader noteType="Policy Note" documentId={documentId} closeButtonHandler={() => closeNewNoteFileUploader(props)} />
      }
    </nav>);
};

// TODO: Needs to be connected to wherever it's gonnna get nav links from
SideNav.propTypes = {
  ...propTypes,
  completedTasks: PropTypes.any, // eslint-disable-line
  activateRedirectLink: PropTypes.string,
  activateRedirect: PropTypes.bool,
  appState: PropTypes.shape({
    instanceId: PropTypes.string,
    modelName: PropTypes.string,
    data: PropTypes.shape({
      showNewNoteFileUploader: PropTypes.boolean,
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
  policy: state.service.latestPolicy || {}
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'SideNav' })(SideNav));
