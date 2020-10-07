import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Loader, Modal } from '@exzeo/core-ui';

import { Billing } from '@exzeo/core-ui/src/@Harmony';

function BillingSection({
  initialValues,
  updateBillPlan,
  className = '',
  header = ''
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEdit = async values => {
    setLoading(true);
    const data = {
      policyNumber: values.policyNumber,
      policyID: values.policyID,
      transactionType: 'Bill Plan Update',
      billingStatus: 2,
      billToId: values.billToId,
      billPlan: values.billPlan,
      billToType: values.billToType
    };

    await updateBillPlan(data);
    setLoading(false);
    setShowEdit(false);
  };

  const {
    additionalInterests,
    billPlan,
    billToId,
    billToType,
    policyHolders
  } = initialValues;

  let billToText = '';
  if (billToType.toLowerCase() === 'policyholder') {
    const policyHolder = policyHolders.find(ph => ph._id === billToId);
    if (policyHolder)
      billToText = `${billToType}: ${policyHolder.firstName} ${policyHolder.lastName}`;
  } else {
    const ai = additionalInterests.find(ai => ai._id === billToId);
    if (ai) billToText = `${ai.type}: ${ai.name1} ${ai.name2}`;
  }

  return (
    <section className={className}>
      {header && (
        <h3 className="title">
          {header}{' '}
          <Button
            className={Button.constants.classNames.link}
            size={Button.constants.sizes.small}
            onClick={() => setShowEdit(s => !s)}
            dataTest="edit"
          >
            <i className="fa fa-pencil-square" />
            Edit
          </Button>
        </h3>
      )}
      <dl>
        <div>
          <dt>Bill To</dt>
          <dd>{billToText}</dd>
        </div>
      </dl>
      <dl>
        <div>
          <dt>Bill Plan</dt>
          <dd>{billPlan}</dd>
        </div>
      </dl>
      {showEdit && (
        <Fragment>
          {loading && <Loader />}
          <Modal
            size={Modal.sizes.large}
            className="billing-modal"
            header={<h4>Edit Billing</h4>}
          >
            <Form
              initialValues={initialValues}
              onSubmit={handleEdit}
              subscription={{ submitting: true, pristine: true, values: true }}
            >
              {({ handleSubmit, submitting, pristine }) => (
                <div>
                  <div className="card-block">
                    <Billing initialValues={initialValues} />
                  </div>
                  <div className="card-footer">
                    <Button
                      className="btn btn-secondary"
                      onClick={() => setShowEdit(s => !s)}
                      data-test="modal-cancel"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="btn btn-primary"
                      type="submit"
                      onClick={handleSubmit}
                      data-test="modal-submit"
                      disabled={submitting || pristine}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              )}
            </Form>
          </Modal>
        </Fragment>
      )}
    </section>
  );
}

BillingSection.propTypes = {
  initialValues: PropTypes.object,
  updateBillPlan: PropTypes.func,
  className: PropTypes.string,
  header: PropTypes.string
};

export default BillingSection;
