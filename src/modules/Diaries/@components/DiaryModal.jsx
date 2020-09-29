import React, { useState } from 'react';
import _get from 'lodash/get';
import {
  date,
  composeValidators,
  validation,
  Button,
  Date,
  Draggable,
  Form,
  Field,
  Loader,
  OnChangeListener,
  Select,
  TextArea
} from '@exzeo/core-ui';
import classNames from 'classnames';

import { useDiaries } from '../../../context/diaries-context';
import { useUser } from '../../../context/user-context';
import { addDate } from '../utilities';

export const DiaryModal = ({ errorHandler }) => {
  const [minimize, setMinimize] = useState(false);
  const userProfile = useUser();
  const {
    selectedDiary,
    diaryEnums,
    submitDiary,
    activeDocument,
    diariesDispatch
  } = useDiaries();

  const submit = values => {
    try {
      submitDiary(values);
    } catch (error) {
      errorHandler(error);
    }
  };

  const initialValues = {
    ...(selectedDiary?._id && selectedDiary.entries[0]),
    ...(selectedDiary?._id && {
      due: date.formatDate(selectedDiary.entries[0].due, date.FORMATS.SECONDARY)
    })
  };

  return (
    <Draggable
      handle=".title-bar"
      position={minimize ? { x: 0, y: 0 } : null}
      bounds={{
        left: -800,
        top: -150,
        right: window.innerWidth - 300,
        bottom: window.innerHeight - 200
      }}
    >
      <div
        role="dialog"
        className={classNames('new-diary-file', { minimize: minimize })}
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
              onClick={() => setMinimize(min => !min)}
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
              onClick={() => diariesDispatch({ type: 'closeModal' })}
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
          <Form
            id="DiaryModal"
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={submit}
            subscription={{ submitting: true }}
          >
            {({ handleSubmit, submitting }) => (
              <>
                {submitting && <Loader />}
                <form id="DiaryModal" onSubmit={handleSubmit}>
                  <div className="content">
                    <Field name="reason" validate={validation.isRequired}>
                      {({ input, meta }) => (
                        <Select
                          input={input}
                          meta={meta}
                          label="Reason"
                          answers={diaryEnums.reasonOptions}
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
                          answers={diaryEnums.assigneeOptions}
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
                        <OnChangeListener name="reason">
                          {value => {
                            if (!value) return;
                            const optionConfig = diaryEnums.reasonOptions.find(
                              r => r.answer === value
                            );
                            if (optionConfig.assignee === 'CURRENT_USER') {
                              onChange(userProfile.userId);
                            } else if (optionConfig) {
                              const selectedAssignee = diaryEnums.assigneeOptions.find(
                                o =>
                                  String(o.label) ===
                                  String(optionConfig.assignee)
                              );
                              onChange(
                                selectedAssignee ? selectedAssignee.answer : ''
                              );
                            }
                          }}
                        </OnChangeListener>
                      )}
                    </Field>

                    <Field name="due" subscription={{}}>
                      {({ input: { onChange } }) => (
                        <OnChangeListener name="reason">
                          {value => {
                            if (!value) return;

                            const optionConfig = diaryEnums.reasonOptions.find(
                              r => r.answer === value
                            );

                            if (!optionConfig) return;
                            const { offset, path } = optionConfig.dueDate;
                            const dateString =
                              path === 'default'
                                ? undefined
                                : _get(activeDocument, path);
                            onChange(addDate(offset, dateString));
                          }}
                        </OnChangeListener>
                      )}
                    </Field>
                  </div>
                  <div className="buttons note-file-footer-button-group">
                    {initialValues._id && (
                      <Field name="open">
                        {({ input: { onChange } }) => (
                          <Button
                            className={Button.constants.classNames.primary}
                            customClass="close-diary-button"
                            dataTest="close-diary"
                            onClick={() => {
                              onChange(false);
                              handleSubmit();
                            }}
                          >
                            Mark as Closed
                          </Button>
                        )}
                      </Field>
                    )}
                    <Button
                      className={Button.constants.classNames.secondary}
                      customClass="cancel-button"
                      dataTest="diary-cancel"
                      onClick={() => diariesDispatch({ type: 'closeModal' })}
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
              </>
            )}
          </Form>
        </div>
      </div>
    </Draggable>
  );
};

export default DiaryModal;
