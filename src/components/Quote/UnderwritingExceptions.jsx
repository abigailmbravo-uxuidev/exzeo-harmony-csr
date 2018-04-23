import React, {Component} from 'react';

const EXCEPTION_LEVELS = {
  warning: {
    sectionClass: "msg-info",
    iconClass: "fa fa-info-circle",
    label: "Info",
    listIconClass: "fa-li fa fa-info-circle",
  },
  overridable: {
    sectionClass: "msg-caution",
    iconClass: "fa fa-exclamation-triangle",
    label: "Caution",
    listIconClass: "fa-li fa fa-exclamation-triangle",
  },
  nonOverridable: {
    sectionClass: "msg-error",
    iconClass: "fa fa-exclamation-circle",
    label: "Error",
    listIconClass: "fa-li fa fa-exclamation-circle",
  },
}

class UnderwritingExceptions extends Component {
  render() {
    const {exceptionLevel, exceptions} = this.props;
    const severity = EXCEPTION_LEVELS[exceptionLevel];

    return (
      <section className={severity.sectionClass}>
        <h5>
          <i className={severity.iconClass} aria-hidden="true"/><span>{severity.label}</span>
        </h5>
        <div>
          <ul className="fa-ul">
            {exceptions.map(exception => (
              <li key={exception._id}>
                <i className={severity.listIconClass} aria-hidden="true"/>{exception.internalMessage}</li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

export default UnderwritingExceptions;
