import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { Select, OnChangeListener, Field, Form, noop } from '@exzeo/core-ui';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { toggleNote } from '../../state/actions/ui.actions';
import { createBranch } from '../../state/actions/agency.actions';
import {
  getBranchesList,
  getBranchInitialValues
} from '../../state/selectors/agency.selector';
import { AGENCY_RESOURCE_TYPE } from '../../constants/diaries';

const setLink = (agencyCode, link) => (agencyCode !== 'new' ? link : '#');

const csrLinks = (agencyCode, branchCode) => [
  {
    key: 'overview',
    link: setLink(agencyCode, `/agency/${agencyCode}/${branchCode}/overview`),
    label: 'Overview',
    styleName: classNames('overview', { disabled: agencyCode === 'new' }),
    exact: true
  },
  {
    key: 'agents',
    link: setLink(agencyCode, `/agency/${agencyCode}/${branchCode}/agents`),
    label: 'Agents',
    styleName: classNames('agents', { disabled: agencyCode === 'new' }),
    exact: true
  },
  {
    key: 'contracts',
    link: setLink(agencyCode, `/agency/${agencyCode}/${branchCode}/contracts`),
    label: 'Contracts',
    styleName: classNames('contracts', { disabled: agencyCode === 'new' }),
    exact: true
  },
  {
    key: 'notes',
    link: setLink(agencyCode, `/agency/${agencyCode}/${branchCode}/notes`),
    label: 'Notes / Files',
    styleName: classNames('notes', { disabled: agencyCode === 'new' }),
    exact: true
  },
  {
    key: 'reports',
    link: '#',
    label: 'Reports',
    styleName: 'reports disabled',
    exact: true
  },
  {
    key: 'transfer',
    link: setLink(agencyCode, `/agency/${agencyCode}/${branchCode}/transfer`),
    label: 'Transfer',
    styleName: classNames('transfer', { disabled: agencyCode === 'new' }),
    exact: true
  }
];

export const SideNav = ({
  agencyCode,
  branchCode,
  branchesList,
  match: { url },
  toggleNote,
  agency
}) => {
  const [branchSelectionRoute, setBranchSelectionRoute] = useState(false);

  const handleBranchSelection = (value, agencyCode) => {
    if (Number(value) > 0) {
      setBranchSelectionRoute(`/agency/${agencyCode}/${value}/overview`);
    } else {
      setBranchSelectionRoute(`/agency/${agencyCode}/0/overview`);
    }
    return value;
  };

  const newNote = () => {
    toggleNote({
      noteType: 'Agency Note',
      documentId: agencyCode,
      resourceType: AGENCY_RESOURCE_TYPE,
      entity: agency
    });
  };

  return (
    <React.Fragment>
      {branchSelectionRoute && !branchSelectionRoute.includes(url) && (
        <Redirect replace to={branchSelectionRoute} />
      )}
      <nav className="site-nav">
        <ul className="side-navigation">
          {String(branchCode) === '0' && agencyCode !== 'new' && (
            <React.Fragment>
              <li key="newBranch" data-test="new-branch">
                <NavLink
                  to={`/agency/${agencyCode}/${branchCode}/new`}
                  tabIndex="0"
                  className="btn btn-secondary btn-block btn-xs btn-branch"
                >
                  <i className="fa fa-plus" />
                  Branch
                </NavLink>
              </li>
              <hr className="nav-division" />
            </React.Fragment>
          )}
          {branchesList.length > 1 && agencyCode !== 'new' && (
            <li key="branch" data-test="branch">
              <Form onSubmit={noop}>
                {() => (
                  <React.Fragment>
                    <Field name="selectedBranch">
                      {({ input, meta }) => (
                        <Select
                          input={input}
                          meta={meta}
                          id="selectedBranch"
                          dataTest="selectedBranch"
                          styleName="flex-child selectedBranch"
                          label="Branch"
                          answers={branchesList}
                          showPlaceholder={false}
                        />
                      )}
                    </Field>
                    <OnChangeListener name="selectedBranch">
                      {value => {
                        if (value) {
                          handleBranchSelection(value, agencyCode);
                        }
                      }}
                    </OnChangeListener>
                  </React.Fragment>
                )}
              </Form>
            </li>
          )}
          {csrLinks(agencyCode, branchCode).map((agentLink, index) => (
            <li key={agentLink.key}>
              <span className={agentLink.styleName}>
                <NavLink
                  to={agentLink.link}
                  className={agentLink.styleName}
                  activeClassName={agentLink.link !== '#' ? 'active' : ''}
                  exact
                >
                  <span>{agentLink.label}</span>
                </NavLink>
              </span>
            </li>
          ))}
        </ul>
        <div className="plus-button-group">
          <button
            type="button"
            aria-label="open-btn form-new-note"
            data-test="new-note"
            className="btn btn-primary btn-round btn-lg new-note-btn"
            disabled={agencyCode === 'new'}
            onClick={newNote}
          >
            <i className="fa fa-pencil" />
            <span>NEW NOTE</span>
          </button>
        </div>
      </nav>
    </React.Fragment>
  );
};

const mapStateToProps = (state, props) => {
  const { branchCode } = props;
  return {
    agency: state.agencyState.agency,
    branchesList: getBranchesList(state),
    initialValues: { selectedBranch: branchCode },
    branchInitialValues: getBranchInitialValues(state)
  };
};

export default connect(mapStateToProps, { createBranch, toggleNote })(SideNav);
