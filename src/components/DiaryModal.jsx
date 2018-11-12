import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Date, Select, validation, Loader, TextArea } from '@exzeo/core-ui';

import { REASONS, REASONS_DATA } from '../constants/diaries';
import { addDate } from '../utilities/diaries';
import { submitDiary } from '../state/actions/diary.actions';
import { toggleDiary } from '../state/actions/ui.actions';
import { setAppError } from '../state/actions/error.actions';
import { getDiaryAssigneeAnswers } from '../state/selectors/questions.selectors';

export class DiaryModal extends Component {
  state = { minimize: false };

  componentDidMount() {
    // TODO: not sure this logic should be here. Seems like it should be much further up the tree
    const { setAppErrorAction, user } = this.props;
    if (!user.profile || !user.profile.given_name || !user.profile.family_name) {
      const message = 'There was a problem with your user profile. Please logout of Harmony and try logging in again.';
      setAppErrorAction({ message });
      this.handleClose();
    }
  }

  handleMinimize = () => {
    this.setState({ minimize: !this.state.minimize });
  };

  handleClose = () => {
    this.props.toggleDiaryAction();
  };

  submitDiary = async (data, dispatch, props) => {
    try {
      const { assignee: { id }, ...submitData } = data;
      const assigneeObj = props.assigneeAnswers.find(u => String(u.answer) === String(id));
      const assignee = { id: assigneeObj.answer, displayName: assigneeObj.label, type: assigneeObj.type };
      await props.submitDiaryAction({ ...submitData, assignee }, props);
    } catch (error) {
      props.setAppErrorAction({ message: error });
    } finally {
      this.handleClose();
    }
  };

  normalizeDiaryReason = (value, prevVal) => {
    const {
      change, user: { userId }, assigneeAnswers, entityEndDate
    } = this.props;
    const defaultData = REASONS_DATA[value];

    if (!defaultData) return value;

    if (!defaultData.assignee) {
      change('assignee.id', userId);
    } else {
      const selectedAssignee = assigneeAnswers.find(u => String(u.label) === String(defaultData.assignee));
      change('assignee.id', selectedAssignee.answer);
    }
    change('reason', defaultData.reason);

    if (value === REASONS_DATA.renewal_processing.answer) {
      // need to get next renewal date
      change('due', addDate(defaultData.daysFromDueDate, entityEndDate));
    } else {
      change('due', addDate(defaultData.daysFromDueDate));
    }
    return value;
  }

  render() {
    const { assigneeAnswers, handleSubmit, submitting } = this.props;

    return (
      <div className={this.state.minimize ? 'new-diary-file minimize' : 'new-diary-file'} >
        <div className="title-bar">
          <div className="title title-minimize-button" onClick={this.handleMinimize} data-test="diary-minimize-button">Diary</div>
          <div className="controls note-file-header-button-group">
            <button
              className="btn btn-icon minimize-button"
              type="button"
              onClick={this.handleMinimize}>
              <i className="fa fa-window-minimize" aria-hidden="true" data-test="diary-window-minimize" />
            </button>
          </div>
        </div>
        <div className="mainContainer">
          {submitting && <Loader />}
          <form id="DiaryModal" onSubmit={handleSubmit(this.submitDiary)} >
            <div className="content">
              <Field
                name="assignee.id"
                styleName="assignee"
                label="Assignee"
                component={Select}
                answers={assigneeAnswers}
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
                normalize={this.normalizeDiaryReason}
                dataTest="reason" />
              <Field
                name="message"
                label="Message"
                dataTest="message"
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
                onClick={this.handleClose}>
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
  entityEndDate: PropTypes.string,
  change: PropTypes.func.isRequired,
  assigneeAnswers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setAppErrorAction: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  toggleDiaryAction: PropTypes.func.isRequired,
  user: PropTypes.shape({
    profile: PropTypes.shape({
      given_name: PropTypes.string,
      family_name: PropTypes.string
    })
  }).isRequired
};

const mapStateToProps = (state) => {
  return {
    assigneeAnswers: getDiaryAssigneeAnswers(state)
  };
};

export default connect(mapStateToProps, {
  setAppErrorAction: setAppError,
  submitDiaryAction: submitDiary,
  toggleDiaryAction: toggleDiary
})(reduxForm({
  form: 'DiaryModal',
  enableReinitialize: true
})(DiaryModal));
