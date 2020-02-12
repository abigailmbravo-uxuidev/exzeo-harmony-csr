import React from 'react';
import {
  Field,
  Input,
  validation,
  SelectTypeAhead,
  useField
} from '@exzeo/core-ui';
import Address from './Create/Address';
import AddressWatcher from './Create/AddressWatcher';
import TerritoryManagerWatcher from './Create/TerritoryManagerWatcher';
import {
  useFetchZipCodeSettings,
  useFetchTerritoryManagers
} from './Create/hooks';
import { listOfZipCodes } from './Create/utilities';

const AddressGroup = ({
  mailingAddressPrefix,
  physicalAddressPrefix,
  showTerritoryManager,
  listAnswersAsKey
}) => {
  const disabledValue =
    useField(`${physicalAddressPrefix}.sameAsMailing`).input.value || false;
  const stateValue =
    useField(`${physicalAddressPrefix}.state`).input.value || 'FL';

  const { zipCodeSettings } = useFetchZipCodeSettings(stateValue);
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
            listOfZipCodes={listOfZipCodes(zipCodeSettings)}
            listAnswersAsKey={listAnswersAsKey}
          />

          <AddressWatcher
            fieldPrefix={physicalAddressPrefix}
            matchPrefix={mailingAddressPrefix}
            watchField={`${physicalAddressPrefix}.sameAsMailing`}
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
                values={{}}
                zipCodeSettings={zipCodeSettings}
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
