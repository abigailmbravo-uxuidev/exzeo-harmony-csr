import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SideNavigation } from '@exzeo/core-ui/src/@Harmony';

import {
  toggleNote,
  toggleDiary,
  setNotesSynced
} from '../state/actions/ui.actions';
import { startWorkflow } from '../state/actions/cg.actions';
import { setAppError } from '../state/actions/error.actions';
import { POLICY_RESOURCE_TYPE } from '../constants/diaries';

import PlusButton from './PlusButton';
import GenerateDocsForm from './GenerateDocsForm';

const getNavLinks = ({ policyNumber }) => [
  {
    key: 'coverage',
    to: `/policy/${policyNumber}/coverage`,
    label: 'Coverage / Rating',
    styleName: 'coverage',
    exact: true
  },
  {
    key: 'policyholder',
    to: `/policy/${policyNumber}/policyHolder`,
    label: 'Policyholder / Agent',
    styleName: 'policyholder',
    exact: true
  },
  {
    key: 'billing',
    to: `/policy/${policyNumber}/billing`,
    label: 'Mortgage / Billing',
    styleName: 'billing',
    exact: true
  },
  {
    key: 'notes',
    to: `/policy/${policyNumber}/notes`,
    label: 'Notes / Files / Diaries',
    styleName: 'notes',
    exact: true
  },
  {
    key: 'cancel',
    to: `/policy/${policyNumber}/cancel`,
    label: 'Cancel Policy',
    styleName: 'cancel',
    exact: true
  },
  {
    key: 'endorsements',
    to: `/policy/${policyNumber}/endorsements`,
    label: 'Endorsements',
    styleName: 'endorsements',
    exact: true
  }
];

export class SideNav extends React.Component {
  state = {
    showDocsForm: false
  };

  newDiary = () => {
    const {
      toggleDiary,
      policy: { companyCode, state, product, policyNumber }
    } = this.props;

    toggleDiary({
      companyCode,
      state,
      product,
      resourceType: POLICY_RESOURCE_TYPE,
      resourceId: policyNumber,
      entity: this.props.policy
    });
  };

  newNote = () => {
    const {
      toggleNote,
      policy: { companyCode, state, product, policyNumber, sourceNumber }
    } = this.props;
    toggleNote({
      companyCode,
      state,
      product,
      noteType: 'Policy Note',
      documentId: policyNumber,
      sourceNumber,
      resourceType: POLICY_RESOURCE_TYPE,
      entity: this.props.policy
    });
  };

  generateDoc = () => {
    this.setState({ showDocsForm: !this.state.showDocsForm });
  };

  updateNotes = () => {
    const { setNotesSynced } = this.props;
    return () => {
      setNotesSynced();
    };
  };

  render() {
    const { policy, startWorkflow, setAppError } = this.props;
    return (
      <nav className="site-nav">
        <SideNavigation
          navLinks={getNavLinks({ policyNumber: policy.policyNumber })}
        >
          <hr className="nav-division" />
          <li>
            <button
              aria-label="open-btn"
              className="btn btn-primary btn-sm btn-block"
              onClick={this.generateDoc}
            >
              <i className="fa fa-plus" />
              Document
            </button>
          </li>
          <li
            className={
              this.state.showDocsForm
                ? 'document-panel show'
                : 'document-panel hidden'
            }
          >
            {this.state.showDocsForm && (
              <GenerateDocsForm
                policy={policy}
                updateNotes={this.updateNotes(this.props)}
                errorHandler={setAppError}
              />
            )}
          </li>
        </SideNavigation>
        <PlusButton newNote={this.newNote} newDiary={this.newDiary} />
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
  policy: state.policyState.policy || {}
});

export default connect(
  mapStateToProps,
  {
    startWorkflow,
    toggleNote,
    toggleDiary,
    setAppError,
    setNotesSynced
  }
)(SideNav);
