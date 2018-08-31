import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

const DIARY_LEVELS = {
  upComing: {
    sectionClass: 'msg-info',
    iconClass: 'fa fa-calendar-o',
    label: 'Upcoming',
    listIconClass: 'fa-li fa fa-calendar-o'
  },
  pastDue: {
    sectionClass: 'msg-error',
    iconClass: 'fa fa-bell-o',
    label: 'Past Due',
    listIconClass: 'fa-li fa fa-bell-o'
  },
  dueSoon: {
    canShowButton: true,
    sectionClass: 'msg-caution',
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
        <i className={severity.iconClass} aria-hidden="true" /><span> {severity.label}</span>
      </h5>
      <div>
        <ul className="fa-ul">
          {diaries.map(diary => (
            <li key={diary._id}>
              <i className={severity.listIconClass} aria-hidden="true" />
              <h5>
                <span>{moment.utc(diary.due).format('MM/DD/YYYY')} </span>
                <a onClick={() => onToggleDiary(diary)}><i className="fa fa-arrow-up" /> Open</a>
              </h5>
              <h5>{diary.type}</h5>
              <span>Follow-up: {diary.reason}</span>
              <p>{diary.message}</p>
              <h5>
                {diary.assignee.userName}
              </h5>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

Diaries.propTypes = {
  diaryLevel: PropTypes.oneOf(['upComing', 'pastDue', 'dueSoon']).isRequired,
  diaries: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    internalMessage: PropTypes.string
  }))
};

export default Diaries;
