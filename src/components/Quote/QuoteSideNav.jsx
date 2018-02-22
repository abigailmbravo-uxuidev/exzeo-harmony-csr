import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { reduxForm, propTypes } from 'redux-form';
import * as appStateActions from '../../actions/appStateActions';
import UWconditions from '../Common/UWconditions';
import * as cgActions from '../../actions/cgActions';
import NoteUploader from '../Common/NoteUploader';


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

export const NewNoteFileUploaderPopup = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { ...props.appState.data, showNewNoteFileUploader: true });
};

export const closeNewNoteFileUploader = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { ...props.appState.data, showNewNoteFileUploader: false });
};

export const UWconditionsPopup = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { ...props.appState.data, showUWconditions: true });
};

export const closeUWConditions = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { ...props.appState.data, showUWconditions: false });
};

const goToPage = (agentLink, props, quote) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId,
    { ...props.appState.data,
      activateRedirectLink: agentLink.link,
      activateRedirect: true
    });
};


export const SideNav = (props) => {
  const redirect = (props.activateRedirect)
    ? (<Redirect to={props.activateRedirectLink} />)
    : null;

  const onKeyPress = (event, agentLink) => {
    if (event.charCode === 13) {
      goToPage(agentLink, props, quote);
    }
  };

  const quote = props.quoteData;
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
            <span tabIndex={'0'} onKeyPress={event => onKeyPress(event, agentLink)} className={agentLink.styleName} onClick={() => goToPage(agentLink, props, quote)}>
              <a className={props.appState.data.selectedLink === agentLink.key ? `${agentLink.styleName} active` : `${agentLink.styleName}`}>{agentLink.label}</a>
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
      { props.appState.data.showNewNoteFileUploader === true &&
        <NoteUploader noteType="Quote Note" documentId={quote.quoteNumber} closeButtonHandler={() => closeNewNoteFileUploader(props)} />
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
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'SideNav' })(SideNav));
