import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from '@exzeo/core-ui/lib/Loader';
import * as errorActions from '../../state/actions/errorActions';
import NoteList from '../Common/NoteList';
import Footer from '../Common/Footer';

export class NotesFiles extends Component {
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
    errorActions: PropTypes.shape({
      setAppError: PropTypes.func.isRequired
    })
  })
};

const mapStateToProps = state => ({
  notes: state.service.notes,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  actions: {
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesFiles);
