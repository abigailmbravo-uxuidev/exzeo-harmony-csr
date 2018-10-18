import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getDiaryAssigneeOptions } from '../state/actions/questions.actions';


class Bootstrap extends Component {
  componentDidMount() {
    const { getAssignees, userProfile } = this.props;
    console.log(this.props);

    getAssignees({ userProfile });
  }

  render() {
    return null;
  }
}

export default withRouter(connect(null, {
  getAssignees: getDiaryAssigneeOptions
})(Bootstrap));
