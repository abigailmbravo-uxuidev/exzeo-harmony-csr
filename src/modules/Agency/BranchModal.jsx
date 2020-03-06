import React from 'react';
import {
  Field,
  Form,
  Input,
  Phone,
  Radio,
  Select,
  validation,
  Button,
  composeValidators
} from '@exzeo/core-ui';
import { STATUS, MAIL_ANSWERS } from 'constants/agency';

export const BranchModal = ({
  agency,
  branchCode,
  closeModal,
  updateAgency,
  initialValues
}) => {
  const handleBranchSubmit = async data => {
    const selectedBranch = agency.branches.filter(
      b => String(b.branchCode) === String(branchCode)
    )[0];
    selectedBranch.displayName = data.displayName;
    selectedBranch.status = data.status;
    selectedBranch.primaryPhoneNumber = data.primaryPhoneNumber;
    selectedBranch.secondaryPhoneNumber = data.secondaryPhoneNumber;
    selectedBranch.faxNumber = data.faxNumber;
    selectedBranch.websiteUrl = data.websiteUrl;
    selectedBranch.mailCommissionChecksToBranch =
      data.mailCommissionChecksToBranch;
    selectedBranch.mailPolicyDocsToBranch = data.mailPolicyDocsToBranch;
    agency.branches = agency.branches.filter(b => String(b.branchCode) !== '0');
    await updateAgency(agency);
    closeModal();
  };

  return (
    <div className="modal agency-crud branch-agency-crud">
      <Form
        id="BranchModal"
        initialValues={initialValues}
        onSubmit={handleBranchSubmit}
        subscription={{ submitting: true }}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="card branch">
              <div className="card-header">
                <h4>
                  <i className="fa fa-address-book" /> Edit Agency Details
                </h4>
              </div>
              <div className="card-block">
                <section className="agency-details">
                  <Field name="displayName" validate={validation.isRequired}>
                    {({ input, meta }) => (
                      <Input
                        input={input}
                        meta={meta}
                        label="Branch Name"
                        styleName="displayName branchName branch"
                        dataTest="displayName"
                      />
                    )}
                  </Field>
                  <Field name="status" validate={validation.isRequired}>
                    {({ input, meta }) => (
                      <Select
                        input={input}
                        meta={meta}
                        id="status"
                        dataTest="status"
                        styleName="status"
                        label="Status"
                        answers={STATUS}
                      />
                    )}
                  </Field>
                  <Field name="mailCommissionChecksToBranch">
                    {({ input, meta }) => (
                      <Radio
                        input={input}
                        meta={meta}
                        dataTest="mailCommissionChecksToBranch"
                        styleName="mailCommissionChecksToBranch"
                        label="Mail Commission Checks to this Branch"
                        segmented
                        answers={MAIL_ANSWERS}
                      />
                    )}
                  </Field>
                  <Field name="mailPolicyDocsToBranch">
                    {({ input, meta }) => (
                      <Radio
                        input={input}
                        meta={meta}
                        dataTest="mailPolicyDocsToBranch"
                        styleName="mailPolicyDocsToBranch"
                        label="Mail Commission Checks to this Branch"
                        segmented
                        answers={MAIL_ANSWERS}
                      />
                    )}
                  </Field>
                  <Field validate={validation.isWebAddress} name="websiteUrl">
                    {({ input, meta }) => (
                      <Input
                        input={input}
                        meta={meta}
                        dataTest="websiteUrl"
                        styleName="webAddress branch"
                        label="Web Address"
                      />
                    )}
                  </Field>
                  <hr />
                  <Field
                    name="primaryPhoneNumber"
                    validate={composeValidators([
                      validation.isRequired,
                      validation.isPhone
                    ])}
                  >
                    {({ input, meta }) => (
                      <Phone
                        input={input}
                        meta={meta}
                        label="Phone 1"
                        styleName="primaryPhoneNumber"
                        dataTest="primaryPhoneNumber"
                      />
                    )}
                  </Field>
                  <Field
                    name="secondaryPhoneNumber"
                    validate={validation.isPhone}
                  >
                    {({ input, meta }) => (
                      <Phone
                        input={input}
                        meta={meta}
                        label="Phone 2"
                        styleName="secondaryPhoneNumber"
                        dataTest="secondaryPhoneNumber"
                      />
                    )}
                  </Field>
                  <Field name="faxNumber" validate={validation.isPhone}>
                    {({ input, meta }) => (
                      <Phone
                        input={input}
                        meta={meta}
                        label="Fax"
                        styleName="faxNumber"
                        dataTest="faxNumber"
                      />
                    )}
                  </Field>
                </section>
              </div>
              <div className="card-footer">
                <div className="btn-footer">
                  <Button
                    className={Button.constants.classNames.secondary}
                    data-test="cancel-modal"
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={Button.constants.classNames.primary}
                    type="submit"
                    data-test="submit-modal"
                    disabled={submitting}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

export default BranchModal;
