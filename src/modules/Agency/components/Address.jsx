import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { Input, validation, SelectTypeAhead } from '@exzeo/core-ui';

import { searchSettingsByCSPAndZip } from '../../../state/actions/zipCodeSettings.actions';
import { getListOfZipCodes } from '../../../state/selectors/zipCodeSettings.selectors';

class Address extends Component {
  normalizeSameAsMailing = (value) => {
    const { changeField, mailingAddress, sameAsMailingValue } = this.props;
    if (!mailingAddress || !sameAsMailingValue) return value;
    changeField('sameAsMailing', false);
    return value;
  };

  normalizeZipCode = async (value) => {
    const zipCodes = await this.props.searchSettingsByCSPAndZipAction(value || '');
    if (zipCodes.length === 1) {
      const selectedZip = zipCodes[0];
      this.props.changeField('physicalAddress.county', selectedZip.county);
      this.props.changeField('physicalAddress.zip', selectedZip.zip);
      this.props.changeField('mailingAddress.zip', selectedZip.zip);
    } else {
      this.props.changeField('physicalAddress.county', '');
    }
    this.normalizeSameAsMailing(value);
    return value;
  }

  render() {
    const {
      showCounty, sectionDisabled, listOfZipCodes
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
            component={SelectTypeAhead}
            styleName="zip"
            dataTest="zip"
            optionValue="answer"
            optionLabel="label"
            validate={validation.isRequired}
            normalize={this.normalizeZipCode}
            answers={listOfZipCodes}
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
  sectionDisabled: false,
  listOfZipCodes: []
};


const mapStateToProps = state => ({
  listOfZipCodes: getListOfZipCodes(state)
});

export default connect(mapStateToProps, { searchSettingsByCSPAndZipAction: searchSettingsByCSPAndZip })(Address);

