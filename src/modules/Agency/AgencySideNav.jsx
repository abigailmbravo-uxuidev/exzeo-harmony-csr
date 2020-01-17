import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { Select } from '@exzeo/core-ui';
import { connect } from 'react-redux';

import { toggleNote } from '../../state/actions/ui.actions';
import { createBranch } from '../../state/actions/agency.actions';
import {
  getBranchesList,
  getBranchInitialValues
} from '../../state/selectors/agency.selector';
import { AGENCY_RESOURCE_TYPE } from '../../constants/diaries';

const setDisabled = agencyCode => (agencyCode === 'new' ? 'disabled' : '');

const csrLinks = (agencyCode, branchCode) => [
  {
    key: 'overview',
    link: `/agency/${agencyCode}/${branchCode}/overview`,
    label: 'Overview',
    styleName: `overview ${setDisabled(agencyCode)}`,
    exact: true
  },
  {
    key: 'agents',
    link: `/agency/${agencyCode}/${branchCode}/agents`,
    label: 'Agents',
    styleName: `agents ${setDisabled(agencyCode)}`,
    exact: true
  },
  {
    key: 'contracts',
    link: `/agency/${agencyCode}/${branchCode}/contracts`,
    label: 'Contracts',
    styleName: `contracts ${setDisabled(agencyCode)}`,
    exact: true
  },
  {
    key: 'notes',
    link: `/agency/${agencyCode}/${branchCode}/notes`,
    label: 'Notes / Files',
    styleName: 'notes',
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
    link: `/agency/${agencyCode}/${branchCode}/transfer`,
    label: 'Transfer',
    styleName: `transfer ${setDisabled(agencyCode)}`,
    exact: true
  }
];

export class SideNav extends React.Component {
  state = {
    branchSelectionRoute: null
  };

  handleBranchSelection = event => {
    const {
      target: { value }
    } = event;
    const { agencyCode } = this.props;
    if (Number(value) > 0) {
      this.setState({
        branchSelectionRoute: `/agency/${agencyCode}/${value}/overview`
      });
    } else {
      this.setState({
        branchSelectionRoute: `/agency/${agencyCode}/0/overview`
      });
    }
    return value;
  };

  newNote = () => {
    const { toggleNote, agencyCode, agency } = this.props;
    toggleNote({
      noteType: 'Agency Note',
      documentId: agencyCode,
      resourceType: AGENCY_RESOURCE_TYPE,
      entity: agency
    });
  };

  render() {
    const {
      agencyCode,
      branchCode,
      branchesList,
      match: { url }
    } = this.props;

    const { branchSelectionRoute } = this.state;
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
                <Field
                  dataTest="selectedBranch"
                  name="selectedBranch"
                  label="Branch"
                  component={Select}
                  styleName="flex-child selectedBranch"
                  answers={branchesList}
                  showPlaceholder={false}
                  onChange={event => this.handleBranchSelection(event)}
                />
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
              onClick={this.newNote}
            >
              <i className="fa fa-pencil" />
              <span>NEW NOTE</span>
            </button>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { branchCode } = props;
  return {
    agency: state.agencyState.agency,
    branchesList: getBranchesList(state),
    initialValues: { selectedBranch: branchCode },
    branchInitialValues: getBranchInitialValues(state)
  };
};

export default connect(mapStateToProps, { createBranch, toggleNote })(
  reduxForm({
    form: 'SideNav',
    enableReinitialize: true
  })(SideNav)
);
