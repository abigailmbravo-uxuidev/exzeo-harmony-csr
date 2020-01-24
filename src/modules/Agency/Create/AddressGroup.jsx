import React from 'react';
import _get from 'lodash/get';
import { Field, Input, validation, SelectTypeAhead } from '@exzeo/core-ui';
import Address from './Address';
import AddressWatcher from './AddressWatcher';
import TerritoryManagerWatcher from './TerritoryManagerWatcher';
import { useFetchZipCodeSettings, useFetchTerritoryManagers } from './hooks';
import { listOfZipCodes } from './utilities';

const AddressGroup = ({
  dataTest,
  mailingAddressPrefix,
  physicalAddressPrefix,
  showTerritoryManager,
  formValues,
  listAnswersAsKey
}) => {
  const disabledValue = _get(
    formValues,
    `${physicalAddressPrefix}.sameAsMailing`,
    false
  );

  const stateValue = _get(formValues, `${physicalAddressPrefix}.state`, 'FL');
  const { zipCodeSettings } = useFetchZipCodeSettings(stateValue);
  const { territoryManagers } = useFetchTerritoryManagers(stateValue);

  return (
    <section
      data-test={`${dataTest}-address-section`}
      className={'agency-address'}
    >
      <div className="agency-mailing-address">
        <div data-test={`${dataTest}-mailing-address`}>
          <h4>Mailing Address</h4>
          <Address
            fieldPrefix={mailingAddressPrefix}
            listAnswersAsKey={listAnswersAsKey}
            listOfZipCodes={null}
          />
        </div>
      </div>
      <div className="agency-physical-address">
        <div data-test={`${dataTest}-physical-address`}>
          <h4>
            Physical Address
            <Field
              name={`${physicalAddressPrefix}.sameAsMailing`}
              component="input"
              id={`${physicalAddressPrefix}.sameAsMailing`}
              type="checkbox"
              data-test={`${physicalAddressPrefix}.sameAsMailing`}
            />
            <label htmlFor={`${physicalAddressPrefix}.sameAsMailing`}>
              Same as Mailing Address
            </label>
          </h4>
          <Address
            setDisabled={disabledValue}
            fieldPrefix={physicalAddressPrefix}
            listOfZipCodes={listOfZipCodes(zipCodeSettings)}
            listAnswersAsKey={listAnswersAsKey}
          />

          <AddressWatcher
            fieldPrefix={physicalAddressPrefix}
            matchPrefix={mailingAddressPrefix}
            watchField={`${physicalAddressPrefix}.sameAsMailing`}
            values={formValues}
          />

          {showTerritoryManager && (
            <React.Fragment>
              <Field
                name={`${physicalAddressPrefix}.county`}
                validate={validation.isRequired}
              >
                {({ input, meta }) => (
                  <Input
                    input={input}
                    meta={meta}
                    label="County"
                    styleName="county"
                    dataTest={`${physicalAddressPrefix}.county`}
                    disabled={disabledValue}
                  />
                )}
              </Field>
              <Field name="territoryManagerId" validate={validation.isRequired}>
                {({ input, meta }) => (
                  <SelectTypeAhead
                    input={input}
                    meta={meta}
                    label="Territory Managers"
                    styleName="territoryManagerId"
                    dataTest="territoryManager"
                    optionValue="_id"
                    optionLabel="name"
                    disabled={disabledValue}
                    answers={territoryManagers}
                    validate={validation.isRequired}
                  />
                )}
              </Field>

              <TerritoryManagerWatcher
                fieldPrefix={physicalAddressPrefix}
                matchPrefix={mailingAddressPrefix}
                watchField={`${physicalAddressPrefix}.sameAsMailing`}
                values={formValues}
                zipCodeSettings={zipCodeSettings}
                territoryManagers={territoryManagers}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddressGroup;
