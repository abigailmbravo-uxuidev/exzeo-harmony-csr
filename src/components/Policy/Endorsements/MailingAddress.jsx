import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../../Form/inputs/TextField';
import {setCalculate} from "./index";

const MailingAddress = (props) => {
  return (
    <section name="addresses" id="addresses">
      <h3>Mailing Address</h3>
      <div className="flex-parent wrap">
        <div className="address">
          <TextField label="Address 1" styleName="" name="address1New" onChange={() => setCalculate(props, false)} />
        </div>
        <div className="address">
          <TextField label="Address 2" styleName="" name="address2New" onChange={() => setCalculate(props, false)} />
        </div>
        <div className="city">
          <TextField label="City" styleName="" name="cityNew" onChange={() => setCalculate(props, false)} />
        </div>
        <div className="state">
          <TextField label="State" styleName="" name="stateNew" onChange={() => setCalculate(props, false)} />
        </div>
        <div className="zip">
          <TextField label="Zip" styleName="" name="zipNew" onChange={() => setCalculate(props, false)} />
        </div>
      </div>
    </section>
  );
};

MailingAddress.propTypes = {};

MailingAddress.defaultProps = {};

export default MailingAddress;
