import React from 'react';
import {
  ListItem,
  ListHeader,
  ListBody,
  ListFooter,
  ListContainer
} from '@exzeo/core-ui';

import { DUE_STATUS } from '../../../../constants/diaries';
import DiaryTransferField from './DiaryTransferField';

const DiaryList = ({ diaries = [], handleClick, transferActive }) => {
  return (
    <ListContainer>
      {diaries.map(diary => {
        const {
          _id,
          resourceType,
          resourceId,
          assignee,
          reason,
          message,
          dueStatus,
          dueDate,
          createdBy,
          createdAt
        } = diary;

        return (
          <React.Fragment key={_id}>
            {transferActive && <DiaryTransferField id={_id} />}
            <ListItem
              key={_id}
              dataTest={`diaries_${_id}`}
              styleName={dueStatus}
              handleClick={() => handleClick(resourceId, resourceType)}
              handleKeyPress={e =>
                e.charCode === 13 && handleClick(resourceId, resourceType)
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
                  {`${resourceType} `}
                  <span>{`${resourceId} | ${assignee}`}</span>
                </h4>
                <dl className="diary-entry-list">
                  <dt className="header">
                    <span className="diary due-date">Due</span>
                    <span className="diary assignee">Assignee</span>
                    <span className="diary reason">Reason</span>
                    <span className="diary message">Message</span>
                    <span className="diary updated">Updated</span>
                    <span className="diary updated-by">Updated By</span>
                    <span className="diary action" />
                  </dt>
                  <dd className="data-row">
                    <span className="diary due-date">{dueDate}</span>
                    <span className="diary assignee">{assignee}</span>
                    <span className="diary reason">{reason}</span>
                    <span className="diary message">
                      {message.map((msg, i) => (
                        <div key={i}>{msg}</div>
                      ))}
                    </span>
                    <span className="diary updated">{createdAt}</span>
                    <span className="diary updated-by">{createdBy}</span>
                    <span className="diary action" />
                  </dd>
                </dl>
              </ListBody>
              <ListFooter />
            </ListItem>
          </React.Fragment>
        );
      })}
    </ListContainer>
  );
};

export default DiaryList;
