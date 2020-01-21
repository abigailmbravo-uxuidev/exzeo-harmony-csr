import React from 'react';
import {
  Field,
  Input,
  Integer,
  Radio,
  Select,
  Phone,
  validation,
  Date,
  format,
  composeValidators,
  SelectTypeAhead
} from '@exzeo/core-ui';
import Address from './Address';

const { isRequired, validateState, validateZipCode } = validation;

const AddressGroup = ({
  dataTest,
  mailingAddressPrefix,
  physicalAddressPrefix,
  territoryManagers,
  isOptionalTerritoryManager,
  listOfZipCodes
}) => {
  return (
    <section
      data-test={`${dataTest}-address-section`}
      className={'agency-address'}
    >
      <div className="agency-mailing-address">
        <div data-test={`${dataTest}-mailing-address`}>
          <h4>Mailing Address</h4>
          <Address fieldPrefix={mailingAddressPrefix} />
          {/* <FormSection name="mailingAddress">
          <Address
            normalizeSameAsMailing={this.normalizeSameAsMailing(
              'mailingAddress'
            )}
            territoryManagers={territoryManagers}
            changeField={changeField}
            section="mailingAddress"
          />
        </FormSection> */}
        </div>
      </div>
      <div className="agency-physical-address">
        <div data-test={`${dataTest}-physical-address`}>
          <h4>
            Physical Address
            <Field
              name="sameAsMailing"
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
            fieldPrefix={physicalAddressPrefix}
            listOfZipCodes={listOfZipCodes}
          />

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
                answers={territoryManagers}
                validate={
                  isOptionalTerritoryManager ? null : validation.isRequired
                }
              />
            )}
          </Field>

          {/* <FormSection name="physicalAddress">
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
          />
        </FormSection> */}
          {/* <Field
            label="Territory Managers"
            name="territoryManagerId"
            styleName="territoryManagerId"
            dataTest="territoryManager"
            component={SelectTypeAhead}
            optionValue="_id"
            optionLabel="name"
            answers={territoryManagers}
            validate={isOptional ? null : validation.isRequired}
          /> */}
        </div>
      </div>
    </section>
  );
};

export default AddressGroup;
