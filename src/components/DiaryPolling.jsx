import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchDiaries } from '../state/actions/diaryActions';

class DiaryPolling extends Component {
  componentDidMount() {
    const { userId, fetchDiaries } = this.props;
    clearInterval(this.delegate);
    this.delegate = setInterval(() => {
      fetchDiaries({ userId });
    }, 30000);
  }

  componentWillUnmount() {
    if (this.delegate) clearInterval(this.delegate);
  }

  delegate = () => {};

  render() {
    return (null);
  }
}

DiaryPolling.propTypes = {
  fetchDiaries: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

export default connect(null, { fetchDiaries })(DiaryPolling);

