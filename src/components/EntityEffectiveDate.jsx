import React from 'react';

export const EntityEffectiveDate = ({
  className,
  effectiveDate,
  showEffectiveDatePopUp,
  label
}) => (
  <section data-test="effectiveDate" className={className}>
    <dl>
      <div>
        <dt>
          {label} {showEffectiveDatePopUp &&
            <button
              id="effective-date"
              className="btn btn-link btn-xs btn-alt-light no-padding"
              onClick={showEffectiveDatePopUp}>
              <i className="fa fa-pencil-square" />Edit
            </button>
          }
        </dt>
        <dd>{effectiveDate}</dd>
      </div>
    </dl>
  </section>
);
export default EntityEffectiveDate;
