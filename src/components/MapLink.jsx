import React from 'react';
import PropTypes from 'prop-types';

const MapLink = ({ mapURI }) => {
  if (!mapURI) return null;
  return (
    <a className="btn btn-link btn-xs btn-alt-light no-padding" target="_blank" href={mapURI}>
      <i className="fa fa-map-marker" />Map
    </a>
  );
};

MapLink.propTypes = {
  mapURI: PropTypes.string
};

MapLink.defaultProps = {
  mapURI: ''
};

export default MapLink;
