import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, propTypes, change } from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import AdditionalInterestModal from '../../components/Common/AdditionalInterestModal';

const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = _.find(taskData.model.variables, { name: 'updateQuoteWithAdditionalInterests' }) ?
  _.find(taskData.model.variables, { name: 'updateQuoteWithAdditionalInterests' }).value.result :
  _.find(taskData.model.variables, { name: 'getQuote' }).value.result;
  return quoteData;
};

const handleInitialize = () => {
  // const quoteData = handleGetQuoteData(state);
  const values = {};
  return values;
};

export class AdditionalLinterests extends Component {

  state = {
    sameAsProperty: false
  }

  componentDidMount() {
    const workflowId = this.props.appState.instanceId;
    const taskName = 'moveTo';
    const taskData = { key: 'additionalInterests' };
    this.props.actions.cgActions.completeTask(this.props.appState.modelName, workflowId, taskName, taskData);

    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
      quote: this.props.quoteData,
      updateWorkflowDetails: true,
      hideYoChildren: false
    });
  }

  fillMailForm = () => {
    const { appState, dispatch } = this.props;
    const taskData = this.props.tasks[appState.modelName].data;
    const quoteData = _.find(taskData.model.variables, { name: 'getQuote' }) ? _.find(taskData.model.variables, { name: 'getQuote' }).value.result : {};

    if (!this.state.sameAsProperty) {
      dispatch(change('AdditionalLinterests', 'address1', _.get(quoteData, 'property.physicalAddress.address1')));
      dispatch(change('AdditionalLinterests', 'address2', _.get(quoteData, 'property.physicalAddress.address2')));
      dispatch(change('AdditionalLinterests', 'city', _.get(quoteData, 'property.physicalAddress.city')));
      dispatch(change('AdditionalLinterests', 'state', _.get(quoteData, 'property.physicalAddress.state')));
      dispatch(change('AdditionalLinterests', 'zip', _.get(quoteData, 'property.physicalAddress.zip')));
    } else {
      dispatch(change('AdditionalLinterests', 'address1', ''));
      dispatch(change('AdditionalLinterests', 'address2', ''));
      dispatch(change('AdditionalLinterests', 'city', ''));
      dispatch(change('AdditionalLinterests', 'state', ''));
      dispatch(change('AdditionalLinterests', 'zip', ''));
    }
    this.setState({ sameAsProperty: !this.state.sameAsProperty });
  };

  handleFormSubmit = (data) => {
    const { appState, actions, quoteData } = this.props;

    const workflowId = appState.instanceId;
    const additionalInterests = quoteData.additionalInterests || [];

    const type = appState.data.addAdditionalInterestType;

    const order = _.filter(additionalInterests, ai => ai.type === type).length === 0 ? 0 : 1;

    additionalInterests.push({
      name1: data.name1,
      name2: data.name2,
      referenceNumber: data.referenceNumber,
      order,
      active: true,
      type,
      mailingAddress: {
        address1: data.adress1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: {
          code: 'USA',
          displayText: 'United States of America'
        }
      }
    });

    // TODO I need to take the form data then push to the additional interest array in the quote then submit the array as data

    // TODO Clear out old form data

    const steps = [{
      name: 'askadditionalInterests',
      data: { additionalInterests }
    },
    {
      name: 'moveTo',
      data: { key: 'additionalInterests' }
    }
    ];

    actions.cgActions.batchCompleteTask(appState.modelName, workflowId, steps)
      .then(() => {
        // now update the workflow details so the recalculated rate shows
        actions.appStateActions.setAppState(appState.modelName,
          workflowId, { updateWorkflowDetails: true });
        // this.context.router.history.push('/quote/coverage');
      });
  };

  addAdditionalInterest = (type) => {
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId,
      { showAdditionalInterestModal: true, addAdditionalInterestType: type });
  }

  hideAdditionalInterestModal = () => {
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId,
      { showAdditionalInterestModal: false });
  }

  render() {
    const { appState, handleSubmit, quoteData } = this.props;

    return (
      <QuoteBaseConnect>
        <ClearErrorConnect />

        <div className="route-content">
          <form id="AddAdditionalInterestPage">
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">
                <h2>Additional Interests</h2>
                <div className="button-group">
                  <button disabled={quoteData && _.filter(quoteData.dditionalInterests, ai => ai.type === 'Mortgagee').length > 1} onClick={() => this.addAdditionalInterest('Mortgagee')} className="btn btn-sm btn-secondary" type="button"> <div><i className="fa fa-plus" /><span>Mortgagee</span></div></button>
                  <button disabled={quoteData && _.filter(quoteData.dditionalInterests, ai => ai.type === 'Lienholder').length > 1} onClick={() => this.addAdditionalInterest('Lienholder')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Lienholder</span></div></button>
                  <button disabled={quoteData && _.filter(quoteData.dditionalInterests, ai => ai.type === 'Additional Insured').length > 1} onClick={() => this.addAdditionalInterest('Additional Insured')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Additional Insured</span></div></button>
                  <button disabled={quoteData && _.filter(quoteData.dditionalInterests, ai => ai.type === 'Additional Interest').length > 1} onClick={() => this.addAdditionalInterest('Additional Interest')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Additional Interest</span></div></button>
                  <button disabled={quoteData && _.filter(quoteData.dditionalInterests, ai => ai.type === 'Billpayer').length > 0} onClick={() => this.addAdditionalInterest('Billpayer')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Billpayer</span></div></button>
                </div>


                <div className="results-wrapper">
                  <ul className="results result-cards">
                    {quoteData && quoteData.additionalInterests && quoteData.additionalInterests.map((ai, index) =>
                      <li key={index}>
                        <a>
                          {/* add className based on type - i.e. mortgagee could have class of mortgagee*/}
                          <div className="card-icon"><i className={`fa fa-circle ${ai.type}`} /><label>{ai.type} {ai.order + 1}</label></div>
                          <section><h4>{ai.name1}</h4><p>{ai.name2}</p><p className="address">{ai.mailingAddress.address1},
                            {ai.mailingAddress.address2}
                            {ai.mailingAddress.city}, {ai.mailingAddress.state} {ai.mailingAddress.zip}</p></section>
                          <i className="fa fa-pencil" />
                        </a>
                      </li>
                    )}
                  </ul>
                </div>


                <div className="btn-footer">
                  {/* <button className="btn btn-secondary" form="AddAdditionalInterestPage">Cancel</button>
                  <button className="btn btn-primary" type="submit" form="AddAdditionalInterestPage">Update</button> */}
                </div>
              </div>
            </div>
          </form>
          { appState.data.showAdditionalInterestModal && <AdditionalInterestModal verify={this.handleFormSubmit} hideAdditionalInterestModal={this.hideAdditionalInterestModal} /> }
        </div>

      </QuoteBaseConnect>
    );
  }

}
AdditionalLinterests.contextTypes = {
  router: PropTypes.object
};
// ------------------------------------------------
// Property type definitions
// ------------------------------------------------
AdditionalLinterests.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submitting: PropTypes.boolean })
  })
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'AdditionalLinterests.values', {}),
  initialValues: handleInitialize(state),
  showAdditionalInterestModal: state.appState.data.showAdditionalInterestModal,
  quoteData: handleGetQuoteData(state)
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'AdditionalLinterests' })(AdditionalLinterests));
