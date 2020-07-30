import React from 'react';
import {
  date,
  ListItem,
  ListHeader,
  ListBody,
  ListFooter,
  ListContainer,
  Field,
  noop,
  OnChangeListener
} from '@exzeo/core-ui';

import { DUE_STATUS } from '../../../constants/diaries';
import { formatEntry, getDueStatus } from '../../../utilities/diaries';

const DiaryList = ({
  checkedDiaries,
  diaries,
  onItemClick,
  clickable,
  handleKeyPress,
  diaryReasons,
  transfer
}) => {
  return (
    <ListContainer>
      {diaries.map(diary => {
        const {
          resource: { type, id },
          entries,
          _id
        } = diary;
        const entry = formatEntry(entries[0], diaryReasons);
        const {
          assignee: { displayName },
          due,
          reason,
          message,
          createdAt,
          createdBy,
          open
        } = entry;

        const dueStatus = getDueStatus(due, open);
        const formattedMessage = message
          .split(/\r|\n/g)
          .map((msg, i) => <div key={i}>{msg}</div>);

        return (
          <>
            {transfer && (
              <div
                className="transfer_checkbox_wrapper fade-in"
                key={`checkbox_wrapper_${_id}`}
              >
                <Field
                  name={`diaries.${_id}`}
                  dataTest={_id}
                  styleName="transfer_checkbox"
                  component="input"
                  type="checkbox"
                />
                <Field name="selectAll" subscription={{}}>
                  {({ input: { onChange } }) => (
                    <OnChangeListener name={`diaries.${_id}`}>
                      {value => {
                        if (
                          checkedDiaries.length === diaries.length - 1 &&
                          !value
                        ) {
                          onChange(false);
                        } else if (
                          checkedDiaries.length === diaries.length &&
                          value
                        ) {
                          onChange(true);
                        }
                      }}
                    </OnChangeListener>
                  )}
                </Field>
              </div>
            )}
            <ListItem
              key={_id}
              dataTest={`diaries_${_id}`}
              styleName={dueStatus}
              handleClick={() => (clickable ? onItemClick(id, type) : noop)}
              handleKeyPress={() =>
                clickable ? handleKeyPress(id, type) : noop
              }
            >
              <ListHeader>
                <div className="card-status-indicator" />
                <div className="icon-wrapper">
                  <i className="fa fa-bookmark-o" />
                  <i className="icon-status-indicator fa fa-circle" />
                  <div>{DUE_STATUS[dueStatus]}</div>
                </div>
              </ListHeader>
              <ListBody>
                <h4>
                  {`${type}`}{' '}
                  <span>
                    {`${id}`} | {`${displayName}`}
                  </span>
                </h4>
                <ul className="diary-entry-list">
                  <li className="header">
                    <span className="diary due-date">Due</span>
                    <span className="diary assignee">Assignee</span>
                    <span className="diary reason">Reason</span>
                    <span className="diary message">Message</span>
                    <span className="diary updated">Updated</span>
                    <span className="diary updated-by">Updated By</span>
                    <span className="diary action" />
                  </li>
                  <li className="data-row">
                    <span className="diary due-date">
                      {date.formatDate(due)}
                    </span>
                    <span className="diary assignee">{displayName}</span>
                    <span className="diary reason">{reason}</span>
                    <span className="diary message">{formattedMessage}</span>
                    <span className="diary updated">
                      {date.formattedDate(createdAt)}
                    </span>
                    <span className="diary updated-by">
                      {createdBy.userName}
                    </span>
                    <span className="diary action" />
                  </li>
                </ul>
              </ListBody>
              <ListFooter />
            </ListItem>
          </>
        );
      })}
    </ListContainer>
  );
};

export default DiaryList;
