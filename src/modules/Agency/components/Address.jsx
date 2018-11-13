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
            component={Select}
            styleName="state"
            dataTest="state"
            validate={validation.isRequired}
            normalize={this.normalizeZipCode}
            answers={listAnswers.US_states}
            disabled={sectionDisabled} />
          {section === 'physicalAddress' && <Field
            name="zip"
            label="Zip Code"
            component={SelectTypeAhead}
            styleName="zip"
            dataTest="zip"
            optionValue="answer"
            optionLabel="label"
            validate={validation.isRequired}
            normalize={this.normalizeSameAsMailing}
            answers={listOfZipCodes}
            disabled={sectionDisabled} />}
          {section === 'mailingAddress' && <Field
            name="zip"
            label="Zip Code"
            component={Input}
            styleName="zip"
            dataTest="zip"
            validate={validation.isRequired}
            normalize={this.normalizeSameAsMailing}
            disabled={sectionDisabled} />}
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

