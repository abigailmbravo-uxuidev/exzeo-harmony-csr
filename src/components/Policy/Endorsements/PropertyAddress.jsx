import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../../Form/inputs/TextField';
import {setCalculate} from "./index";

const PropertyAddress = (props) => {
  return (
    <section>
      <h3>Property Address</h3>
      <div className="flex-parent wrap">
        <div className="address">
          <TextField label="Address 1" styleName="" name="propertyAddress1New" onChange={() => setCalculate(props, false)} />
        </div>
        <div className="address">
          <TextField label="Address 2" styleName="" name="propertyAddress2New" onChange={() => setCalculate(props, false)} />
        </div>
        <div className="city">
          <TextField label="City" styleName="" name="propertyCityNew" onChange={() => setCalculate(props, false)} />
        </div>
        <div className="state">
          <TextField label="State" styleName="" name="propertyStateNew" onChange={() => setCalculate(props, false)} />
        </div>
        <div className="zip">
          <TextField label="Zip" styleName="" name="propertyZipNew" onChange={() => setCalculate(props, false)} />
        </div>
      </div>
    </section>
  );
};

PropertyAddress.propTypes = {};

PropertyAddress.defaultProps = {};

export default PropertyAddress;
