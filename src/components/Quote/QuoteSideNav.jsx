import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { reduxForm, propTypes } from 'redux-form';
import * as appStateActions from '../../actions/appStateActions';
import UWconditions from '../Common/UWconditions';
import * as cgActions from '../../actions/cgActions';

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
  styleName: 'summary'
}, {
  key: 'application',
  link: '/quote/application',
  label: 'Application',
  styleName: 'application',
  exact: true
}];

const UWconditionsPopup = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showUWconditions: true });
};

const closeUWConditions = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showUWconditions: false });
};

const goToPage = (link, key, props) => {
  const workflowId = props.appState.instanceId;

  const steps = [
    { name: 'hasUserEnteredData', data: { answer: 'No' } },
    { name: 'moveTo', data: { key } }
  ];

  props.actions.cgActions.batchCompleteTask(props.appState.modelName, workflowId, steps)
    .then(() => {
      props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, {
        ...props.appState.data,
        activateRedirectLink: link,
        activateRedirect: true,
        updateWorkflowDetails: true
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
            <a className={agentLink.styleName} activeClassName="active" onClick={() => goToPage(agentLink.link, agentLink.key, props)}>
              <span>{agentLink.label}</span>
            </a>
          </li>
      ))}
        <hr className="quote-hr" />
        <li>
          <button className="btn btn-secondary btn-xs" onClick={() => UWconditionsPopup(props)}>Underwriting Conditions</button>
        </li>
        { props.appState.data.showUWconditions === true &&
        <UWconditions
          closeButtonHandler={() => closeUWConditions(props)}
        />
      }
      </ul>
    </nav>);
};

// TODO: Needs to be connected to wherever it's gonnna get nav links from
SideNav.propTypes = {
  ...propTypes,
  completedTasks: PropTypes.any, // eslint-disable-line
  activateRedirectLink: PropTypes.bool,
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
