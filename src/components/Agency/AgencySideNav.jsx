import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { reduxForm, propTypes } from 'redux-form';
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
const csrLinks = [{
  key: 'staff',
  link: '/agency/staff',
  label: 'Staff',
  styleName: 'staff',
  exact: true
}, {
  key: 'notes',
  link: '#',
  label: 'Notes / Files',
  styleName: 'notes disabled',
  exact: true
}];


export const SideNav = props => (
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
    </ul>
  </nav>);

// TODO: Needs to be connected to wherever it's gonnna get nav links from
SideNav.propTypes = {
  ...propTypes,
  completedTasks: PropTypes.any, // eslint-disable-line
  activateRedirectLink: PropTypes.string,
  activateRedirect: PropTypes.bool
};

const mapStateToProps = state => ({
  activateRedirectLink: state.appState.data.activateRedirectLink,
  activateRedirect: state.appState.data.activateRedirect,
  agency: state.service.agency || {}
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'SideNav' })(SideNav));
