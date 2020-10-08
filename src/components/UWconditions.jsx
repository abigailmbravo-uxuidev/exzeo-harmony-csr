import React from 'react';
import PropTypes from 'prop-types';

const UWconditions = ({ closePopup, conditions }) => (
  <div className="modal uw-conditions">
    <div className="card" role="dialog">
      <div className="card-header">
        <h5>Underwriting Conditions</h5>
      </div>
      <div
        className="card-block"
        dangerouslySetInnerHTML={{ __html: conditions }}
      />
      <div className="card-footer">
        <button
          tabIndex="0"
          className="btn btn-success"
          onClick={closePopup}
          type="submit"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

UWconditions.propTypes = {
  closeButtonHandler: PropTypes.func
};

export default UWconditions;
