import React from 'react';

export const EntityAddress = ({
  className,
  mapUri,
  type,
  address: {
    address1, address2, city, state, zip
  }
}) => (
  <section data-test={`entity${type}Address`} className={className}>
    <dl>
      <div>
        <dt>{type} Address {mapUri && <a className="btn btn-link btn-xs btn-alt-light no-padding" target="_blank" href={mapUri}><i className="fa fa-map-marker" />Map</a>}</dt>
        <dd>{address1}</dd>
        <dd>{address2}</dd>
        <dd>{`${city}, ${state} ${zip}`}</dd>
      </div>
    </dl>
  </section>
);
export default EntityAddress;
