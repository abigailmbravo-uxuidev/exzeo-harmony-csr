import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { Select } from '@exzeo/core-ui';
import { connect } from 'react-redux';

import { createBranch } from '../../state/actions/agency.actions';
import { getBranchesList, getBranchInitialValues } from '../../state/selectors/agency.selector';


const setLink = (key, agencyCode, branchCode) => {
  if (agencyCode === 'new') return '#';
  switch (key) {
    case 'overview':
      return `/agency/${agencyCode}/${branchCode}/overview`;
    case 'agents':
      return `/agency/${agencyCode}/${branchCode}/agents`;
    case 'contracts':
      return `/agency/${agencyCode}/${branchCode}/contracts`;
    default:
      return '#';
  }
};

const setDisabled = agencyCode => (agencyCode === 'new' ? 'disabled' : '');

const csrLinks = (agencyCode, branchCode) => [{
  key: 'overview',
  link: setLink('overview', agencyCode, branchCode),
  label: 'Overview',
  styleName: `overview ${setDisabled(agencyCode)}`,
  exact: true
},
{
  key: 'agents',
  link: setLink('agents', agencyCode, branchCode),
  label: 'Agents',
  styleName: `agents ${setDisabled(agencyCode)}`,
  exact: true
},
{
  key: 'contracts',
  link: setLink('contracts', agencyCode, branchCode),
  label: 'Contracts',
  styleName: `contracts ${setDisabled(agencyCode)}`,
  exact: true
},
{
  key: 'notes',
  link: '#',
  label: 'Notes / Files',
  styleName: 'notes disabled',
  exact: true
}, {
  key: 'reports',
  link: '#',
  label: 'Reports',
  styleName: 'reports disabled',
  exact: true
}];

export class SideNav extends React.Component {
  state = {
    branchSelectionRoute: null
  }

  handleBranchSelection =(event) => {
    const { target: { value } } = event;
    const { agencyCode } = this.props;
    if (Number(value) > 0) {
      this.setState({ branchSelectionRoute: `/agency/${agencyCode}/${value}/overview` });
    } else {
      this.setState({ branchSelectionRoute: `/agency/${agencyCode}/0/overview` });
    }
    return value;
  }

  render() {
    const {
      agencyCode, branchCode, branchesList, match: { url }
    } = this.props;

    const { branchSelectionRoute } = this.state;
    return (
      <form>
        {branchSelectionRoute && !branchSelectionRoute.includes(url) && <Redirect replace to={branchSelectionRoute} />}
        <nav className="site-nav">
          <ul>
            {(String(branchCode) === '0' && agencyCode !== 'new') &&
            <React.Fragment>
              <li key="newBranch" >
                <NavLink
                  to={`/agency/${agencyCode}/${branchCode}/new`}
                  tabIndex="0"
                  className="btn btn-secondary btn-block btn-xs btn-branch">
                  <i className="fa fa-plus" />Branch
                </NavLink>
              </li>
              <hr className="nav-division" />
            </React.Fragment>
            }
            {(branchesList.length > 1 && agencyCode !== 'new') &&
            <li key="branch">
              <Field
                dataTest="selectedBranch"
                name="selectedBranch"
                label="Branch"
                component={Select}
                styleName="flex-child"
                answers={branchesList}
                showPlaceholder={false}
                onChange={event => this.handleBranchSelection(event)} />
            </li>
            }
            {csrLinks(agencyCode, branchCode).map((agentLink, index) => (
              <li key={agentLink.key}>
                <NavLink className={agentLink.styleName} to={agentLink.link} activeClassName="active" exact>
                  <span>{agentLink.label}</span>
                </NavLink>
              </li>))
      }
          </ul>
        </nav>
      </form>);
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

export default connect(mapStateToProps, { createBranch })(reduxForm({
  form: 'SideNav',
  enableReinitialize: true
})(SideNav));
