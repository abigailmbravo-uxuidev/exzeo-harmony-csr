import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { Input, validation, Select, SelectTypeAhead } from '@exzeo/core-ui';

import { searchSettingsByCSPAndZip } from '../../../state/actions/zipCodeSettings.actions';
import { getListOfZipCodes } from '../../../state/selectors/zipCodeSettings.selectors';
import { getListAnswers } from '../../../state/selectors/questions.selectors';


export class Address extends Component {
  componentDidMount() {
    const { stateValue, zipValue } = this.props;
    if (stateValue && zipValue) {
      this.props.searchSettingsByCSPAndZipAction(zipValue, stateValue);
    }
  }
  normalizeSameAsMailing = (value) => {
    const { changeField, section, sameAsMailingValue } = this.props;

    if (section === 'physicalAddress' || !sameAsMailingValue) return value;
    changeField('sameAsMailing', false);
    return value;
  };

  filterTerritoryManager = (state, county) => {
    const { territoryManagers } = this.props;
    const selectedTerritoryManager = territoryManagers
      .find((tm) => {
        const { states } = tm;
        if (states && states.some((s) => {
          const { counties } = s;
          return s.state.includes(state) &&
          counties && counties.some((c) => {
            return c.county.includes(county);
          });
        })) {
          return tm;
        }
        return null;
      });

    return selectedTerritoryManager;
  }

  handleStateAndZip = async (zip, state) => {
    const { section } = this.props;
    const zipCodes = await this.props.searchSettingsByCSPAndZipAction(zip, state);
    if (zipCodes.length === 1) {
      const selectedZip = zipCodes[0];
      this.props.changeField(`${section}.county`, selectedZip.county);
      this.props.changeField(`${section}.zip`, selectedZip.zip);
      this.props.changeField(`${section}.state`, selectedZip.state);

      const tm = this.filterTerritoryManager(selectedZip.state, selectedZip.county);
      if (tm) {
        this.props.changeField('territoryManagerId', tm._id);
      }
    } else {
      this.props.changeField(`${section}.county`, '');
    }
  }

  handleSameAsMailing = (value, previousValue, allValues) => {
    const { change } = this.props;
    const { mailingAddress } = allValues;
    if (!mailingAddress) return value;
    if (value) {
      change('physicalAddress.address1', mailingAddress.address1);
      change('physicalAddress.address2', mailingAddress.address2);
      change('physicalAddress.city', mailingAddress.city);
      change('physicalAddress.state', mailingAddress.state);
      change('physicalAddress.zip', mailingAddress.zip);
    } else {
      change('physicalAddress.address1', '');
      change('physicalAddress.address2', '');
      change('physicalAddress.city', '');
      change('physicalAddress.state', '');
      change('physicalAddress.zip', '');
    }
    return value;
  };


  normalizeZipCode = (value, pv, av) => {
    const { section } = this.props;
    this.handleStateAndZip(av[section].zip, value);
    this.normalizeSameAsMailing(value);
    return value;
  }

  render() {
    const {
      showCounty, sectionDisabled, listOfZipCodes, section, listAnswers
    } = this.props;

    return (
      <section className="agency-address">
        <div className="agency-mailing-address">
          <h4>Mailing Address</h4>
          <FormSection name="mailingAddress">
            <Address
              territoryManagers={territoryManagers}
              sameAsMailingValue={sameAsMailingValue}
              changeField={change}
              section="mailingAddress" />
          </FormSection>
        </div>
        <div className="agency-physical-address">
          <h4>Physical Address
            <Field
              name="sameAsMailing"
              component="input"
              id="sameAsMailing"
              type="checkbox"
              data-test="sameAsMailing"
              normalize={this.handleSameAsMailing} />
            <label htmlFor="sameAsMailing">Same as Mailing Address</label>
          </h4>
          <FormSection name="physicalAddress">
            <Address
              section="physicalAddress"
              showCounty
              territoryManagers={territoryManagers}
              changeField={change}
              stateValue={physicalStateValue}
              zipValue={physicalZipValue}
              sectionDisabled={sameAsMailingValue} />
          </FormSection>
          <Field
            label="Territory Managers"
            name="territoryManagerId"
            styleName="territoryManagerId"
            dataTest="territoryManager"
            component={SelectTypeAhead}
            optionValue="_id"
            optionLabel="name"
            answers={territoryManagers}
            validate={validation.isRequired} />
        </div>
      </section>
    );
  }
}

Address.defaultProps = {
  showCounty: false,
  sectionDisabled: false,
  listOfZipCodes: [],
  sameAsMailingValue: false,
  stateValue: '',
  zipValue: '',
  listAnswers: {}
};


const mapStateToProps = state => ({
  listOfZipCodes: getListOfZipCodes(state),
  listAnswers: getListAnswers(state)
});

export default connect(mapStateToProps, { searchSettingsByCSPAndZipAction: searchSettingsByCSPAndZip })(Address);

