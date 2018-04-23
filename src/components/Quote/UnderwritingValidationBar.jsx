import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, change } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';
import * as quoteStateActions from '../../actions/quoteStateActions';
import CheckField from '../Form/inputs/CheckField';
import UnderwritingExceptions from './UnderwritingExceptions';

export const handleFormSubmit = (data, dispatch, props) => {
  const uwExceptions = props.quoteData.underwritingExceptions || [];
  for (let i = 0; i < uwExceptions.length; i += 1) {
    const uwException = uwExceptions[i];
    if (uwException.canOverride && data[uwException._id] === true) {
      uwException.overridden = true;
      uwException.overriddenAt = moment.utc();
      uwException.overriddenBy = { userId: props.userProfile.userId, userName: props.userProfile.userName };
    } else if (uwException.canOverride) {
      uwException.overridden = false;
    }
  }
  props.actions.serviceActions.saveUnderwritingExceptions(props.quoteData._id, uwExceptions).then(() => {
    props.actions.quoteStateActions.getLatestQuote(true, props.quoteData._id);
  });
};

export const handleInitialize = (state) => {
  const values = {};
  const quoteData = state.service.quote || {};

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
        warnings: [...data.warnings, exception],
      };
    }
    return exception.canOverride ?
      ({ ...data, overridableExceptions: [ ...data.overridableExceptions, exception ] }) :
      ({ ...data, nonOverridableExceptions: [ ...data.nonOverridableExceptions, exception ]});
  }, { warnings: [], overridableExceptions: [], nonOverridableExceptions: [] });
};

export class UnderwritingValidationBar extends React.Component {
  componentWillReceiveProps(nextProps) {
    nextProps.exceptions && nextProps.exceptions.overridableExceptions.forEach((uw) => {
      if (!nextProps.fieldValues[uw._id]) {
        nextProps.dispatch(change('UnderwritingOverride', uw._id, uw.overridden));
      }
    });
  }
  render() {
    const {
      handleSubmit,
      pristine,
      quoteData,
      exceptions,
    } = this.props;

  const { warnings, overridableExceptions, nonOverridableExceptions } = exceptions;

  if (!quoteData) { // eslint-disable-line
      return <div />;
    }

    if (overridableExceptions.length > 0) {
      overridableExceptions.forEach((uw) => {
        if (_.find(uw.fields, { name: 'rating.netPremium' }) && _.find(uw.fields, { name: 'rating.netPremium' }).value === 'null') {
          uw.canOverride = false;
        }
      });
    }

    return (
      <Form id="UnderwritingOverride" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <aside className="underwriting-validation">
          <h4 className="uw-validation-header">Qualifier Status</h4>
          <div>

            {warnings.length > 0 &&
              <UnderwritingExceptions exceptionLevel="warning" exceptions={warnings} />
            }

            {nonOverridableExceptions.length > 0 &&
              <UnderwritingExceptions exceptionLevel="nonOverridable" exceptions={nonOverridableExceptions} />
            }

            {overridableExceptions.length > 0 &&
            <section className="msg-caution">
              <h5>
                <i className="fa fa-exclamation-triangle" aria-hidden="true" /><span>Caution</span>{ overridableExceptions.length > 0 && !pristine && <button tabIndex="0" className="btn btn-sm btn-primary" type="submit">Save</button>}
              </h5>
              <div>
                <ul className="fa-ul">
                  {_.orderBy(overridableExceptions, ['overridden'], ['asc']).map((underwritingException, index) => (
                    <li className={underwritingException.overridden ? 'overridden' : ''} key={index}>
                      <i className="fa-li fa fa-exclamation-triangle" aria-hidden="true" />
                      <span>{underwritingException.internalMessage}</span>
                      <CheckField
                        label="Override"
                        name={underwritingException._id}
                        id={underwritingException._id}
                      />
                    </li>
                ))}
                </ul>
              </div>
            </section>
            }
          </div>
        </aside>
      </Form>
    );
  }
}

UnderwritingValidationBar.propTypes = {
  completedTasks: PropTypes.any, // eslint-disable-line
  actions: PropTypes.shape(),
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    instanceId: PropTypes.string,
    modelName: PropTypes.string,
    data: PropTypes.shape({
      quote: PropTypes.object,
      updateUnderwriting: PropTypes.boolean
    })
  })
};

const mapStateToProps = state => ({
  userProfile: state.authState.userProfile,
  tasks: state.cg,
  appState: state.appState,
  completedTasks: state.completedTasks,
  quoteData: state.service.quote || {},
  initialValues: handleInitialize(state),
  fieldValues: _.get(state.form, 'UnderwritingOverride.values', {}),
  exceptions: getGroupedExceptions(state.service.quote || {}),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: {
    quoteStateActions: bindActionCreators(quoteStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});
// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'UnderwritingOverride', enableReinitialize: true })(UnderwritingValidationBar));
