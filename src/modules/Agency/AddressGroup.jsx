import React, { useState } from 'react';
import {
  Field,
  Input,
  validation,
  SelectTypeAhead,
  useField
} from '@exzeo/core-ui';
import Address from './Address';
import AddressWatcher from './AddressWatcher';
import TerritoryManagerWatcher from './TerritoryManagerWatcher';
import { useFetchPostalCodes } from './hooks';
import { listOfPostalCodes } from './utilities';
import { useFetchTerritoryManagers } from '../../hooks/territoryManagers';

const AddressGroup = ({
  mailingAddressPrefix,
  physicalAddressPrefix,
  showTerritoryManager,
  listAnswersAsKey
}) => {
  const [postalCodeInput, setPostalCodeInput] = useState('');
  const disabledValue =
    useField(`${physicalAddressPrefix}.sameAsMailing`).input.value || false;
  const stateValue =
    useField(`${physicalAddressPrefix}.state`).input.value || 'FL';

  const zipValue = useField(`${physicalAddressPrefix}.zip`).input.value || '';

  const { postalCodes } = useFetchPostalCodes(
    postalCodeInput || zipValue,
    stateValue
  );
  const { territoryManagers } = useFetchTerritoryManagers(stateValue);

  return (
    <React.Fragment>
      <div className="agency-mailing-address">
        <div data-test="agency-mailing-address">
          <h4>Mailing Address</h4>
          <Address
            fieldPrefix={mailingAddressPrefix}
            listAnswersAsKey={listAnswersAsKey}
            listOfZipCodes={null}
          />
        </div>
      </div>
      <div className="agency-physical-address">
        <div data-test="agency-physical-address">
          <h4>
            Physical Address
            <Field
              name={`${physicalAddressPrefix}.sameAsMailing`}
              component="input"
              id={`${physicalAddressPrefix}.sameAsMailing`}
              type="checkbox"
              data-test="sameAsMailing"
            />
            <label htmlFor={`${physicalAddressPrefix}.sameAsMailing`}>
              Same as Mailing Address
            </label>
          </h4>
          <Address
            setDisabled={disabledValue}
            fieldPrefix={physicalAddressPrefix}
            listOfPostalCodes={listOfPostalCodes(postalCodes)}
            listAnswersAsKey={listAnswersAsKey}
            postalCodeInput={postalCodeInput}
            setPostalCodeInput={setPostalCodeInput}
          />

          <AddressWatcher
            fieldPrefix={physicalAddressPrefix}
            matchPrefix={mailingAddressPrefix}
            watchField={`${physicalAddressPrefix}.sameAsMailing`}
            setPostalCodeInput={setPostalCodeInput}
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
                physicalAddressPrefix={physicalAddressPrefix}
                mailingAddressPrefix={mailingAddressPrefix}
                territoryManagers={territoryManagers}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddressGroup;
