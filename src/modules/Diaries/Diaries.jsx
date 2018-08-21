import React from 'react';
import propTypes from 'prop-types';

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

export class Diaries extends React.Component {
  render() {
    const { diaryLevel, diaries, openHandler } = this.props;
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
                  <span>{diary.dueDate} </span><a onClick={() => openHandler(diary)}><i className="fa fa-arrow-up" /> Open</a>
                </h5>
                <h5>{diary.type}</h5>
                <span>Follow-up: {diary.reason}</span>
                <h5>
                  {diary.assignee}
                </h5>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

Diaries.propTypes = {
  exceptionLevel: propTypes.oneOf(['upComing', 'pastDue', 'dueSoon']).isRequired,
  diaries: propTypes.arrayOf(propTypes.shape({
    _id: propTypes.string,
    internalMessage: propTypes.string
  }))
};

Diaries.defaultProps = {
  render: () => {}
};

export default Diaries;
