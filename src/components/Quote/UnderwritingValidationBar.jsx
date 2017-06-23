import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';

export const UnderwritingValidationBar = (props) => {
  const { tasks,
     appState
   } = props;

  const taskData = (tasks && appState && tasks[appState.modelName]) ? tasks[appState.modelName].data : null;

  // combine all quote Objects from UW Exceptions into an array
  // pull the latest quote object by lastUpdated date and set it as quote data

  let getQuoteBetweenPageLoop = null;
  let underwritingExceptions = [];
  let quoteData = null;
  if (taskData) {
    getQuoteBetweenPageLoop = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' });
    quoteData = getQuoteBetweenPageLoop ? getQuoteBetweenPageLoop.value.result : null;
    underwritingExceptions = quoteData && quoteData.underwritingExceptions ? quoteData.underwritingExceptions : [];
  }

    if (!quoteData) { // eslint-disable-line
      return <div />;
    }
  return (
    <aside className="underwriting-validation">
      <h4 className="uw-validation-header">Qualifier Status</h4>
      <div>
        {underwritingExceptions && _.filter(underwritingExceptions, { canOverride: false }).length > 0 &&
          <section className="msg-error">
            <h5>
              <i className="fa fa-exclamation-circle" aria-hidden="true" />&nbsp;Error</h5>

            <div>
              <ul className="fa-ul">
                {_.filter(underwritingExceptions, { canOverride: false }).map((underwritingException, index) => (
                  <li key={index}><i className="fa-li fa fa-exclamation-circle" aria-hidden="true" />{underwritingException.internalMessage}</li>
                ))}
              </ul>
            </div>
          </section>
        }
        {underwritingExceptions && _.filter(underwritingExceptions, { canOverride: true }).length > 0 &&
          <section className="msg-caution">
            <h5>
              <i className="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;Caution</h5>
            <div>
              <ul className="fa-ul">
                {_.filter(underwritingExceptions, { canOverride: true }).map((underwritingException, index) => (
                  <li key={index}><i className="fa-li fa fa-exclamation-triangle" aria-hidden="true" />{underwritingException.internalMessage}</li>
                ))}
              </ul>
            </div>

          </section>
        }
      </div>
    </aside>
  );
};


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
  tasks: state.cg,
  appState: state.appState,
  completedTasks: state.completedTasks
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UnderwritingValidationBar);
