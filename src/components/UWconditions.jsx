import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import { connect } from 'react-redux';

const UWconditions = ({ closeButtonHandler }) => (
  <div className="modal uw-conditions">
    <div className="card" role="dialog">
      <div className="card-header">
        <h5>Underwriting Conditions</h5>
      </div>
      <div className="card-block">
        <h2>
          All properties will be inspected within 30 days of the effective date.
        </h2>
        <p>
          Please be aware that assumptions to this property have been made in
          order to provide you this quote. If any of the below assumptions are
          not correct, please contact us before continuing.
        </p>
        <ul>
          <li>
            Properties with pools (or similar structures), are to be completely
            fenced, walled, or screened. There are no slides or diving boards.
          </li>
          <li>
            Properties located in Special Flood Hazard Areas, as defined by the
            National Flood Insurance Program maintain a separate flood policy.
          </li>
          <li>
            Property is not in state of disrepair or having existing unrepaired
            damage.
          </li>
          <li>
            Roof covering does not exceed the age as defined below
            <ul>
              <li>
                Roof cannot be over 20 years old if Asphalt, Fiberglass,
                Composition/Wood Shake Shingles; Built-up Tar and Gravel; or
                other roof covering types not included below
              </li>
              <li>
                Roof cannot be over 40 years old if Tile, Slate, Concrete, or
                Metal
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="card-footer">
        <button
          tabIndex={'0'}
          className="btn btn-success"
          onClick={closeButtonHandler}
          type="submit"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

UWconditions.propTypes = {
  ...propTypes,
  closeButtonHandler: PropTypes.func
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
  appState: state.appState
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'UWconditions'
  })(UWconditions)
);
