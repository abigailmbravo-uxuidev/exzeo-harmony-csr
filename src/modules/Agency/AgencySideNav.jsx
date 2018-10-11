import React from 'react';
import { NavLink } from 'react-router-dom';
import AddBranchModal from './AddBranchModal';

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

export const onHandleNewBranch = ({ agencyCode }) => {

};
export class SideNav extends React.Component {
  state = {
    showBranchModal: false
  }

  handleShowBranchModal = () => {
    this.setState({ showBranchModal: !this.state.showBranchModal });
  }
  render() {
    const { agencyCode } = this.props;
    return (
      <nav className="site-nav">
        <ul>
          <li key="branch" >
            <button
              tabIndex="0"
              className="btn btn-primary"
              onClick={this.handleShowBranchModal}
              type="button">
                + Branch
            </button>
          </li>
          {csrLinks(agencyCode).map((agentLink, index) => (
            <li key={index}>
              <span className={agentLink.styleName}>
                <NavLink to={agentLink.link} activeClassName="active" exact>{agentLink.label}</NavLink>
              </span>
            </li>))
      }
        </ul>
        {this.state.showBranchModal && <AddBranchModal closeModal={this.handleShowBranchModal} />}
      </nav>);
  }
}
export default SideNav;
