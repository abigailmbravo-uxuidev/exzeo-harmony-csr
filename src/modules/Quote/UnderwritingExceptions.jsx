import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

const EXCEPTION_LEVELS = {
  info: {
    sectionClass: 'msg-info',
    iconClass: 'fa fa-info-circle',
    label: 'Info',
    listIconClass: 'fa-li fa fa-info-circle'
  },
  fatalError: {
    canShowButton: true,
    sectionClass: 'msg-error',
    iconClass: 'fa fa-exclamation-circle',
    label: 'Error',
    listIconClass: 'fa-li fa fa-exclamation-circle'
  },
  underwritingReview: {
    canShowButton: true,
    sectionClass: 'msg-caution',
    iconClass: 'fa fa-exclamation-triangle',
    label: 'Caution',
    listClass: 'overridden',
    listIconClass: 'fa-li fa fa-exclamation-triangle'
  }
};

class UnderwritingExceptions extends React.Component {
  render() {
    const { exceptionLevel, exceptions, pristine } = this.props;
    const severity = EXCEPTION_LEVELS[exceptionLevel];

    return (
      <section className={severity.sectionClass}>
        <h5>
          <i className={severity.iconClass} aria-hidden="true" />
          <span>{severity.label}</span>
        </h5>
        <div>
          <ul className="fa-ul">
            {exceptions.map((exception, index) => (
              <li
                key={exception._id}
                className={classNames({
                  overridden: exception.canOverride && exception.overridden
                })}
              >
                <i className={severity.listIconClass} aria-hidden="true" />
                <span>{exception.internalMessage}</span>

                {this.props.render(exception, index)}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

UnderwritingExceptions.propTypes = {
  exceptionLevel: propTypes.oneOf(['warning', 'overridable', 'nonOverridable'])
    .isRequired,
  exceptions: propTypes.arrayOf(
    propTypes.shape({
      _id: propTypes.string,
      internalMessage: propTypes.string
    })
  )
};

UnderwritingExceptions.defaultProps = {
  render: () => {}
};

export default UnderwritingExceptions;
