import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { reduxForm, propTypes } from 'redux-form';
import * as appStateActions from '../../actions/appStateActions';
import UWconditions from '../Common/UWconditions';
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
  key: 'customerData',
  link: '/quote/coverage',
  label: 'Coverage / Rating',
  styleName: 'coverage',
  exact: true
}, {
  key: 'underwriting',
  link: '/quote/underwriting',
  label: 'Underwriting',
  styleName: 'underwriting',
  exact: true
}, {
  key: 'additionalInterests',
  link: '/quote/additionalInterests',
  label: 'Additional Interests',
  styleName: 'additionalInterests',
  exact: true
}, {
  key: 'mailing',
  link: '/quote/billing',
  label: 'Mailing / Billing',
  styleName: 'billing',
  exact: true
}, {
  key: 'notes',
  link: '/quote/notes',
  label: 'Notes / Files',
  styleName: 'notes',
  exact: true
}, {
  key: 'summary',
  link: '/quote/summary',
  label: 'Quote Summary',
  styleName: 'quote-summary'
}, {
  key: 'application',
  link: '/quote/application',
  label: 'Application',
  styleName: 'application',
  exact: true
}];

const NewNoteFileUploaderPopup = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { ...props.appState.data, showNewNoteFileUploader: true });
};

const closeNewNoteFileUploader = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { ...props.appState.data, showNewNoteFileUploader: false });
};

const UWconditionsPopup = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { ...props.appState.data, showUWconditions: true });
};

const closeUWConditions = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { ...props.appState.data, showUWconditions: false });
};

const goToPage = (link, key, props) => {
  const workflowId = props.appState.instanceId;

  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { ...props.appState.data, submitting: true });

  const steps = [
    { name: 'hasUserEnteredData', data: { answer: 'No' } },
    { name: 'moveTo', data: { key } }
  ];

  props.actions.cgActions.batchCompleteTask(props.appState.modelName, workflowId, steps)
    .then(() => {
      props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, {
        ...props.appState.data,
        selectedLink: key,
        activateRedirectLink: link,
        activateRedirect: true
      });
    });
};

const SideNav = (props) => {
  const redirect = (props.activateRedirect)
    ? (<Redirect to={props.activateRedirectLink} />)
    : null;
  return (
    <nav className="site-nav">
      { redirect }
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
            <span className={agentLink.styleName} onClick={() => goToPage(agentLink.link, agentLink.key, props)}>
              <a className={props.appState.data.selectedLink === agentLink.key ? `${agentLink.styleName} active` : `${agentLink.styleName}`}>{agentLink.label}</a>
            </span>
          </li>
      ))}
        <hr className="nav-division" />
        <li>
          <button className="btn btn-primary btn-sm btn-block" onClick={() => NewNoteFileUploaderPopup(props)}><i className="fa fa-plus" /> Note / File</button>
        </li>
        <li>
          <button className="btn btn-secondary btn-xs btn-block" onClick={() => UWconditionsPopup(props)}>Underwriting Conditions</button>
        </li>
      </ul>
      { props.appState.data.showNewNoteFileUploader === true &&
        <NewNoteFileUploader closeButtonHandler={() => closeNewNoteFileUploader(props)} />
      }
      { props.appState.data.showUWconditions === true &&
        <UWconditions
          closeButtonHandler={() => closeUWConditions(props)}
        />
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
      showUWconditions: PropTypes.boolean,
      quote: PropTypes.object,
      updateUnderwriting: PropTypes.boolean
    })
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  completedTasks: state.completedTasks,
  activateRedirectLink: state.appState.data.activateRedirectLink,
  activateRedirect: state.appState.data.activateRedirect
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'SideNav' })(SideNav));
