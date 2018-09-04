import React from 'react';

export const EntityCancellationDate = ({
  className,
  cancellationDate,
  showReinstatePolicyPopUp,
  showReinstatement,
  label
}) => (
  <section id="cancellationDate" className={className}>
    <dl>
      <div>
        <dt>
          {label}
          {showReinstatement &&
            <button
              id="show-reinstate"
              className="btn btn-link btn-xs btn-alt-light no-padding"
              onClick={() => showReinstatePolicyPopUp(this.props)}>
              <i className="fa fa-thumbs-up" />Reinstate
            </button>
          }
        </dt>
        <dd>{cancellationDate}</dd>
      </div>
    </dl>
  </section>
);
export default EntityCancellationDate;
