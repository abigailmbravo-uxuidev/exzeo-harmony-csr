import React from 'react';
import { reduxForm, Form, change, Field } from 'redux-form';
import { batchActions } from 'redux-batched-actions';
import { Select, Phone, Radio, Input } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

export const resetSameAsMailing = (dispatch) => {
  dispatch(change('AgencyModal', 'sameAsMailing', false));
};

export const copyAddress = (value, allValues, dispatch) => {
  if (value) {
    dispatch(batchActions([
      change(
        'AgencyModal',
        'physicalAddress.address1',
        allValues.mailingAddress.address1
      ),
      change(
        'AgencyModal',
        'physicalAddress.address2',
        allValues.mailingAddress.address2
      ),
      change(
        'AgencyModal',
        'physicalAddress.city',
        allValues.mailingAddress.city
      ),
      change(
        'AgencyModal',
        'physicalAddress.state',
        allValues.mailingAddress.state
      ),
      change(
        'AgencyModal',
        'physicalAddress.zip',
        allValues.mailingAddress.zip
      )
    ]));
  } else {
    dispatch(batchActions([
      change('AgencyModal', 'physicalAddress.address1', ''),
      change('AgencyModal', 'physicalAddress.address2', ''),
      change('AgencyModal', 'physicalAddress.city', ''),
      change('AgencyModal', 'physicalAddress.state', ''),
      change('AgencyModal', 'physicalAddress.zip', '')
    ]));
  }
  return value;
};

const AgencyModal = ({
  handleSubmit,
  saveAgency,
  closeModal,
  isSubmitting,
  isEdit,
  dispatch,
  fieldValues,
  initialValues
}) => (
  <div className="modal agency-crud">
    <Form noValidate="noValidate" onSubmit={handleSubmit(saveAgency)}>
      <div className="card">
        <div className="card-header">
          <h4>
            <i className="fa fa-address-book" /> {isEdit ? 'Edit ' : 'New '}
            Agency
          </h4>
        </div>
        <div className="card-block">
          <section className="agency-details">
            <div className="agency-id">
              <Field
                label="Agency ID"
                styleName="agencyCode"
                name="agencyCode"
                component={Input}
                validate={validation.isRequired}
                disabled={initialValues.agencyCode}
              />
              <Field
                label="Agency Name"
                styleName="agencyName"
                name="displayName"
                component={Input}
                validate={validation.isRequired}
              />
              <Field
                label="Entity Name"
                styleName="entityName"
                name="legalName"
                component={Input}
                validate={validation.isRequired}
              />
            </div>
            <div className="agency-description">
              <Field
                id="status"
                name="status"
                styleName="status"
                label="Status"
                component={Select}
                validate={validation.isRequired}
                answers={[
                  {
                    answer: 'Active',
                    label: 'Active'
                  },
                  {
                    answer: 'InActive',
                    label: 'InActive'
                  }
                ]}
              />
              <Field
                label="TPAID"
                styleName="tPaid"
                name="tPaid"
                component={Input}
                validate={[validation.isRequired, validation.isNumbersOnly]}
              />
              <Field
                name="okToPay"
                styleName="okToPay"
                label="Ok to Pay"
                validate={validation.isRequired}
                component={Radio}
                segmented
                answers={[
                  {
                    answer: false,
                    label: 'No'
                  },
                  {
                    answer: true,
                    label: 'Yes'
                  }
                ]}
              />
              <Field
                label="Tier"
                styleName="tier"
                name="tier"
                component={Input}
                validate={[validation.isRequired, validation.isNumbersOnly]}
              />
              <Field
                label="Web Address"
                styleName="webAddress"
                name="websiteUrl"
                component={Input}
              />
              {/* web address validaiton */}
            </div>
          </section>
          <section className="agency-address">
            <div className="agency-mailing-address">
              <h4>Mailing Address</h4>
              <Field
                label="Address 1"
                styleName="mailingAddress1"
                name="mailingAddress.address1"
                component={Input}
                validate={validation.isRequired}
                onChange={() => resetSameAsMailing(dispatch)}
              />
              <Field
                label="Address 2"
                styleName="mailingAddress2"
                name="mailingAddress.address2"
                component={Input}
                onChange={() => resetSameAsMailing(dispatch)}
              />
              <div className="flex-form">
                <Field
                  label="City"
                  styleName="mailingCity"
                  name="mailingAddress.city"
                  component={Input}
                  validate={validation.isRequired}
                  onChange={() => resetSameAsMailing(dispatch)}
                />
                <Field
                  label="State"
                  styleName="mailingState"
                  name="mailingAddress.state"
                  component={Input}
                  validate={validation.isRequired}
                  onChange={() => resetSameAsMailing(dispatch)}
                />
                <Field
                  label="Zip Code"
                  styleName="mailingZip"
                  name="mailingAddress.zip"
                  component={Input}
                  validate={[validation.isRequired, validation.isZipCode]}
                  onChange={() => resetSameAsMailing(dispatch)}
                />
              </div>
              <div className="tax-detail">
                <Field
                  label="Tax ID"
                  styleName="taxId"
                  name="taxIdNumber"
                  component={Input}
                  validate={validation.isRequired}
                />
                <Field
                  id="taxClassification"
                  name="taxClassification"
                  styleName="taxClassification"
                  label="Tax Classification"
                  component={Select}
                  validate={validation.isRequired}
                  answers={[
                    {
                      answer: 'LLC',
                      label: 'LLC'
                    },
                    {
                      answer: 'Corporation',
                      label: 'Corporation'
                    }
                  ]}
                />
              </div>
            </div>
            <div className="agency-physical-address">
              <div className="flex-form">
                <h4>
                  Physical Address
                  <Field
                    normalize={value => copyAddress(value)}
                    name="sameAsMailing"
                    id="sameAsMailing"
                    component="input"
                    type="checkbox"
                  />
                  <label htmlFor="sameAsMailing">Same as Mailing Address</label>
                </h4>
              </div>
              <Field
                label="Address 1"
                styleName="physicalAddress1"
                name="physicalAddress.address1"
                component={Input}
                validate={validation.isRequired}
                disabled={fieldValues.sameAsMailing}
              />
              <Field
                label="Address 2"
                styleName="physicalAddress2"
                name="physicalAddress.address2"
                component={Input}
                validate={validation.isRequired}
                disabled={fieldValues.sameAsMailing}
              />
              <div className="flex-form">
                <Field
                  label="City"
                  styleName="physicalCity"
                  name="physicalAddress.city"
                  component={Input}
                  validate={validation.isRequired}
                  disabled={fieldValues.sameAsMailing}
                />
                <Field
                  label="State"
                  styleName="physicalState"
                  name="physicalAddress.state"
                  component={Input}
                  validate={validation.isRequired}
                  disabled={fieldValues.sameAsMailing}
                />
                <Field
                  label="Zip Code"
                  styleName="physicalZip"
                  name="physicalAddress.zip"
                  component={Input}
                  validate={validation.isRequired}
                  disabled={fieldValues.sameAsMailing}
                />
              </div>
              <Field
                label="County"
                styleName="county"
                name="physicalAddress.county"
                component={Input}
                validate={validation.isRequired}
              />
            </div>
          </section>
          <section className="agency-csr">
            <h4>CSR Contact Information</h4>
            <div className="flex-form">
              <Field
                label="CSR Phone 1"
                styleName="primaryPhoneNumber"
                name="primaryPhoneNumber"
                component={Phone}
                validate={validation.isRequired}
              />
              <Field
                label="CSR Phone 2"
                styleName="secondaryPhoneNumber"
                name="secondaryPhoneNumber"
                component={Phone}
                validate={validation.isRequired}
              />
              <Field
                label="CSR Fax"
                styleName="faxNumber"
                name="faxNumber"
                component={Phone}
                validate={validation.isRequired}
              />
              <Field
                label="CSR Email Address"
                styleName="customerServiceEmailAddress"
                name="customerServiceEmailAddress"
                component={Input}
                validate={[validation.isRequired, validation.isEmail]}
              />
            </div>
          </section>
          <section className="agency-contact">
            <h4>Agency Contact Information</h4>
            <div className="flex-form">
              <Field
                label="Contact First Name"
                styleName="contactFirstName flex-item"
                name="contactFirstName"
                component={Input}
                validate={validation.isRequired}
              />
              <Field
                label="Contact Last Name"
                styleName="contactLastName flex-item"
                name="contactLastName"
                component={Input}
                validate={validation.isRequired}
              />
              <Field
                label="Contact Email Address"
                styleName="contactEmailAddress"
                name="contactEmailAddress"
                component={Input}
                validate={validation.isRequired}
              />
            </div>
          </section>
          <section className="agency-principal">
            <h4>Agency Principal Information</h4>
            <div className="flex-form">
              <Field
                label="Principal First Name"
                styleName="principalFirstName"
                name="principalFirstName"
                component={Input}
                validate={validation.isRequired}
              />
              <Field
                label="Principal Last Name"
                styleName="principalLastName"
                name="principalLastName"
                component={Input}
                validate={validation.isRequired}
              />
              <Field
                label="Principal Email Address"
                styleName="principalEmailAddress flex-item"
                name="principalEmailAddress"
                component={Input}
                validate={[validation.isRequired, validation.isEmail]}
              />
            </div>
          </section>
        </div>
        <div className="card-footer">
          <div className="btn-footer">
            <button
              tabIndex="0"
              className="btn btn-secondary"
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              tabIndex="0"
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Form>
  </div>
);

export default reduxForm({ form: 'AgencyModal', enableReinitialize: true })(AgencyModal);
