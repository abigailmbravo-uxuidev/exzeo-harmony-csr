import React from 'react';
import { date, ListItem, ListHeader, ListBody, ListFooter, ListContainer } from '@exzeo/core-ui';

import { DUE_STATUS } from '../../../constants/diaries';
import { formatEntry, getDueStatus } from '../../../utilities/diaries';


const DiaryList = ({
  diaries, onItemClick, clickable, handleKeyPress
}) => {
  return (
    <ListContainer>
      {diaries.map((diary) => {
          const {
            resource: { type, id },
            entries,
            _id
          } = diary;
          const entry = formatEntry(entries[0]);
          const {
            assignee: { displayName },
            due,
            reason,
            message,
            updatedAt,
            userName,
             open
          } = entry;

        const dueStatus = getDueStatus(due, open);
        return (
          <ListItem
            key={_id}
            dataTest={`diaries_${_id}`}
            styleName={dueStatus}
            handleClick={() => (clickable ? onItemClick(id, type) : null)}
            handleKeyPress={() => (clickable ? handleKeyPress(id, type) : null)}>
            <ListHeader>
              <div className="card-status-indicator" />
              <div className="icon-wrapper">
                <i className="fa fa-bookmark-o" />
                <i className="icon-status-indicator fa fa-circle" />
                <div>{DUE_STATUS[dueStatus]}</div>
              </div>
            </ListHeader>
            <ListBody>
              <h4>{`${type}`} <span>{`${id}`} | {`${displayName}`}</span></h4>
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
                <li>
                  <span className="diary due-date">{date.formattedDate(due)}</span>
                  <span className="diary assignee">{displayName}</span>
                  <span className="diary reason">{reason}</span>
                  <span className="diary message">{message}</span>
                  <span className="diary updated">{date.formattedDate(updatedAt)}</span>
                  <span className="diary updated-by">{userName}</span>
                  <span className="diary action" />
                </li>
              </ul>
            </ListBody>
            <ListFooter />
          </ListItem>
        );
      })}

    </ListContainer>);
};

export default DiaryList;
