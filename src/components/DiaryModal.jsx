import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Loader from '@exzeo/core-ui/lib/Loader';
import { Date, Select, validation } from '@exzeo/core-ui';

import { submitDiary } from '../state/actions/diary.actions';
import { toggleDiary } from '../state/actions/ui.actions';
import { setAppError } from '../state/actions/error.actions';
import { REASONS, TYPES, USERS } from '../constants/diaries';


export const TextArea = ({
  input, label, meta: { touched, error }
}) => (
  <div className={`${touched && error ? 'error' : ''} text-area-wrapper`}>
    <textarea {...input} placeholder={label} rows="10" cols="40" />
    {touched && error && <span className="error-message">{error}</span>}
  </div>
);

export class DiaryModal extends Component {
  state = { minimize: false };

  componentDidMount() {
    // TODO: not sure this logic should be here. Seems like it should be much further up the tree
    const { setAppErrorAction, user } = this.props;
    if (!user.profile || !user.profile.given_name || !user.profile.family_name) {
      const message = 'There was a problem with your user profile. Please logout of Harmony and try logging in again.';
      setAppErrorAction({ message });
      this.handleCancel();
    }
  }

  handleMinimize = () => {
    this.setState({ minimize: !this.state.minimize });
  };

  handleCancel = () => {
    this.props.toggleDiaryAction();
  };

  handleCloseDiary = () => {
    this.handleCancel();
  }

  submitDiary = async (data, dispatch, props) => {
    try {
      await props.submitDiaryAction(data, props);
    } catch (error) {
      props.setAppErrorAction({ message: error });
    } finally {
      this.handleCancel();
    }
  };

  render() {
    const { submitting, handleSubmit } = this.props;

    return (
      <div className={this.state.minimize ? 'new-note-file minimize' : 'new-note-file new-diary-file'} >
        <div className="title-bar">
          <div className="title title-minimize-button" onClick={this.handleMinimize}>Diary</div>
          <div className="controls note-file-header-button-group">
            <button
              className="btn btn-icon minimize-button"
              type="button"
              onClick={this.handleMinimize}>
              <i className="fa fa-window-minimize" aria-hidden="true" />
            </button>
            <button
              className="btn btn-icon header-cancel-button"
              type="button"
              onClick={this.handleCancel} >
              <i className="fa fa-times-circle" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="mainContainer">
          {submitting && <Loader />}
          <form id="DiaryModal" onSubmit={handleSubmit(this.submitDiary)} >
            <div className="content">
              <Field
                name="type"
                label="Type"
                component={Select}
                answers={TYPES}
                validate={validation.isRequired}
                dataTest="diaryType" />
              <Field
                name="assignee.id"
                label="Assignee"
                component={Select}
                answers={USERS}
                validate={validation.isRequired}
                dataTest="assignee" />
              <Field
                name="due"
                label="Due Date"
                component={Date}
                validate={[validation.isRequired, validation.isDate]}
                dataTest="due" />
              <Field
                name="reason"
                label="Reason"
                component={Select}
                answers={REASONS}
                validate={validation.isRequired}
                dataTest="reason" />
              <label>Message</label>
              <Field
                name="message"
                label="Message"
                component={TextArea}
                validation={validation.isRequired} />
            </div>
            <div className="buttons note-file-footer-button-group">
              <button
                tabIndex="0"
                type="button"
                data-test="note-close-diary"
                className="btn btn-primary close-diary-button"
                onClick={handleSubmit((values, dispatch, props) => {
                  this.submitDiary({ ...values, open: false }, dispatch, props);
                })}>
                Close Diary
              </button>
              <button
                tabIndex="0"
                type="button"
                data-test="note-cancel"
                className="btn btn-secondary cancel-button"
                onClick={this.handleCancel}>
                Cancel
              </button>
              <button
                tabIndex="0"
                type="submit"
                data-test="note-submit"
                className="btn btn-primary submit-button">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

DiaryModal.propTypes = {

};


export default connect(null, {
  setAppErrorAction: setAppError,
  submitDiaryAction: submitDiary,
  toggleDiaryAction: toggleDiary
})(reduxForm({
  form: 'DiaryModal',
  enableReinitialize: true
})(DiaryModal));
