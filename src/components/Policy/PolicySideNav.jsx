import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as newNoteActions from '../../state/actions/newNoteActions';
import * as cgActions from '../../state/actions/cgActions';
import * as errorActions from '../../state/actions/errorActions';
import GenerateDocsForm from './GenerateDocsForm';

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
const csrLinks = ({ policyNumber }) => [{
  key: 'coverage',
  link: `/policy/coverage/${policyNumber}`,
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

export class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDocsForm: false };
  }

  newNote = (props) => {
    props.actions.newNoteActions.toggleNote({ noteType: 'Policy Note', documentId: props.policy.policyNumber, sourceNumber: props.policy.sourceNumber });
  }

  generateDoc = (props) => {
    this.setState({ showDocsForm: !this.state.showDocsForm });
  };

  updateNotes = (props) => {
    const { actions, policy } = this.props;
    const ids = [policy.policyNumber, policy.sourceNumber];
    return () => {
      actions.serviceActions.getNotes(ids.toString(), policy.policyNumber);
    };
  }

  render() {
    const { actions, policy } = this.props;
    return (
      <nav className="site-nav">
        <ul>
          {csrLinks && csrLinks.length > 0 && csrLinks({ policyNumber: policy.policyNumber }).map((link, index) => (
              link.outside ?
                <li key={index}>
                  <a className="csr-dashboard" href="/">
                    <span>{link.label}</span>
                  </a>
                </li> :
                <li key={index}>
                  <span className={link.styleName}>
                    <NavLink to={link.link} activeClassName="active" exact>{link.label}</NavLink>
                  </span>
                </li>
            ))}
          <hr className="nav-division" />
          <li>
            <button aria-label="open-btn form-newNote" data-test="newNote" className="btn btn-primary btn-sm btn-block" onClick={() => this.newNote(this.props)}><i className="fa fa-plus" />Note / File</button>
          </li>
          <li>
            <button aria-label="open-btn" className="btn btn-primary btn-sm btn-block" onClick={() => this.generateDoc(this.props)}><i className="fa fa-plus" />Document</button>
          </li>
          <li className={this.state.showDocsForm ? 'document-panel show' : 'document-panel hidden'}>
            {this.state.showDocsForm &&
              <GenerateDocsForm
                policyNumber={policy.policyNumber}
                updateNotes={this.updateNotes(this.props)}
                startWorkflow={actions.cgActions.startWorkflow}
                errorHandler={actions.errorActions.setAppError}
              />}
          </li>
        </ul>
      </nav>
    );
  }
}

SideNav.propTypes = {
  policy: PropTypes.object
};

const mapStateToProps = state => ({
  appState: state.appState,
  completedTasks: state.completedTasks,
  activateRedirectLink: state.appState.data.activateRedirectLink,
  activateRedirect: state.appState.data.activateRedirect,
  cg: state.cg,
  policy: state.policyState.policy || {}
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    newNoteActions: bindActionCreators(newNoteActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
