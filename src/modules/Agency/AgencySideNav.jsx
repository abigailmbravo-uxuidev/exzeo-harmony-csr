import React from 'react';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { Select } from '@exzeo/core-ui';
import { connect } from 'react-redux';

import { createBranch } from '../../state/actions/agencyActions';
import { getBranchesList, getBranchInitialValues } from '../../state/selectors/agency.selector';
import history from '../../history';

import BranchModal from './BranchModal';

const csrLinks = agencyCode => [{
  key: 'overview',
  link: `/agency/${agencyCode}/overview`,
  label: 'Overview',
  styleName: 'overview',
  exact: true
},
{
  key: 'agents',
  link: `/agency/${agencyCode}/agents`,
  label: 'Agents',
  styleName: 'agents',
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
  // onHandleNewBranch = async (data, dispatch, props) => {
  //   const branch = await this.props.createBranch(data, this.props.agencyCode);
  //   history.push(`/agency/${props.agencyCode}/branch/${branch.branchCode}`);
  //   this.handleShowBranchModal();
  // };

  handleBranchSelection =(value) => {
    const { agencyCode } = this.props;
    if (Number(value) > 0) {
      history.push(`/agency/${agencyCode}/branch/${value}`);
    } else {
      history.push(`/agency/${agencyCode}/overview`);
    }
  }

  render() {
    const {
      agencyCode, branchCode, branchesList
    } = this.props;

    return (
      <form>
        <nav className="site-nav">
          <ul>
            {agencyCode !== 'new' &&
            <li key="branch">
              <Field
                dataTest="selectedBranch"
                name="selectedBranch"
                label="Branch"
                component={Select}
                styleName="flex-child"
                answers={branchesList}
                showPlaceholder={false}
                normalize={(v, pv, av) => this.handleBranchSelection(v)} />
            </li>
            }
            {!branchCode && agencyCode !== 'new' &&
            <li key="newBranch" >
              <NavLink
                to={`/agency/${agencyCode}/newBranch`}
                tabIndex="0"
                className="btn btn-primary btn-block btn-small"
                type="button">
                <i className="fa fa-plus" />Branch
              </NavLink>
            </li>
            }
            {csrLinks(agencyCode).map((agentLink, index) => (
              <li key={agentLink.key}>
                <span className={agentLink.styleName}>
                  <NavLink to={agentLink.link} activeClassName="active" exact>{agentLink.label}</NavLink>
                </span>
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
