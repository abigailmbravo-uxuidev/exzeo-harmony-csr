import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SideNavigation } from '@exzeo/core-ui/src/@Harmony';

import {
  toggleNote,
  toggleDiary,
  setNotesSynced
} from '../state/actions/ui.actions';
import { setAppError } from '../state/actions/error.actions';
import { POLICY_RESOURCE_TYPE } from '../constants/diaries';

import PlusButton from './PlusButton';
import GenerateDocsForm from './GenerateDocsForm';
import Clock from './Clock';

const getNavLinks = ({ policyNumber }) => [
  {
    key: 'coverage',
    to: `/policy/${policyNumber}/coverage`,
    label: <span>Coverage / Rating</span>,
    className: 'coverage',
    exact: true
  },
  {
    key: 'policyholder',
    to: `/policy/${policyNumber}/policyHolder`,
    label: <span>Policyholder / Agent</span>,
    className: 'policyholder',
    exact: true
  },
  {
    key: 'billing',
    to: `/policy/${policyNumber}/billing`,
    label: <span>Mortgage / Billing</span>,
    className: 'billing',
    exact: true
  },
  {
    key: 'notes',
    to: `/policy/${policyNumber}/notes`,
    label: <span>Notes / Files / Diaries</span>,
    className: 'notes',
    exact: true
  },
  {
    key: 'cancel',
    to: `/policy/${policyNumber}/cancel`,
    label: <span>Cancel Policy</span>,
    className: 'cancel',
    exact: true
  },
  {
    key: 'endorsements',
    to: `/policy/${policyNumber}/endorsements`,
    label: <span>Endorsements</span>,
    className: 'endorsements',
    exact: true
  }
];

export class SideNav extends React.Component {
  state = {
    showDocsForm: false
  };

  newDiary = () => {
    const { toggleDiary, policy } = this.props;

    const { companyCode, state, product, policyNumber } = policy;

    toggleDiary({
      companyCode,
      state,
      product,
      resourceType: POLICY_RESOURCE_TYPE,
      resourceId: policyNumber,
      entity: policy
    });
  };

  newNote = () => {
    const { toggleNote, policy } = this.props;

    const { companyCode, state, product, policyNumber, sourceNumber } = policy;

    toggleNote({
      companyCode,
      state,
      product,
      noteType: 'Policy Note',
      documentId: policyNumber,
      sourceNumber,
      resourceType: POLICY_RESOURCE_TYPE,
      entity: policy
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
    const { policy, setAppError } = this.props;

    const ClockComponent = React.memo(() => (
      <Clock timezone={policy?.property?.timezone} />
    ));

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
              data-test="generate-document-btn"
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
        <ClockComponent />
        <PlusButton newNote={this.newNote} newDiary={this.newDiary} />
      </nav>
    );
  }
}

SideNav.propTypes = {
  policy: PropTypes.object
};

const mapStateToProps = state => ({
  activateRedirectLink: state.appState.data.activateRedirectLink,
  activateRedirect: state.appState.data.activateRedirect,
  policy: state.policyState.policy || {}
});

export default connect(mapStateToProps, {
  toggleNote,
  toggleDiary,
  setAppError,
  setNotesSynced
})(SideNav);
