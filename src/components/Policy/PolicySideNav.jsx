import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as uiActions from '../../state/actions/ui.actions';
import * as serviceActions from '../../state/actions/service.actions';
import * as cgActions from '../../state/actions/cg.actions';
import * as errorActions from '../../state/actions/error.actions';
import { POLICY_RESOURCE_TYPE } from '../../constants/diaries';

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
  link: `/policy/${policyNumber}/coverage`,
  label: 'Coverage / Rating',
  styleName: 'coverage',
  exact: true
}, {
  key: 'policyholder',
  link: `/policy/${policyNumber}/policyHolder`,
  label: 'Policyholder / Agent',
  styleName: 'policyholder',
  exact: true
}, {
  key: 'billing',
  link: `/policy/${policyNumber}/billing`,
  label: 'Mortgage / Billing',
  styleName: 'billing',
  exact: true
}, {
  key: 'notes',
  link: `/policy/${policyNumber}/notes`,
  label: 'Notes / Files',
  styleName: 'notes',
  exact: true
}, {
  key: 'cancel',
  link: `/policy/${policyNumber}/cancel`,
  label: 'Cancel Policy',
  styleName: 'cancel',
  exact: true
},
{
  key: 'endorsements',
  link: `/policy/${policyNumber}/endorsements`,
  label: 'Endorsements',
  styleName: 'endorsements',
  exact: true
}];

export class SideNav extends React.Component {
  state = {
    showDocsForm: false
  };

  newDiary = () => {
    const { actions, policy } = this.props;
    actions.uiActions.toggleDiary({
      resourceType: POLICY_RESOURCE_TYPE,
      resourceId: policy.policyNumber,
      entityEndDate: policy.endDate
    });
  };

  newNote = () => {
    const { actions, policy } = this.props;
    actions.uiActions.toggleNote({
      noteType: 'Policy Note',
      documentId: policy.policyNumber,
      sourceNumber: policy.sourceNumber,
      resourceType: POLICY_RESOURCE_TYPE
    });
  };

  generateDoc = () => {
    this.setState({ showDocsForm: !this.state.showDocsForm });
  };

  updateNotes = () => {
    const { actions, policy } = this.props;
    return () => {
      actions.serviceActions.getNotes(policy.policyNumber, policy.sourceNumber);
    };
  };

  render() {
    const { actions, policy } = this.props;
    return (
      <nav className="site-nav">
        <ul>
          {csrLinks({ policyNumber: policy.policyNumber }).map(link => (
            <li key={link.key}>
              <span className={link.styleName}>
                <NavLink to={link.link} activeClassName="active" exact>{link.label}</NavLink>
              </span>
            </li>
          ))}
          <hr className="nav-division" />
          <li>
            <button aria-label="open-btn" className="btn btn-primary btn-sm btn-block" onClick={() => this.generateDoc()}><i className="fa fa-plus" />Document</button>
          </li>
          <li className={this.state.showDocsForm ? 'document-panel show' : 'document-panel hidden'}>
            {this.state.showDocsForm &&
              <GenerateDocsForm
                policyNumber={policy.policyNumber}
                updateNotes={this.updateNotes(this.props)}
                startWorkflow={actions.cgActions.startWorkflow}
                errorHandler={actions.errorActions.setAppError} />
            }
          </li>
        </ul>
        <div className="plus-button-group">
          <div className="btn btn-round btn-primary btn-lg new-btn" data-test="plusButtons"><i className="fa fa-plus" /></div>
          <button aria-label="open-btn form-newDiary" data-test="newDiary" className="btn btn-primary btn-round btn-lg new-diary-btn" onClick={() => this.newDiary()}><i className="fa fa-bookmark" /><span>NEW DIARY</span></button>
          <button aria-label="open-btn form-newNote" data-test="newNote" className="btn btn-primary btn-round btn-lg new-note-btn" onClick={() => this.newNote()}><i className="fa fa-pencil" /><span>NEW NOTE</span></button>
        </div>
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
    uiActions: bindActionCreators(uiActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
