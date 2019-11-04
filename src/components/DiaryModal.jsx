import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import _get from 'lodash/get';

import {
  Date,
  Draggable,
  Select,
  validation,
  Loader,
  TextArea
} from '@exzeo/core-ui';
import classNames from 'classnames';

import { addDate } from '../utilities/diaries';
import { submitDiary } from '../state/actions/diary.actions';
import { toggleDiary, toggleMinimizeDiary } from '../state/actions/ui.actions';
import { setAppError } from '../state/actions/error.actions';
import { getDiaryAssigneeAnswers } from '../state/selectors/questions.selectors';
import {
  getInitialValuesForForm,
  getDiaryReasons
} from '../state/selectors/diary.selectors';

export class DiaryModal extends Component {
  state = { minimize: false };

  handleMinimize = () => {
    const { minimizeDiary } = this.props;
    this.props.toggleMinimizeDiary(!minimizeDiary);
  };

  handleClose = () => {
    this.props.toggleDiary();
  };

  submitDiary = async (data, dispatch, props) => {
    try {
      const {
        assignee: { id },
        ...submitData
      } = data;
      const assigneeObj = props.assigneeAnswers.find(
        u => String(u.answer) === String(id)
      );
      const assignee = {
        id: assigneeObj.answer,
        displayName: assigneeObj.label,
        type: assigneeObj.type
      };
      await props.submitDiary({ ...submitData, assignee }, props);
    } catch (error) {
      props.setAppError({ message: error });
    } finally {
      this.handleClose();
    }
  };

  normalizeDiaryReason = (value, prevVal) => {
    const {
      change,
      user: { userId },
      assigneeAnswers,
      entity,
      diaryOptions
    } = this.props;
    const defaultData = diaryOptions.reasons.find(r => r.answer === value);

    if (!defaultData) return value;

    if (defaultData.assignee === 'CURRENT_USER') {
      change('assignee.id', userId);
    } else {
      const selectedAssignee = assigneeAnswers.find(
        u => String(u.label) === String(defaultData.assignee)
      );
      change('assignee.id', selectedAssignee ? selectedAssignee.answer : '');
    }
    change('reason', defaultData.answer);

    const { offset, path } = defaultData.dueDate;
    const dateString = path === 'default' ? undefined : _get(entity, path);
    change('due', addDate(offset, dateString));
    return value;
  };

  render() {
    const {
      assigneeAnswers,
      handleSubmit,
      submitting,
      minimizeDiary,
      diaryReasons
    } = this.props;

    return (
      <Draggable handle=".title-bar">
        <div
          className={classNames('new-diary-file', { minimize: minimizeDiary })}
        >
          <div className="title-bar">
            <div className="title" data-test="diary-minimize-button">
              <i className="fa fa-th" />
              Diary
            </div>
            <div className="controls note-file-header-button-group">
              <button
                className="btn btn-icon minimize-button"
                type="button"
                onClick={this.handleMinimize}
              >
                <i
                  className="fa fa-window-minimize"
                  aria-hidden="true"
                  data-test="diary-window-minimize"
                />
              </button>
              <button
                className="btn btn-icon close-button"
                type="button"
                onClick={this.handleClose}
              >
                <i
                  className="fa fa-times"
                  aria-hidden="true"
                  data-test="diary-window-close"
                />
              </button>
            </div>
          </div>
          <div className="mainContainer">
            {submitting && <Loader />}
            <form id="DiaryModal" onSubmit={handleSubmit(this.submitDiary)}>
              <div className="content">
                <Field
                  name="reason"
                  label="Reason"
                  component={Select}
                  answers={diaryReasons}
                  validate={validation.isRequired}
                  normalize={this.normalizeDiaryReason}
                  dataTest="reason"
                />
                <Field
                  name="assignee.id"
                  styleName="assignee"
                  label="Assignee"
                  component={Select}
                  answers={assigneeAnswers}
                  validate={validation.isRequired}
                  dataTest="assignee"
                />
                <Field
                  name="due"
                  styleName="due"
                  label="Due Date"
                  component={Date}
                  validate={[validation.isRequired, validation.isDate]}
                  dataTest="due"
                />
                <Field
                  name="message"
                  label="Message"
                  dataTest="message"
                  component={TextArea}
                  validate={validation.isRequired}
                />
              </div>
              <div className="buttons note-file-footer-button-group">
                <button
                  tabIndex="0"
                  type="button"
                  data-test="note-close-diary"
                  className="btn btn-primary close-diary-button"
                  onClick={handleSubmit((values, dispatch, props) => {
                    this.submitDiary(
                      { ...values, open: false },
                      dispatch,
                      props
                    );
                  })}
                >
                  Mark as Closed
                </button>
                <button
                  tabIndex="0"
                  type="button"
                  data-test="note-cancel"
                  className="btn btn-secondary cancel-button"
                  onClick={this.handleClose}
                >
                  Cancel
                </button>
                <button
                  tabIndex="0"
                  type="submit"
                  data-test="note-submit"
                  className="btn btn-primary submit-button"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Draggable>
    );
  }
}

DiaryModal.propTypes = {
  sourceNumber: PropTypes.string,
  entityEndDate: PropTypes.string,
  change: PropTypes.func.isRequired,
  assigneeAnswers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setAppError: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  toggleDiary: PropTypes.func.isRequired,
  user: PropTypes.shape({
    profile: PropTypes.shape({
      given_name: PropTypes.string,
      family_name: PropTypes.string
    })
  }).isRequired
};

DiaryModal.defaultProps = {
  user: { profile: {} }
};

const mapStateToProps = (state, ownProps) => {
  return {
    assigneeAnswers: getDiaryAssigneeAnswers(state),
    diaryReasons: getDiaryReasons(state),
    initialValues: getInitialValuesForForm(state, ownProps)
  };
};

export default connect(
  mapStateToProps,
  {
    setAppError,
    submitDiary,
    toggleDiary,
    toggleMinimizeDiary
  }
)(
  reduxForm({
    form: 'DiaryModal',
    enableReinitialize: true
  })(DiaryModal)
);
