import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getDiaryAssigneeOptions } from '../state/actions/questions.actions';

export class Bootstrap extends React.Component {
  componentDidMount() {
    const { getAssignees, userProfile } = this.props;
    getAssignees(userProfile);
  }

  render() {
    return null;
  }
}

export default withRouter(
  connect(
    null,
    {
      getAssignees: getDiaryAssigneeOptions
    }
  )(Bootstrap)
);
