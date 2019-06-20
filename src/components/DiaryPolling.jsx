import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchDiaries } from '../state/actions/diary.actions';
import { isPollingPermitted } from '../state/selectors/diary.selectors';

export class DiaryPolling extends Component {
  componentDidMount() {
    if (!this.props.shouldPoll) return;
    // Set the name of the hidden property and the change event for visibility
    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      this.hidden = 'hidden';
      this.visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      this.hidden = 'msHidden';
      this.visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.hidden = 'webkitHidden';
      this.visibilityChange = 'webkitvisibilitychange';
    }

    this.fetchDiaries();
    this.attemptFetchDiaries();
  }

  componentWillUnmount() {
    if (this.delegate) clearInterval(this.delegate);
  }

  attemptFetchDiaries = () => {
    clearInterval(this.delegate);
    this.delegate = setInterval(() => {
      if (!document[this.hidden]) {
        this.fetchDiaries();
      }
    }, 30000);
  };

  fetchDiaries = () => {
    const { fetchDiaries, filter } = this.props;
    fetchDiaries({ ...filter });
  };

  delegate = () => {};

  render() {
    return null;
  }
}

DiaryPolling.propTypes = {
  fetchDiaries: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    userId: PropTypes.string,
    resourceType: PropTypes.string,
    resourceId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ])
  }).isRequired
};

const mapStateToProps = state => {
  return {
    shouldPoll: isPollingPermitted(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchDiaries }
)(DiaryPolling);
