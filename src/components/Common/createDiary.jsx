import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import moment from 'moment';
import Loader from '@exzeo/core-ui/lib/Loader';
import * as cgActions from '../../state/actions/cgActions';
import * as newNoteActions from '../../state/actions/newNoteActions';
import * as serviceActions from '../../state/actions/serviceActions';
import * as errorActions from '../../state/actions/errorActions';

export class CreateDiary extends Component {
  state = { minimize: false }

  minimzeButtonHandler = () => this.setState({ minimize: !this.state.minimize })

  submitDiary = (data, dispatch, props) => {
    const { actions, user, noteType, documentId, sourceId } = props;
  }

  componentDidMount() {
    const { actions, user } = this.props;
    if (!user.profile || !user.profile.given_name || !user.profile.family_name) {
      const message = 'There was a problem with your user profile. Please logout of Harmony and try logging in again.';
      this.closeButtonHandler();
      actions.errorActions.setAppError({ message });
      return false;
    }
  }

  render() {
    return (
      <div className={this.state.minimize ? 'new-note-file minimize' : 'new-note-file'} >
        <div className="title-bar">
          <div className="title title-minimze-button" onClick={() => this.minimzeButtonHandler(this.props)}>Note / File</div>
          <div className="controls note-file-header-button-group">
            <button className="btn btn-icon minimize-button" onClick={() => this.minimzeButtonHandler(this.props)}><i className="fa fa-window-minimize" aria-hidden="true" /></button>
            <button className="btn btn-icon header-cancel-button" onClick={this.closeButtonHandler} type="submit"><i className="fa fa-times-circle" aria-hidden="true" /></button>
          </div>
        </div>
        <div className="mainContainer">
          {this.props.submitting && <Loader />}
          <Form id="CreateDiary" onSubmit={this.props.handleSubmit(this.submitDiary)} noValidate>
            <div className="content">
             
            </div>
            <div className="buttons note-file-footer-button-group">
              <button tabIndex="0" aria-label="cancel-btn form-newNote" className="btn btn-secondary cancel-button" onClick={this.closeButtonHandler}>Cancel</button>
              <button tabIndex="0" aria-label="submit-btn form-newNote" className="btn btn-primary submit-button">Save</button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

CreateDiary.propTypes = {
  documentId: PropTypes.string.isRequired,
  noteType: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  user: state.authState.userProfile
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    newNoteActions: bindActionCreators(newNoteActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'CreateDiary',
  validate
})(CreateDiary));
