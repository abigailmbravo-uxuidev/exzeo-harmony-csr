import React from 'react';
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

import * as diaryActions from '../state/actions/diary.actions';
import * as uiActions from '../state/actions/ui.actions';
import * as errorActions from '../state/actions/error.actions';
import { getDiaryAssigneeAnswers } from '../state/selectors/questions.selectors';
import { getDiaryReasons } from '../state/selectors/diary.selectors';
import { addDate } from '../utilities/diaries';

export const DiaryModal = ({
  entity,
  submitting,
  minimizeDiary,
  diaryReasons,
  initialValues,
  toggleDiary,
  toggleMinimizeDiary,
  submitDiary,
  setAppError,
  user,
  resourceType,
  resourceId,
  diaryId,
  sourceNumber,
  assigneeAnswers,
  diaryOptions
}) => {
  const handleMinimize = () => {
    toggleMinimizeDiary(!minimizeDiary);
  };

  const handleClose = () => {
    toggleDiary();
  };

  const handleSubmitDiary = async data => {
    try {
      const {
        due,
        assignee: { id },
        ...submitData
      } = data;
      const assigneeObj = assigneeAnswers.find(
        u => String(u.answer) === String(id)
      );
      const assignee = {
        id: assigneeObj.answer,
        displayName: assigneeObj.label,
        type: assigneeObj.type
      };

      submitData.due = date.formatToUTC(due, entity.property.timezone);

      const { companyCode, state, product } = entity;

      await submitDiary(
        { ...submitData, assignee },
        {
          companyCode,
          state,
          product,
          user,
          resourceType,
          resourceId,
          diaryId,
          sourceNumber
        }
      );
    } catch (error) {
      setAppError({ message: error });
    } finally {
      handleClose();
    }
  };

  console.log(entity);

  return (
    <Draggable
      handle=".new-diary-file"
      bounds={{
        left: -800,
        top: -800,
        right: window.innerWidth - 300,
        bottom: window.innerHeight - 200
      }}
      position={minimizeDiary ? { x: 0, y: 0 } : null}
    >
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
              onClick={handleMinimize}
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
              onClick={handleClose}
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
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={handleSubmitDiary}
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
                            if (!value) return;
                            const defaultData = diaryOptions.reasons.find(
                              r => r.answer === value
                            );
                            if (
                              defaultData &&
                              defaultData.assignee === 'CURRENT_USER'
                            ) {
                              onChange(user.userId);
                            } else if (defaultData) {
                              const selectedAssignee = assigneeAnswers.find(
                                u =>
                                  String(u.label) ===
                                  String(defaultData.assignee)
                              );
                              onChange(
                                selectedAssignee ? selectedAssignee.answer : ''
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
                            if (!value) return;

                            const defaultData = diaryOptions.reasons.find(
                              r => r.answer === value
                            );

                            if (!defaultData) return;
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
                  {initialValues && initialValues._id && (
                    <Button
                      className={Button.constants.classNames.primary}
                      customClass="close-diary-button"
                      dataTest="close-diary"
                      onClick={() =>
                        handleSubmitDiary({ ...formValues, open: false })
                      }
                    >
                      Mark as Closed
                    </Button>
                  )}
                  <Button
                    className={Button.constants.classNames.secondary}
                    customClass="cancel-button"
                    dataTest="diary-cancel"
                    onClick={handleClose}
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
};

DiaryModal.propTypes = {
  sourceNumber: PropTypes.string,
  entityEndDate: PropTypes.string,
  assigneeAnswers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setAppError: PropTypes.func.isRequired,
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

const mapStateToProps = state => {
  return {
    assigneeAnswers: getDiaryAssigneeAnswers(state),
    diaryReasons: getDiaryReasons(state),
    initialValues: state.ui.diary.selectedDiary || {}
  };
};

export default connect(mapStateToProps, {
  setAppError: errorActions.setAppError,
  submitDiary: diaryActions.submitDiary,
  toggleDiary: uiActions.toggleDiary,
  toggleMinimizeDiary: uiActions.toggleMinimizeDiary
})(DiaryModal);
