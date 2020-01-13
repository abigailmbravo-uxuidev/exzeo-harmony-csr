import { Input, Select, SelectTypeAhead, validation } from '@exzeo/core-ui';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { getListAnswersAsKey } from '../../../state/selectors/questions.selectors';
import { getListOfZipCodes } from '../../../state/selectors/zipCodeSettings.selectors';

export class Address extends Component {
  render() {
    const {
      showCounty,
      sectionDisabled,
      listOfZipCodes,
      section,
      listAnswersAsKey,
      normalizeSameAsMailing,
      normalizeZipCode,
      normalizeState,
      isOptional
    } = this.props;

    return (
      <React.Fragment>
        <Field
          name="address1"
          label="Address 1"
          component={Input}
          styleName="address1"
          dataTest="address1"
          validate={isOptional ? null : validation.isRequired}
          normalize={normalizeSameAsMailing}
          disabled={sectionDisabled}
        />
        <Field
          name="address2"
          label="Address 2"
          component={Input}
          styleName="address2"
          dataTest="address2"
          normalize={normalizeSameAsMailing}
          disabled={sectionDisabled}
        />
        <div className="city-state-zip">
          <Field
            name="city"
            label="City"
            component={Input}
            styleName="city"
            dataTest="city"
            validate={isOptional ? null : validation.isRequired}
            normalize={normalizeSameAsMailing}
            disabled={sectionDisabled}
          />
          <Field
            name="state"
            label="State"
            component={Select}
            styleName="state"
            dataTest="state"
            validate={isOptional ? null : validation.isRequired}
            normalize={section === 'physicalAddress' ? normalizeState : null}
            answers={listAnswersAsKey.US_states}
            disabled={sectionDisabled}
          />
          {section === 'physicalAddress' && (
            <Field
              name="zip"
              label="Zip Code"
              component={SelectTypeAhead}
              styleName="zip"
              dataTest="zip"
              optionValue="answer"
              optionLabel="label"
              validate={isOptional ? null : validation.isRequired}
              normalize={normalizeZipCode}
              answers={listOfZipCodes}
              disabled={sectionDisabled}
            />
          )}
          {section === 'mailingAddress' && (
            <Field
              name="zip"
              label="Zip Code"
              component={Input}
              styleName="zip"
              dataTest="zip"
              validate={isOptional ? null : validation.isRequired}
              normalize={normalizeSameAsMailing}
              disabled={sectionDisabled}
            />
          )}
        </div>
        {showCounty && (
          <Field
            name="county"
            label="County"
            component={Input}
            styleName="county"
            dataTest="county"
            validate={validation.isRequired}
          />
        )}
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
  listAnswersAsKey: getListAnswersAsKey(state)
});

export default connect(mapStateToProps)(Address);
