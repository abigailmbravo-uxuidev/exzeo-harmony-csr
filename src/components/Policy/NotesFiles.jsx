import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from '@exzeo/core-ui/lib/Loader';
import { getNotes } from '../../state/actions/serviceActions';
import * as errorActions from '../../state/actions/errorActions';
import NoteList from '../Common/NoteList';
import Footer from '../Common/Footer';
import { getFilteredAllDiaries } from '../../state/selectors/diary.selectors';

export class NotesFiles extends Component {
  componentDidMount() {
    const { policy, actions: { getNotes } } = this.props;

    const ids = [policy.policyNumber, policy.sourceNumber];
    getNotes(ids.toString(), policy.policyNumber);
  }

  render() {
    const { notes } = this.props;
    return (
      <React.Fragment>
        <div className="route-content">

          {(!notes) && <Loader />}

          <div className="scroll">
            <NoteList {...this.props} />
          </div>
        </div>
        <div className="basic-footer">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

NotesFiles.propTypes = {
  notes: PropTypes.array,
  error: PropTypes.object,
  actions: PropTypes.shape({
    getNotes: PropTypes.func,
    errorActions: PropTypes.shape({
      setAppError: PropTypes.func.isRequired
    })
  })
};

const mapStateToProps = (state, ownProps) => {
  const resource = ownProps.match.path.split('/')[1];
  return {
    notes: state.service.notes,
    policy: state.policyState.policy,
    error: state.error,
    diaries: getFilteredAllDiaries(state, resource) || []
  };
};

const mapDispatchToProps = dispatch => ({
  actions: {
    getNotes: bindActionCreators(getNotes, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesFiles);
