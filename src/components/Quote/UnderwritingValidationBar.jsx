import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Form, getFormValues } from 'redux-form';
import orderBy from 'lodash/orderBy';
import moment from 'moment';

import { saveUnderwritingExceptions } from '../../state/actions/service.actions';
import { getQuote } from '../../state/actions/quote.actions';
import CheckField from '../Form/inputs/CheckField';
import { UNDERWRITING_QUOTE_STATE, QUOTE_STATE_ACTIONS } from '../../constants/quoteState';

import UnderwritingExceptions from './UnderwritingExceptions';

export const handleFormSubmit = async (data, dispatch, props) => {
  const { quoteState, underwritingExceptions } = props.quoteData;
  const uwExceptions = underwritingExceptions || [];
  for (let i = 0; i < uwExceptions.length; i += 1) {
    const uwException = uwExceptions[i];
    if (uwException.canOverride && data[uwException._id] === true) {
      uwException.overridden = true;
      uwException.overriddenAt = moment.utc();
      uwException.overriddenBy = {
        userId: props.userProfile.userId,
        userName: props.userProfile.userName
      };
    } else if (uwException.canOverride) {
      uwException.overridden = false;
    }
  }
  let quoteStateVal;

  const allUwExceptionsOverridden = uwExceptions.filter(uw => uw.canOverride).every(uw => uw.overridden);
  const hasMissingInfoUwExceptions = uwExceptions.filter(uw => uw.action === QUOTE_STATE_ACTIONS.missingInfo).length;
  const hasFatalErrorUwExceptions = uwExceptions.filter(uw => uw.action === QUOTE_STATE_ACTIONS.fatalError).length;

  if (allUwExceptionsOverridden && (!hasMissingInfoUwExceptions && !hasFatalErrorUwExceptions)) {
    quoteStateVal = UNDERWRITING_QUOTE_STATE.applicationStarted;
  } else if (allUwExceptionsOverridden && !hasFatalErrorUwExceptions) {
    quoteStateVal = UNDERWRITING_QUOTE_STATE.quoteStarted;
  } else if (!allUwExceptionsOverridden) {
    quoteStateVal = UNDERWRITING_QUOTE_STATE.quoteStopped;
  } else {
    quoteStateVal = quoteState;
  }
  await props.saveUnderwritingExceptions(props.quoteData._id, uwExceptions, quoteStateVal);
  await props.getQuote(props.quoteData._id, 'underwritingValidation');
};

export const handleInitialize = (state) => {
  const values = {};
  const quoteData = state.quoteState.quote || {};

  if (!quoteData) return values;

  const underwritingExceptions = quoteData && quoteData.underwritingExceptions ? quoteData.underwritingExceptions : [];
  for (let i = 0; i < underwritingExceptions.length; i += 1) {
    const uwException = underwritingExceptions[i];
    if (uwException.canOverride) {
      values[uwException._id] = uwException.overridden;
    }
  }
  return values;
};

export const getGroupedExceptions = (quoteData = {}) => {
  const underwritingExceptions = quoteData.underwritingExceptions || [];
  return underwritingExceptions.reduce((data, exception) => {
    if (exception.action === 'Missing Info') {
      return {
        ...data,
        warnings: [...data.warnings, exception]
      };
    }
    return exception.canOverride ?
      ({ ...data, overridableExceptions: [...data.overridableExceptions, exception] }) :
      ({ ...data, nonOverridableExceptions: [...data.nonOverridableExceptions, exception] });
  }, { warnings: [], overridableExceptions: [], nonOverridableExceptions: [] });
};

export class UnderwritingValidationBar extends React.Component {
  render() {
    const {
      handleSubmit,
      quoteData,
      exceptions,
      pristine
    } = this.props;

    const { warnings, overridableExceptions, nonOverridableExceptions } = exceptions;
    const sortedOverridableExceptions = orderBy(overridableExceptions, ['overridden'], ['asc']);

  if (!quoteData) { // eslint-disable-line
      return <div />;
    }

    return (
      <Form id="UnderwritingOverride" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <aside className="underwriting-validation">
          <h4 className="uw-validation-header">Qualifier Status</h4>
          <div>

            {warnings.length > 0 &&
              <UnderwritingExceptions
                exceptionLevel="warning"
                exceptions={warnings} />
            }

            {nonOverridableExceptions.length > 0 &&
              <UnderwritingExceptions
                exceptionLevel="nonOverridable"
                exceptions={nonOverridableExceptions} />
            }

            {overridableExceptions.length > 0 &&
            <UnderwritingExceptions
              exceptionLevel="overridable"
              exceptions={sortedOverridableExceptions}
              pristine={pristine}
              render={exception => (
                <CheckField
                  label="Override"
                  name={exception._id}
                  id={exception._id} />
              )} />
            }

          </div>
        </aside>
      </Form>
    );
  }
}

UnderwritingValidationBar.propTypes = {
  completedTasks: PropTypes.any, // eslint-disable-line
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    instanceId: PropTypes.string,
    modelName: PropTypes.string,
    data: PropTypes.shape({
      quote: PropTypes.object,
      updateUnderwriting: PropTypes.bool
    })
  })
};

const defaultObject = {};
const mapStateToProps = state => ({
  userProfile: state.authState.userProfile,
  tasks: state.cg,
  appState: state.appState,
  completedTasks: state.completedTasks,
  quoteData: state.quoteState.quote || defaultObject,
  initialValues: handleInitialize(state),
  fieldValues: getFormValues('UnderwritingOverride')(state) || defaultObject,
  exceptions: getGroupedExceptions(state.quoteState.quote || defaultObject)
});

export default connect(mapStateToProps, {
  getQuote,
  saveUnderwritingExceptions
})(reduxForm({ form: 'UnderwritingOverride', enableReinitialize: true, destroyOnUnmount: false })(UnderwritingValidationBar));
