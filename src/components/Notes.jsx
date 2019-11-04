import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from '@exzeo/core-ui';

import { fetchNotes } from '../state/actions/notes.actions';
import { setAppError } from '../state/actions/error.actions';
import NoteList from './NoteList';
import Footer from './Common/Footer';

export class Notes extends Component {
  state = { isLoading: true };

  async componentDidMount() {
    const { numbers, numberType, fetchNotes } = this.props;
    const notes = await fetchNotes(numbers, numberType);
    this.setState({ isLoading: false });
  }

  render() {
    const { error, notes, setAppError, policy } = this.props;
    const { isLoading } = this.state;

    return (
      <React.Fragment>
        <div className="route-content">
          {isLoading && <Loader />}
          <div className="scroll">
            <NoteList notes={notes} setAppError={setAppError} entity={policy} />
          </div>
        </div>
        <div className="basic-footer">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

Notes.propTypes = {
  numbers: PropTypes.array.isRequired,
  numberType: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  notes: state.notes,
  policy: state.policyState.policy
});

export default connect(
  mapStateToProps,
  {
    fetchNotes,
    setAppError
  }
)(Notes);
