import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Modal,
  ModalPortal,
  Input,
  Radio,
  Form,
  Field,
  Button,
  Numbers,
  SectionLoader,
  validation,
  format,
  composeValidators,
  date
} from '@exzeo/core-ui';
import { ccValidation } from '@exzeo/core-ui/src/@Harmony';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

import {
  VALID_ONLINE_PAYMENTS_BILLING_STATUSES,
  VALID_ONLINE_PAYMENTS_STATUSES
} from '../../../constants/policyStatus';

import TrustCommerceHiddenFields from './TrustCommerceHiddenFields';
import CreditCardFields from './CreditCardFields';
import ACHFields from './ACHFields';
import CustomFields from './CustomFields';

function formatInitialValues({ paymentTokenResponse, receipt }) {
  if (receipt) {
    const {
      hash,
      cc,
      cvv,
      account,
      routing,
      savings,
      ...nonSensitiveData
    } = receipt;
    return {
      ...nonSensitiveData
    };
  }
  return {
    // -----------hidden fields--------------- //
    token: paymentTokenResponse.paymentToken,
    demo: paymentTokenResponse.demoMode,
    returnUrl: paymentTokenResponse.returnUrl,
    action: 'sale',
    // --------------------------------------- //
    customfield1: paymentTokenResponse.policyNumber.value,
    customfield2: paymentTokenResponse.insuredName.value,
    customfield3: `${date.moment().format('YYYYMMDD')}-CSR`,
    amount: paymentTokenResponse.noticeAmountDue.toFixed(2),
    name: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  };
}

function renderAmountField(disabled) {
  return (
    <Field
      name="amount"
      validate={composeValidators([
        validation.isRequired,
        ccValidation.isValidAmount
      ])}
    >
      {({ input, meta }) => (
        <Numbers
          input={input}
          meta={meta}
          dataTest="amount"
          label="Amount"
          styleName="achAmount"
          placeholder="XXX.XX"
          decimalScale={2}
          fixedDecimalScale
          disabled={disabled}
        />
      )}
    </Field>
  );
}

const OnlinePaymentModule = ({ document, setPaymentAdded, getPolicy }) => {
  const location = useLocation();
  const history = useHistory();
  const [state, setState] = useState({ showModal: false, loading: false });
  const [initialValues, setInitialValues] = useState(null);
  const [tokenResponse, setTokenResponse] = useState();
  const [isPaymentSuccessful, setPaymentSuccessful] = useState(false);
  const [isPaymentFailed, setPaymentFailed] = useState(false);
  const [hasError, setError] = useState(null);

  const [paymentType, setPaymentType] = useState(() =>
    location.state?.media === 'ach' ? 'ACH' : 'Credit'
  );

  useEffect(() => {
    async function getPaymentToken() {
      try {
        setState(s => ({ ...s, loading: true }));
        const config = {
          service: 'payment-manager',
          method: 'POST',
          path: 'online-payments',
          data: {
            policyNumber: document.policyNumber,
            returnUrl: `${process.env.REACT_APP_AUTH0_PRIMARY_URL}/receipt`
          }
        };

        const {
          data: { result: paymentTokenResponse }
        } = await serviceRunner.callService(config, 'getPaymentToken');
        setTokenResponse(paymentTokenResponse);
        setInitialValues(
          formatInitialValues({
            paymentTokenResponse,
            receipt: location.state
          })
        );
      } catch (e) {
        console.error(e);
      } finally {
        setState(s => ({ ...s, loading: false }));
      }
    }
    if (state.showModal && (location.state?.token ? isPaymentFailed : true)) {
      getPaymentToken();
    }
  }, [state.showModal, isPaymentFailed, document.policyNumber, location.state]);

  useEffect(() => {
    async function completePayment() {
      try {
        setState(s => ({ ...s, loading: true, showModal: true }));
        const config = {
          service: 'payment-manager',
          method: 'PUT',
          path: `online-payments/${location.state.token}`,
          data: {
            merchantRequest: location.state.merchantRequest,
            policyNumber: location.state.policyNumber
          }
        };
        const {
          data: { result: completePaymentResponse }
        } = await serviceRunner.callService(
          config,
          'completePaymentOnlineTransaction'
        );

        setInitialValues(formatInitialValues({ receipt: location.state }));

        if (completePaymentResponse.status === 'decline') {
          setPaymentFailed(true);
        } else {
          setPaymentSuccessful(true);
        }
        setPaymentAdded(date.timestamp());
        getPolicy(document.policyNumber);
      } catch (e) {
        setError(e);
      } finally {
        setState(s => ({ ...s, loading: false }));
      }
    }

    if (location.state?.token) {
      completePayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closeModal() {
    if (location.state) {
      history.replace();
    }
    setState(s => ({ ...s, showModal: false }));
    setPaymentType('Credit');
    setPaymentFailed(false);
    setPaymentSuccessful(false);
    setError(false);
  }

  async function handlePayment(values) {
    console.log(values);
  }

  const isOnlinePaymentDisabled =
    !VALID_ONLINE_PAYMENTS_STATUSES.includes(document.status) ||
    !VALID_ONLINE_PAYMENTS_BILLING_STATUSES.includes(
      document.summaryLedger.status.code
    );

  return (
    <React.Fragment>
      <Button
        className={Button.constants.classNames.link}
        size={Button.constants.sizes.small}
        onClick={() => setState(s => ({ ...s, showModal: true }))}
        dataTest="create-payment"
        disabled={isOnlinePaymentDisabled}
      >
        <i className="fa fa-credit-card" />
        Make Electronic Payment
      </Button>
      {state.showModal && (
        <ModalPortal>
          <Modal
            size={Modal.sizes.xlarge}
            className="electronic-payment-modal"
            header={
              <>
                <h4>
                  <i className="fa fa-lock" />
                  &nbsp;TrustCommerce Secure Payment
                </h4>
                <Button
                  data-test="modal-close"
                  onClick={closeModal}
                  className="btn-round"
                >
                  <i className="fa fa-times" />
                </Button>
              </>
            }
          >
            {state.loading && <SectionLoader />}

            {hasError ? (
              <div className="card-block">
                <h3>
                  <i className="fa fa-exclamation-circle" /> Something went
                  wrong!
                </h3>
                <p>
                  Please close this window, review payment history and try
                  payment again if needed.
                </p>
              </div>
            ) : (
              initialValues && (
                <React.Fragment>
                  <Form onSubmit={handlePayment} initialValues={initialValues}>
                    {({
                      handleSubmit,
                      hasValidationErrors,
                      invalid,
                      submitting
                    }) => (
                      <form
                        action={tokenResponse?.paymentUrl}
                        method="post"
                        onSubmit={e =>
                          e.stopPropagation() &&
                          handleSubmit(hasValidationErrors && e)
                        }
                      >
                        {isPaymentSuccessful && (
                          <h3 className="success">
                            <i className="fa fa-check-circle" /> Success
                          </h3>
                        )}
                        {isPaymentFailed && (
                          <h3 className="fail">
                            <i className="fa fa-exclamation-circle" /> Failure
                          </h3>
                        )}

                        <div className="card-block">
                          <Radio
                            dataTest="payment-type"
                            input={{
                              name: 'type',
                              value: paymentType,
                              onChange: setPaymentType
                            }}
                            meta={{}}
                            styleName="radio segmented"
                            label="Payment Type"
                            answers={[{ answer: 'Credit' }, { answer: 'ACH' }]}
                            disabled={isPaymentSuccessful}
                          />

                          <TrustCommerceHiddenFields values={initialValues} />

                          {paymentType === 'Credit' && (
                            <CreditCardFields
                              disabled={isPaymentSuccessful}
                              amountField={renderAmountField(
                                isPaymentSuccessful
                              )}
                            />
                          )}

                          {paymentType === 'ACH' && (
                            <ACHFields
                              disabled={isPaymentSuccessful}
                              amountField={renderAmountField(
                                isPaymentSuccessful
                              )}
                            />
                          )}

                          <h4>Billing Information</h4>
                          <section>
                            <div className="flex-row">
                              <Field
                                name="name"
                                validate={validation.isRequired}
                              >
                                {({ input, meta }) => (
                                  <Input
                                    input={input}
                                    meta={meta}
                                    dataTest="billing-name"
                                    label="Name"
                                    styleName="ccName"
                                    disabled={isPaymentSuccessful}
                                  />
                                )}
                              </Field>
                              <Field
                                name="address1"
                                validate={validation.isRequired}
                              >
                                {({ input, meta }) => (
                                  <Input
                                    input={input}
                                    meta={meta}
                                    dataTest="address"
                                    label="Address"
                                    styleName="ccAddress"
                                    disabled={isPaymentSuccessful}
                                  />
                                )}
                              </Field>
                            </div>
                            <div className="flex-row">
                              <Field
                                name="city"
                                validate={validation.isRequired}
                              >
                                {({ input, meta }) => (
                                  <Input
                                    input={input}
                                    meta={meta}
                                    dataTest="city"
                                    label="City"
                                    styleName="ccCity"
                                    disabled={isPaymentSuccessful}
                                  />
                                )}
                              </Field>
                              <Field
                                name="state"
                                validate={composeValidators([
                                  validation.isRequired,
                                  validation.validateState
                                ])}
                                format={format.toUppercase}
                              >
                                {({ input, meta }) => (
                                  <Input
                                    input={input}
                                    meta={meta}
                                    dataTest="state"
                                    label="State"
                                    styleName="ccState"
                                    disabled={isPaymentSuccessful}
                                  />
                                )}
                              </Field>
                              <Field
                                name="zip"
                                validate={composeValidators([
                                  validation.isRequired,
                                  validation.validateZipCode
                                ])}
                              >
                                {({ input, meta }) => (
                                  <Input
                                    input={input}
                                    meta={meta}
                                    dataTest="zip"
                                    label="Zip"
                                    styleName="ccZip"
                                    disabled={isPaymentSuccessful}
                                  />
                                )}
                              </Field>
                              <Field
                                name="email"
                                validate={composeValidators([
                                  validation.isRequired,
                                  validation.isEmail
                                ])}
                              >
                                {({ input, meta }) => (
                                  <Input
                                    input={input}
                                    meta={meta}
                                    dataTest="email"
                                    label="Email Address"
                                    styleName="ccEmail"
                                    disabled={isPaymentSuccessful}
                                  />
                                )}
                              </Field>
                            </div>
                          </section>
                          <h4>Policyholder Information</h4>
                          <section className="flex-row">
                            <CustomFields />
                          </section>
                        </div>
                        <div className="card-footer">
                          <Button
                            className={Button.constants.classNames.secondary}
                            data-test="modal-cancel"
                            onClick={closeModal}
                          >
                            CLOSE
                          </Button>
                          <Button
                            className={Button.constants.classNames.primary}
                            data-test="modal-submit"
                            type="submit"
                            disabled={
                              invalid || submitting || isPaymentSuccessful
                            }
                          >
                            SUBMIT
                          </Button>
                        </div>
                      </form>
                    )}
                  </Form>
                </React.Fragment>
              )
            )}
          </Modal>
        </ModalPortal>
      )}
    </React.Fragment>
  );
};

export default OnlinePaymentModule;
