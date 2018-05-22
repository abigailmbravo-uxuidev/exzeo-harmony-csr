import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import GenerateDocsForm from './GenerateDocsForm';
import * as newNoteActions from '../../actions/newNoteActions';

const csrLinks = [{
  key: 'coverage',
  link: '/policy/coverage',
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

export const newNote = (props) => {
  props.actions.newNoteActions.toggleNote({noteType: 'Policy Note', documentId: props.policy.policyNumber, sourceNumber: props.policy.sourceNumber})
};

export class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDocsForm: false };
  }

  generateDoc = (props) => {
    this.setState({ showDocsForm: !this.state.showDocsForm });
  };

  render() {
    const { policy } = this.props;
    return (
      <nav className="site-nav">
          <ul>
            {csrLinks && csrLinks.length > 0 && csrLinks.map((link, index) => (
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
              <button aria-label="open-btn form-newNote" className="btn btn-primary btn-sm btn-block" onClick={() => newNote(this.props)}><i className="fa fa-plus" />Note / File</button>
            </li>
            <li>
              <button aria-label="open-btn" className="btn btn-primary btn-sm btn-block" onClick={() => this.generateDoc(this.props)}><i className="fa fa-plus" />Document</button>
            </li>
            <li className={this.state.showDocsForm ? 'document-panel show' : 'document-panel hidden'  }>
             <GenerateDocsForm policyNumber={policy.policyNumber} />
            </li>
          </ul>
        </nav>
      )
  };
};

SideNav.propTypes = {
  policy: PropTypes.object
};

const mapStateToProps = state => ({
  policy: state.service.latestPolicy || {}
});

const mapDispatchToProps = dispatch => ({
  actions: {
    newNoteActions: bindActionCreators(newNoteActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
