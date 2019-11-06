import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FormSection } from 'redux-form';
import { validation, SelectTypeAhead } from '@exzeo/core-ui';

import { searchSettingsByCSPAndZip } from '../../../state/actions/zipCodeSettings.actions';
import {
  getListOfZipCodes,
  getZipCodeSettings
} from '../../../state/selectors/zipCodeSettings.selectors';
import Address from './Address';

export class AddressGroup extends Component {
  getFieldPath = path => {
    const { parentFormGroup } = this.props;
    if (!parentFormGroup) return path;
    return `${parentFormGroup}.${path}`;
  };

  getFormGroupPath = allValues => {
    const { parentFormGroup } = this.props;
    if (!parentFormGroup) return allValues;
    return allValues[parentFormGroup];
  };

  normalizeSameAsMailing = section => (value, pv, av) => {
    const { changeField } = this.props;

    const formValues = this.getFormGroupPath(av);

    if (section === 'physicalAddress' || !formValues.sameAsMailing)
      return value;
    changeField(this.getFieldPath('sameAsMailing'), false);
    this.handleStateAndZip('', formValues.physicalAddress.state);
    return value;
  };

  filterTerritoryManager = (state, county) => {
    const { territoryManagers } = this.props;
    const selectedTerritoryManager = territoryManagers.find(tm => {
      const { states } = tm;
      if (
        states &&
        states.some(s => {
          const { counties } = s;
          return (
            s.state.includes(state) &&
            counties &&
            counties.some(c => {
              return c.county.includes(county);
            })
          );
        })
      ) {
        return tm;
      }
      return null;
    });

    return selectedTerritoryManager;
  };

  setTerritoryManager = selectedZip => {
    this.props.changeField(
      this.getFieldPath('physicalAddress.county'),
      selectedZip.county
    );
    this.props.changeField(
      this.getFieldPath('physicalAddress.zip'),
      selectedZip.zip
    );
    this.props.changeField(
      this.getFieldPath('physicalAddress.state'),
      selectedZip.state
    );

    const tm = this.filterTerritoryManager(
      selectedZip.state,
      selectedZip.county
    );
    if (tm) {
      this.props.changeField('territoryManagerId', tm._id);
    }
  };

  handleStateAndZip = async (zip, state) => {
    const zipCodes = await this.props.searchSettingsByCSPAndZipAction(
      zip,
      state
    );
    if (zipCodes.length === 1) {
      const selectedZip = zipCodes[0];
      this.setTerritoryManager(selectedZip);
    } else {
      this.props.changeField(this.getFieldPath('physicalAddress.county'), '');
    }
  };

  handleSameAsMailing = (value, previousValue, allValues) => {
    const { changeField } = this.props;
    const { mailingAddress } = this.getFormGroupPath(allValues);
    if (!mailingAddress) return value;
    if (value) {
      changeField(
        this.getFieldPath('physicalAddress.address1'),
        mailingAddress.address1
      );
      changeField(
        this.getFieldPath('physicalAddress.address2'),
        mailingAddress.address2
      );
      changeField(
        this.getFieldPath('physicalAddress.city'),
        mailingAddress.city
      );
      changeField(
        this.getFieldPath('physicalAddress.state'),
        mailingAddress.state
      );
      changeField(this.getFieldPath('physicalAddress.zip'), mailingAddress.zip);

      this.handleStateAndZip(mailingAddress.zip, mailingAddress.state);
    }
    return value;
  };

  normalizeState = (value, pv, av) => {
    this.handleStateAndZip('', value);
    this.normalizeSameAsMailing('physicalAddress')(value, pv, av);
    return value;
  };

  normalizeZipCode = (value, pv, av) => {
    const { zipCodeSettings } = this.props;
    const mathingZipCodes = zipCodeSettings.filter(z => z.zip === value);
    if (mathingZipCodes.length === 1) {
      this.setTerritoryManager(mathingZipCodes[0]);
    }
    this.normalizeSameAsMailing('physicalAddress')(value, pv, av);
    return value;
  };

  render() {
    const {
      territoryManagers,
      changeField,
      sameAsMailingValue,
      isOptional,
      isAgency,
      showCounty
    } = this.props;

    return (
      <section className={`${isAgency ? 'agency-address' : 'agent-address'}`}>
        <div
          className="agency-mailing-address"
          data-test="agency-mailing-address"
        >
          <h4>Mailing Address</h4>
          <FormSection name="mailingAddress">
            <Address
              normalizeSameAsMailing={this.normalizeSameAsMailing(
                'mailingAddress'
              )}
              territoryManagers={territoryManagers}
              changeField={changeField}
              section="mailingAddress"
            />
          </FormSection>
        </div>
        <div
          className="agency-physical-address"
          data-test="agency-physical-address"
        >
          <h4>
            Physical Address
            <Field
              name="sameAsMailing"
              component="input"
              id={this.getFieldPath('sameAsMailing')}
              type="checkbox"
              data-test={this.getFieldPath('sameAsMailing')}
              normalize={this.handleSameAsMailing}
            />
            <label htmlFor={this.getFieldPath('sameAsMailing')}>
              Same as Mailing Address
            </label>
          </h4>
          <FormSection name="physicalAddress">
            <Address
              isOptional={isOptional}
              sectionDisabled={sameAsMailingValue === true}
              normalizeSameAsMailing={this.normalizeSameAsMailing(
                'physicalAddress'
              )}
              normalizeZipCode={this.normalizeZipCode}
              normalizeState={this.normalizeState}
              section="physicalAddress"
              showCounty={showCounty}
              territoryManagers={territoryManagers}
              changeField={changeField}
            />
          </FormSection>
          {isAgency && (
            <Field
              label="Territory Managers"
              name="territoryManagerId"
              styleName="territoryManagerId"
              data-test="territoryManager"
              component={SelectTypeAhead}
              optionValue="_id"
              optionLabel="name"
              answers={territoryManagers}
              validate={isOptional ? null : validation.isRequired}
            />
          )}
        </div>
      </section>
    );
  }
}

AddressGroup.defaultProps = {
  listOfZipCodes: [],
  isOptional: false,
  isAgency: false,
  parentFormGroup: ''
};

const mapStateToProps = state => ({
  territoryManagers: state.questions.territoryManagers,
  listOfZipCodes: getListOfZipCodes(state),
  zipCodeSettings: getZipCodeSettings(state)
});

export default connect(
  mapStateToProps,
  { searchSettingsByCSPAndZipAction: searchSettingsByCSPAndZip }
)(AddressGroup);
