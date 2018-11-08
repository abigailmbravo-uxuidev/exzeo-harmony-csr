import React from 'react';

import { getDueStatus, formattedDate } from '@exzeo/core-ui/lib/Utilities';
import Item from '@exzeo/core-ui/lib/List/@components/Item';
import Header from '@exzeo/core-ui/lib/List/@components/Header';
import Body from '@exzeo/core-ui/lib/List/@components/Body';
import Footer from '@exzeo/core-ui/lib/List/@components/Footer';
import Container from '@exzeo/core-ui/lib/List/@components/Container';
import { formatEntry } from '../../../utilities/diaries';

const DiaryList = ({
  diaries, onItemClick, clickable, handleKeyPress
}) => {
  return (
    <Container>
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
        return (
          <Item
            key={_id}
            dataTest={`diaries_${_id}`}
            styleName={getDueStatus(due, open)}
            handleClick={() => (clickable ? onItemClick(id, type) : null)}
            handleKeyPress={() => (clickable ? handleKeyPress(id, type) : null)}>
            <Header>
              <div className="card-status-indicator" />
              <div className="icon-wrapper">
                <i className="fa fa-bookmark-o" />
                <i className="icon-status-indicator fa fa-circle" />
                <div>{getDueStatus(due, open)}</div>
              </div>
            </Header>
            <Body>
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
                  <span className="diary due-date">{formattedDate(due)}</span>
                  <span className="diary assignee">{displayName}</span>
                  <span className="diary reason">{reason}</span>
                  <span className="diary message">{message}</span>
                  <span className="diary updated">{formattedDate(updatedAt)}</span>
                  <span className="diary updated-by">{userName}</span>
                  <span className="diary action" />
                </li>
              </ul>
            </Body>
            <Footer />
          </Item>);
      })}

    </Container>);
};

export default DiaryList;
