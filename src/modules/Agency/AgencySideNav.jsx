import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import * as appStateActions from '../../state/actions/appStateActions';
import * as cgActions from '../../state/actions/cgActions';
// import NewNoteFileUploader from '../Common/NewNoteFileUploader';

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
const csrLinks = agencyCode => [{
  key: 'overview',
  link: `/agency/${agencyCode}/overview`,
  label: 'Overview',
  styleName: 'overview',
  exact: true
},
{
  key: 'contracts',
  link: `/agency/${agencyCode}/contracts`,
  label: 'Contracts',
  styleName: 'contracts',
  exact: true
},
{
  key: 'agents',
  link: `/agency/${agencyCode}/agents`,
  label: 'Agents',
  styleName: 'agents',
  exact: true
}, {
  key: 'notes',
  link: '#',
  label: 'Notes / Files',
  styleName: 'notes disabled',
  exact: true
}];

/* TODO: Figure out why the active class is not applied correctly  */
export const SideNav = ({ agency }) => (
  <nav className="site-nav">
    <ul>
      {csrLinks(agency.agencyCode).map((agentLink, index) => (
        <li key={index}>
          <span className={agentLink.styleName}>
            <NavLink to={agentLink.link} activeClassName="active" exact>{agentLink.label}</NavLink>
          </span>
        </li>))
      }
    </ul>
  </nav>);

// TODO: Needs to be connected to wherever it's gonnna get nav links from
SideNav.propTypes = {
  completedTasks: PropTypes.any, // eslint-disable-line
  activateRedirectLink: PropTypes.string,
  activateRedirect: PropTypes.bool
};

const mapStateToProps = state => ({
  activateRedirectLink: state.appState.data.activateRedirectLink,
  activateRedirect: state.appState.data.activateRedirect,
  agency: state.agencyState.agency
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'SideNav' })(SideNav));
