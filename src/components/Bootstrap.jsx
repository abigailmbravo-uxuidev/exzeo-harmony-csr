import React from 'react';
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

export default connect(null, { getAssignees: getDiaryAssigneeOptions })(
  Bootstrap
);
