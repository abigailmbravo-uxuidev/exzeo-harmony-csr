import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, change, getFormValues } from 'redux-form';
import moment from 'moment-timezone';
import { Loader } from '@exzeo/core-ui';

import {
  startWorkflow,
  batchCompleteTask
} from '../../state/actions/cg.actions';
import { setAppState } from '../../state/actions/appState.actions';
import { getPolicy } from '../../state/actions/policy.actions';
import RadioField from '../Form/inputs/RadioField';
import DateField from '../Form/inputs/DateField';
import SelectField from '../Form/inputs/SelectField';
import TextField from '../Form/inputs/TextField';
import Footer from '../Common/Footer';

import Payments from './Payments';
import Claims from './Claims';

const convertDateToTimeZone = (date, zipCodeSettings) => {
  const formattedDateString = date.format('YYYY-MM-DD');
  return moment.tz(formattedDateString, zipCodeSettings.timezone).utc();
};
export const handleInitialize = state => {
  const zipCodeSettings = state.service.getZipcodeSettings || { timezone: '' };
  const summaryLedger = state.policyState.summaryLedger || {};
  const latestDate =
    convertDateToTimeZone(moment.utc(), zipCodeSettings) >
    convertDateToTimeZone(
      moment.utc(summaryLedger.effectiveDate),
      zipCodeSettings
    )
      ? convertDateToTimeZone(moment.utc(), zipCodeSettings).format(
          'YYYY-MM-DD'
        )
      : convertDateToTimeZone(
          moment.utc(summaryLedger.effectiveDate),
          zipCodeSettings
        ).format('YYYY-MM-DD');
  return {
    equityDate: moment.utc(summaryLedger.equityDate).format('MM/DD/YYYY'),
    effectiveDate: latestDate
  };
};

export const handleFormSubmit = (data, dispatch, props) => {
  const { policy, summaryLedger } = props;

  const submitData = {
    policyID: policy.policyID,
    policyNumber: policy.policyNumber,
    cancelDate: moment
      .tz(
        moment.utc(data.effectiveDate).format('YYYY-MM-DD'),
        props.zipCodeSettings.timezone
      )
      .utc()
      .format(),
    cancelReason: data.cancelReason,
    transactionType: `Pending ${data.cancelType}`,
    equityDate: moment
      .tz(
        moment.utc(data.equityDate).format('YYYY-MM-DD'),
        props.zipCodeSettings.timezone
      )
      .utc()
      .format(),
    billingStatus: summaryLedger.status.code
  };

  const workflowId = props.appState.instanceId;
  props.setAppState(props.appState.modelName, workflowId, {
    ...props.appState.data,
    isSubmitting: true
  });

  props
    .startWorkflow('cancelPolicyModelUI', {
      policyNumber: props.policy.policyNumber,
      policyID: props.policy.policyID
    })
    .then(result => {
      const steps = [
        {
          name: 'cancelPolicySubmit',
          data: submitData
        }
      ];
      const startResult = result.payload
        ? result.payload[0].workflowData.cancelPolicyModelUI.data
        : {};

      props.setAppState(startResult.modelName, startResult.modelInstanceId, {
        ...props.appState.data,
        isSubmitting: true
      });

      props
        .batchCompleteTask(
          startResult.modelName,
          startResult.modelInstanceId,
          steps
        )
        .then(() => {
          props.reset('CancelPolicy');
          props.setAppState(
            startResult.modelName,
            startResult.modelInstanceId,
            { ...props.appState.data, isSubmitting: false }
          );
          props.getPolicy(policy.policyNumber);
        });
    });
};

export class CancelPolicy extends React.Component {
  componentDidMount() {
    const { appState, setAppState } = this.props;
    if (appState && appState.instanceId) {
      const workflowId = appState.instanceId;
      setAppState(appState.modelName, workflowId, {
        ...appState.data,
        isSubmitting: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { policy } = this.props;
    if (
      this.props.fieldValues.cancelType !== nextProps.fieldValues.cancelType
    ) {
      const now = convertDateToTimeZone(
        moment.utc().startOf('day'),
        nextProps.zipCodeSettings
      );
      const effectiveDate = convertDateToTimeZone(
        moment.utc(nextProps.summaryLedger.effectiveDate).startOf('day'),
        nextProps.zipCodeSettings
      );
      const notice = effectiveDate.isAfter(now) ? effectiveDate : now;

      if (nextProps.fieldValues.cancelType === 'Underwriting Cancellation') {
        if (
          effectiveDate
            .clone()
            .add(90, 'days')
            .isAfter(now)
        ) {
          nextProps.dispatch(
            change(
              'CancelPolicy',
              'effectiveDate',
              notice.add(20, 'days').format('YYYY-MM-DD')
            )
          );
        } else {
          nextProps.dispatch(
            change(
              'CancelPolicy',
              'effectiveDate',
              now.add(120, 'days').format('YYYY-MM-DD')
            )
          );
        }
      } else if (
        nextProps.fieldValues.cancelType === 'Voluntary Cancellation'
      ) {
        nextProps.dispatch(
          change('CancelPolicy', 'effectiveDate', notice.format('YYYY-MM-DD'))
        );
      } else if (
        nextProps.fieldValues.cancelType === 'Underwriting Non-Renewal'
      ) {
        const endDate = convertDateToTimeZone(
          moment.utc(policy.endDate),
          nextProps.zipCodeSettings
        );
        nextProps.dispatch(
          change('CancelPolicy', 'effectiveDate', endDate.format('YYYY-MM-DD'))
        );
      }
    }
  }

  resetCancelReasons = () => {
    const { dispatch } = this.props;
    dispatch(change('CancelPolicy', 'cancelReason', ''));
  };

  cancelReasonAnswers = () => {
    const { cancelOptions, fieldValues } = this.props;

    const options =
      cancelOptions &&
      cancelOptions.find(
        option => option.cancelType === fieldValues.cancelType
      );
    return options && options.cancelReason
      ? options.cancelReason.map(reason => ({
          answer: reason,
          label: reason
        }))
      : [];
  };

  render() {
    const {
      appState,
      handleSubmit,
      fieldValues,
      cancelOptions,
      pristine,
      paymentHistory,
      paymentOptions,
      policy,
      reset
    } = this.props;

    // TODO move this to a selector, or better yet, handle this mapping in the reducer when setting the options.
    const cancelGroup = cancelOptions
      ? cancelOptions.map(option => ({
          answer: option.cancelType,
          label: option.cancelType
        }))
      : [];

    return (
      <React.Fragment>
        <form id="CancelPolicy" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="route-content">
            {(appState.data.isSubmitting || !cancelOptions.length) && (
              <Loader />
            )}
            <div className="scroll">
              <div
                className="form-group survey-wrapper cancel-policy"
                role="group"
              >
                <section>
                  <h3>Cancel Policy</h3>
                  <div className="flex-parent">
                    <div className="flex-child">
                      <RadioField
                        onChange={this.resetCancelReasons}
                        validations={['required']}
                        name="cancelType"
                        styleName=""
                        label="Cancel Type"
                        segmented
                        answers={cancelGroup}
                      />
                    </div>
                    <div className="flex-child date">
                      <DateField
                        validations={['required']}
                        label="Effective Date"
                        name="effectiveDate"
                      />
                    </div>
                  </div>
                  <div className="flex-parent">
                    <div className="flex-child">
                      <SelectField
                        name="cancelReason"
                        component="select"
                        styleName=""
                        label="Cancel Reason"
                        validations={['required']}
                        answers={this.cancelReasonAnswers()}
                      />
                      {(fieldValues.cancelType ===
                        'Underwriting Cancellation' ||
                        fieldValues.cancelType ===
                          'Underwriting Non-Renewal') && (
                        <TextField
                          label="Additional Reason"
                          name="additionalReason"
                        />
                      )}
                    </div>
                  </div>
                </section>
                {/* PAYMENTS SECTION */}
                <section>
                  <h3>Payments</h3>
                  <div className="form-group flex-parent billing">
                    <div className="flex-child">
                      <label>Bill To</label>
                      <div>
                        {!!paymentOptions.length &&
                          (
                            paymentOptions.find(
                              option => option.billToId === policy.billToId
                            ) || {}
                          ).displayText}
                      </div>
                    </div>
                    <div className="flex-child">
                      <label>Bill Plan</label>
                      <div>{policy.billPlan}</div>
                    </div>
                    <div className="flex-child date">
                      <TextField
                        disabled
                        label="Equity Date"
                        name="equityDate"
                      />
                    </div>
                  </div>
                  <Payments payments={paymentHistory} />
                </section>
                {/* CLAIMS SECTION */}
                <section>
                  <Claims />
                </section>
              </div>
            </div>
          </div>
          <div className="basic-footer btn-footer">
            <Footer />

            <div className="btn-wrapper">
              <button
                tabIndex="0"
                disabled={pristine}
                aria-label="reset-btn form-cancel"
                type="button"
                className="btn btn-secondary"
                onClick={() => reset()}
              >
                Reset
              </button>
              <button
                tabIndex="0"
                disabled={pristine}
                aria-label="reset-btn form-cancel"
                type="submit"
                className="btn btn-primary"
              >
                Cancel Policy
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

CancelPolicy.propTypes = {
  policy: PropTypes.object
};

const defaultObj = {};
const defaultArr = [];
const mapStateToProps = state => ({
  appState: state.appState,
  cancelOptions: state.policyState.cancelOptions,
  fieldValues: getFormValues('CancelPolicy')(state) || defaultObj,
  initialValues: handleInitialize(state),
  paymentHistory: state.policyState.paymentHistory,
  paymentOptions: state.policyState.billingOptions.options || defaultArr,
  policy: state.policyState.policy,
  summaryLedger: state.policyState.summaryLedger,
  userProfile: state.authState.userProfile,
  tasks: state.cg,
  zipCodeSettings: state.service.getZipcodeSettings
});

export default connect(
  mapStateToProps,
  {
    startWorkflow,
    batchCompleteTask,
    setAppState,
    getPolicy
  }
)(
  reduxForm({
    form: 'CancelPolicy',
    enableReinitialize: true
  })(CancelPolicy)
);
