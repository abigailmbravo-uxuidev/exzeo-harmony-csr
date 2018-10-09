import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Date, Select, validation, Loader } from '@exzeo/core-ui';

import { submitDiary } from '../state/actions/diary.actions';
import { toggleDiary } from '../state/actions/ui.actions';
import { setAppError } from '../state/actions/error.actions';
import { ASSIGNEE_ANSWERS, REASONS, TYPES } from '../constants/diaries';


export const TextArea = ({
  input, label, meta: { touched, error }
}) => (
  <div className={`${touched && error ? 'error' : ''} text-area-wrapper`}>
    <label>{label} </label>
    <textarea {...input} placeholder={label} rows="10" cols="40" />
    {touched && error && <span className="error-message">{error}</span>}
  </div>
);

export class DiaryModal extends Component {
  state = { minimize: false };

  assigneeAnswers = ASSIGNEE_ANSWERS();

  componentDidMount() {
    // TODO: not sure this logic should be here. Seems like it should be much further up the tree
    const { setAppErrorAction, user } = this.props;
    if (!user || !user.givenName || !user.familyName) {
      const message = 'There was a problem with your user profile. Please logout of Harmony and try logging in again.';
      setAppErrorAction({ message });
      this.handleCancel();
    }
  }

  handleMinimize = () => {
    this.setState({ minimize: !this.state.minimize });
  };

  handleCloseDiary = () => {
    this.props.toggleDiaryAction();
  };

  submitDiary = async (data, dispatch, props) => {
    try {
      const { assignee: { id }, ...submitData } = data;
      const assigneeObj = this.assigneeAnswers.find(u => String(u.answer) === String(id));
      const assignee = { id: assigneeObj.answer, displayName: assigneeObj.label, type: assigneeObj.type };
      await props.submitDiaryAction({ ...submitData, assignee }, props);
    } catch (error) {
      props.setAppErrorAction({ message: error });
    } finally {
      this.handleCloseDiary();
    }
  };

  render() {
    const { submitting, handleSubmit } = this.props;

    return (
      <div className={this.state.minimize ? 'new-diary-file minimize' : 'new-diary-file'} >
        <div className="title-bar">
          <div className="title title-minimize-button" onClick={this.handleMinimize}>Diary</div>
          <div className="controls note-file-header-button-group">
            <button
              className="btn btn-icon minimize-button"
              type="button"
              onClick={this.handleMinimize}>
              <i className="fa fa-window-minimize" aria-hidden="true" />
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
                styleName="assignee"
                label="Assignee"
                component={Select}
                answers={this.assigneeAnswers}
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
              <Field
                name="message"
                label="Message"
                component={TextArea}
                validate={validation.isRequired} />
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
                onClick={this.handleCloseDiary}>
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
  handleSubmit: PropTypes.func.isRequired,
  setAppErrorAction: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  toggleDiaryAction: PropTypes.func.isRequired,
  user: PropTypes.shape({
    givenName: PropTypes.string,
    familyName: PropTypes.string
  }).isRequired
};


export default connect(null, {
  setAppErrorAction: setAppError,
  submitDiaryAction: submitDiary,
  toggleDiaryAction: toggleDiary
})(reduxForm({
  form: 'DiaryModal',
  enableReinitialize: true
})(DiaryModal));
