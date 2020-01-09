import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import {
  Date,
  Draggable,
  Select,
  validation,
  Loader,
  TextArea,
  date,
  composeValidators,
  Form,
  Field,
  Button
} from '@exzeo/core-ui';
import { OnChangeListener } from '@exzeo/core-ui/src';

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

  submitDiary = async data => {
    try {
      const {
        entity: {
          property: { timezone }
        }
      } = this.props;
      const {
        due,
        assignee: { id },
        ...submitData
      } = data;
      const assigneeObj = this.props.assigneeAnswers.find(
        u => String(u.answer) === String(id)
      );
      const assignee = {
        id: assigneeObj.answer,
        displayName: assigneeObj.label,
        type: assigneeObj.type
      };

      submitData.due = date.formatToUTC(due, timezone);

      await this.props.submitDiary({ ...submitData, assignee }, this.props);
    } catch (error) {
      this.props.setAppError({ message: error });
    } finally {
      this.handleClose();
    }
  };

  render() {
    const {
      assigneeAnswers,
      submitting,
      minimizeDiary,
      diaryReasons,
      initialValues
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
            <Form
              id="DiaryModal"
              initialValues={initialValues}
              onSubmit={this.submitDiary}
              subscription={{ submitting: true, values: true }}
            >
              {({ handleSubmit, submitting, values: formValues }) => (
                <form id="DiaryModal" onSubmit={handleSubmit}>
                  <div className="content">
                    <Field name="reason" validate={validation.isRequired}>
                      {({ input, meta }) => (
                        <Select
                          input={input}
                          meta={meta}
                          label="Reason"
                          answers={diaryReasons}
                          dataTest="reason"
                        />
                      )}
                    </Field>
                    <Field name="assignee.id" validate={validation.isRequired}>
                      {({ input, meta }) => (
                        <Select
                          input={input}
                          meta={meta}
                          label="Assignee"
                          styleName="assignee"
                          answers={assigneeAnswers}
                          dataTest="assignee"
                        />
                      )}
                    </Field>
                    <Field
                      name="due"
                      validate={composeValidators([
                        validation.isRequired,
                        validation.isDate,
                        validation.isDateRange('1900-01-01', '9999-12-31')
                      ])}
                    >
                      {({ input, meta }) => (
                        <Date
                          input={input}
                          meta={meta}
                          label="Due Date"
                          styleName="due"
                          dataTest="due"
                        />
                      )}
                    </Field>
                    <Field
                      name="message"
                      label="Message"
                      dataTest="message"
                      component={TextArea}
                      validate={validation.isRequired}
                    />
                    <Field name="assignee.id" subscription={{}}>
                      {({ input: { onChange } }) => (
                        <React.Fragment>
                          <OnChangeListener name="reason">
                            {value => {
                              const {
                                user: { userId },
                                assigneeAnswers,
                                diaryOptions
                              } = this.props;
                              const defaultData = diaryOptions.reasons.find(
                                r => r.answer === value
                              );
                              if (
                                defaultData &&
                                defaultData.assignee === 'CURRENT_USER'
                              ) {
                                onChange(userId);
                              } else {
                                const selectedAssignee = assigneeAnswers.find(
                                  u =>
                                    String(u.label) ===
                                    String(defaultData.assignee)
                                );
                                onChange(
                                  selectedAssignee
                                    ? selectedAssignee.answer
                                    : ''
                                );
                              }
                            }}
                          </OnChangeListener>
                        </React.Fragment>
                      )}
                    </Field>
                    <Field name="due" subscription={{}}>
                      {({ input: { onChange } }) => (
                        <React.Fragment>
                          <OnChangeListener name="reason">
                            {value => {
                              const { entity, diaryOptions } = this.props;
                              const defaultData = diaryOptions.reasons.find(
                                r => r.answer === value
                              );

                              const { offset, path } = defaultData.dueDate;
                              const dateString =
                                path === 'default'
                                  ? undefined
                                  : _get(entity, path);
                              onChange(addDate(offset, dateString));
                            }}
                          </OnChangeListener>
                        </React.Fragment>
                      )}
                    </Field>
                  </div>
                  <div className="buttons note-file-footer-button-group">
                    {initialValues._id && (
                      <Button
                        className={Button.constants.classNames.primary}
                        customClass="close-diary-button"
                        dataTest="close-diary"
                        onClick={() =>
                          this.submitDiary({ ...formValues, open: false })
                        }
                      >
                        Mark as Closed
                      </Button>
                    )}
                    <Button
                      className={Button.constants.classNames.secondary}
                      customClass="cancel-button"
                      dataTest="diary-cancel"
                      onClick={this.handleClose}
                      disabled={submitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={Button.constants.classNames.primary}
                      customClass="submit-button"
                      dataTest="diary-submit"
                      type="submit"
                      disabled={submitting}
                    >
                      Save
                    </Button>
                  </div>
                </form>
              )}
            </Form>
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

export default connect(mapStateToProps, {
  setAppError,
  submitDiary,
  toggleDiary,
  toggleMinimizeDiary
})(DiaryModal);
