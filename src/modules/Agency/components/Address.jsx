import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Input, validation } from '@exzeo/core-ui';

class Address extends Component {
  normalizeSameAsMailing = (value) => {
    const { changeField, mailingAddress, sameAsMailingValue } = this.props;
    if (!mailingAddress || !sameAsMailingValue) return value;
    changeField('sameAsMailing', false);
    return value;
  };

  render() {
    const {
      showCounty, sectionDisabled
    } = this.props;
    return (
      <React.Fragment>
        <Field
          name="address1"
          label="Address 1"
          component={Input}
          styleName="address1"
          dataTest="address1"
          validate={validation.isRequired}
          normalize={this.normalizeSameAsMailing}
          disabled={sectionDisabled} />
        <Field
          name="address2"
          label="Address 2"
          component={Input}
          styleName="address2"
          dataTest="address2"
          normalize={this.normalizeSameAsMailing}
          disabled={sectionDisabled} />
        <div className="city-state-zip">
          <Field
            name="city"
            label="City"
            component={Input}
            styleName="city"
            dataTest="city"
            validate={validation.isRequired}
            normalize={this.normalizeSameAsMailing}
            disabled={sectionDisabled} />
          <Field
            name="state"
            label="State"
            component={Input}
            styleName="state"
            dataTest="state"
            validate={validation.isRequired}
            normalize={this.normalizeSameAsMailing}
            disabled={sectionDisabled} />
          <Field
            name="zip"
            label="Zip Code"
            component={Input}
            styleName="zip"
            dataTest="zip"
            validate={validation.isRequired}
            normalize={this.normalizeSameAsMailing}
            disabled={sectionDisabled} />
        </div>
        {showCounty &&
          <Field
            name="county"
            label="County"
            component={Input}
            styleName="county"
            dataTest="county"
            validate={validation.isRequired} />
          }
      </React.Fragment>
    );
  }
}

Address.defaultProps = {
  showCounty: false,
  sectionDisabled: false
};

export default Address;
