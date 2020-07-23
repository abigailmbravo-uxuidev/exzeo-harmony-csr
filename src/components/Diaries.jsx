import React from 'react';
import PropTypes from 'prop-types';
import { date } from '@exzeo/core-ui';

import ShortenText from './ShortenText';

const DIARY_LEVELS = {
  upComing: {
    sectionClass: 'diaries-upcoming',
    iconClass: 'fa fa-calendar-o',
    label: 'Upcoming',
    listIconClass: 'fa-li fa fa-calendar-o'
  },
  pastDue: {
    sectionClass: 'diaries-pastDue',
    iconClass: 'fa fa-bell-o',
    label: 'Past Due',
    listIconClass: 'fa-li fa fa-bell-o'
  },
  dueSoon: {
    canShowButton: true,
    sectionClass: 'diaries-dueSoon',
    iconClass: 'fa fa-clock-o',
    label: 'Due Soon',
    listClass: 'overridden',
    listIconClass: 'fa-li fa fa-clock-o'
  }
};

const Diaries = ({ diaryLevel, diaries, onToggleDiary }) => {
  const severity = DIARY_LEVELS[diaryLevel];

  return (
    <section className={severity.sectionClass}>
      <h5>
        <i className={severity.iconClass} aria-hidden="true" />
        <span> {severity.label}</span>
      </h5>
      <div>
        <ul className="fa-ul diary-list">
          {diaries.map(diary => (
            <li key={diary.diaryId} data-test={severity.sectionClass}>
              <div className="diary-header">
                <i className={severity.listIconClass} aria-hidden="true" />
                <span className="diary-due-date">
                  {date.formatDate(diary.due)}{' '}
                </span>
                <button
                  className="btn btn-link btn-sm"
                  onClick={() => onToggleDiary(diary)}
                >
                  <i className="fa fa-chevron-circle-up" />
                  Open
                </button>
              </div>
              <div className="diary-type">{diary.type}</div>
              <div className="diary-reason">
                <p>
                  {diary.reasonLabel}: <ShortenText text={diary.message} />
                </p>
              </div>
              <div className="diary-assignee">{diary.assignee.displayName}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

Diaries.propTypes = {
  diaryLevel: PropTypes.oneOf(['upComing', 'pastDue', 'dueSoon']).isRequired,
  onToggleDiary: PropTypes.func.isRequired,
  diaries: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      internalMessage: PropTypes.string
    })
  )
};

export default Diaries;
