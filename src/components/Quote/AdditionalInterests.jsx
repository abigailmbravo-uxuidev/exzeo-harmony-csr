import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, propTypes, change } from 'redux-form';
import { toastr } from 'react-redux-toastr';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import AdditionalInterestModal from '../../components/Common/AdditionalInterestModal';
import AdditionalInterestEditModal from '../../components/Common/AdditionalInterestEditModal';

const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }) ?
  _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result : {};

  // add rank to sort by a specific way
  _.forEach(quoteData.additionalInterests, (value) => {
    switch (value.type) {
      case 'Mortgagee':
        value.rank = 1; // eslint-disable-line
        break;
      case 'Additional Insured':
        value.rank = 2; // eslint-disable-line
        break;
      case 'Additional Interest':
        value.rank = 3; // eslint-disable-line
        break;
      case 'Lienholder':
        value.rank = 4; // eslint-disable-line
        break;
      case 'Bill Payer':
        value.rank = 5; // eslint-disable-line
        break;
      default:
        break;
    }
  });

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

  handleFormSubmit = (data) => {
    const { appState, actions, quoteData } = this.props;


    const workflowId = appState.instanceId;
    actions.appStateActions.setAppState(appState.modelName,
      workflowId, {
        ...appState.data,
        submitting: true
      });

    let additionalInterests = quoteData.additionalInterests || [];

    const type = appState.data.addAdditionalInterestType || data.type;

    let order = 0;

    if (String(data.order) !== '0' && String(data.order) !== '1') {
      order = _.filter(additionalInterests, ai => ai.type === type).length === 0 ? 0 : 1;
    } else {
      order = data.order;
    }


    // remove any existing items before submission
    const modifiedAIs = _.cloneDeep(additionalInterests);

    _.remove(modifiedAIs, ai => ai._id === data._id); // eslint-disable-line

    const aiData = {
      _id: data._id, // eslint-disable-line
      name1: data.name1,
      name2: data.name2,
      referenceNumber: data.referenceNumber,
      order,
      active: true,
      type,
      phoneNumber: String(data.phoneNumber).length > 0 ? String(data.phoneNumber).replace(/[^\d]/g, '') : '',
      mailingAddress: {
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: {
          code: 'USA',
          displayText: 'United States of America'
        }
      }
    };

    modifiedAIs.push(aiData);

    // TODO I need to take the form data then push to the additional interest array in the quote then submit the array as data

    // TODO Clear out old form data

    const steps = [
      {
        name: 'hasUserEnteredData',
        data: { answer: 'Yes' }
      },
      {
        name: 'askadditionalInterests',
        data: { additionalInterests: modifiedAIs }
      },
      {
        name: 'moveTo',
        data: { key: 'additionalInterests' }
      }
    ];

    actions.cgActions.batchCompleteTask(appState.modelName, workflowId, steps)
      .then(() => {
        toastr.success('Quote Saved', `Quote: ${this.props.quoteData.quoteNumber} has been saved successfully`);

        additionalInterests = modifiedAIs;

        // now update the workflow details so the recalculated rate shows
        actions.appStateActions.setAppState(appState.modelName,
          workflowId, { ...appState.data,
            updateWorkflowDetails: true,
            showAdditionalInterestModal: false,
            showAdditionalInterestEditModal: false });
        // this.context.router.history.push('/quote/coverage');
      });
  };

  addAdditionalInterest = (type) => {
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId,
      { ...this.props.appState.data, showAdditionalInterestModal: true, addAdditionalInterestType: type });
  }

  editAdditionalInterest = (ai) => {
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId,
      { ...this.props.appState.data, showAdditionalInterestEditModal: true, selectedAI: ai });
  }

  hideAdditionalInterestModal = () => {
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId,
      { ...this.props.appState.data, showAdditionalInterestModal: false, showAdditionalInterestEditModal: false });
  }

  deleteAdditionalInterest = (selectedAdditionalInterest) => {
    const { appState, actions, quoteData } = this.props;
    const workflowId = appState.instanceId;
    actions.appStateActions.setAppState(appState.modelName,
      workflowId, {
        ...this.props.appState.data,
        submitting: true,
        showAdditionalInterestModal: appState.data.showAdditionalInterestModal,
        showAdditionalInterestEditModal: appState.data.showAdditionalInterestEditModal
      });

    let additionalInterests = quoteData.additionalInterests || [];

        // remove any existing items before submission
    const modifiedAIs = _.cloneDeep(additionalInterests);
    // remove any existing items before submission
    _.remove(modifiedAIs, ai => ai._id === selectedAdditionalInterest._id); // eslint-disable-line

    const steps = [{
      name: 'hasUserEnteredData',
      data: { answer: 'Yes' }
    },
    {
      name: 'askadditionalInterests',
      data: { additionalInterests: modifiedAIs }
    },
    {
      name: 'moveTo',
      data: { key: 'additionalInterests' }
    }
    ];

    actions.cgActions.batchCompleteTask(appState.modelName, workflowId, steps)
      .then(() => {
        additionalInterests = modifiedAIs;

        toastr.success('Quote Saved', `Quote: ${this.props.quoteData.quoteNumber} has been saved successfully`);
        // now update the workflow details so the recalculated rate shows
        actions.appStateActions.setAppState(appState.modelName,
          workflowId, { updateWorkflowDetails: true });
        // this.context.router.history.push('/quote/coverage');
      });
  }

  render() {
    const { appState, quoteData } = this.props;

    return (
      <QuoteBaseConnect>
        <ClearErrorConnect />

        <div className="route-content">
          <form id="AddAdditionalInterestPage">
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">
                <h4>Additional Interests</h4>
                <div className="button-group">
                  <button disabled={quoteData && _.filter(quoteData.additionalInterests, ai => ai.type === 'Mortgagee').length > 1} onClick={() => this.addAdditionalInterest('Mortgagee')} className="btn btn-sm btn-secondary" type="button"> <div><i className="fa fa-plus" /><span>Mortgagee</span></div></button>
                  <button disabled={quoteData && _.filter(quoteData.additionalInterests, ai => ai.type === 'Additional Insured').length > 1} onClick={() => this.addAdditionalInterest('Additional Insured')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Additional Insured</span></div></button>
                  <button disabled={quoteData && _.filter(quoteData.additionalInterests, ai => ai.type === 'Additional Interest').length > 1} onClick={() => this.addAdditionalInterest('Additional Interest')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Additional Interest</span></div></button>
                  <button disabled={quoteData && _.filter(quoteData.additionalInterests, ai => ai.type === 'Lienholder').length > 1} onClick={() => this.addAdditionalInterest('Lienholder')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Lienholder</span></div></button>
                  <button disabled={quoteData && _.filter(quoteData.additionalInterests, ai => ai.type === 'Bill Payer').length > 0} onClick={() => this.addAdditionalInterest('Bill Payer')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Billpayer</span></div></button>
                </div>


                <div className="results-wrapper">
                  <ul className="results result-cards">
                    {quoteData && quoteData.additionalInterests && _.sortBy(quoteData.additionalInterests, ['rank', 'type']).map((ai, index) =>
                      <li key={index}>
                        <a onClick={() => this.editAdditionalInterest(ai)}>
                          {/* add className based on type - i.e. mortgagee could have class of mortgagee*/}
                          <div className="card-icon"><i className={`fa fa-circle ${ai.type}`} /><label>{ai.type} {ai.order + 1}</label></div>
                          <section><h4>{ai.name1}&nbsp;{ai.name2}</h4><p className="address">{`${ai.mailingAddress.address1}, ${ai.mailingAddress.address2 ? `${ai.mailingAddress.address2},` : ''} ${ai.mailingAddress.city}, ${ai.mailingAddress.state} ${ai.mailingAddress.zip}`}</p></section>
                          <div className="ref-number">
                            <label htmlFor="ref-number">Reference Number</label>
                            <span>{`${ai.referenceNumber || '-'}`}</span>
                          </div>
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
          { appState.data.showAdditionalInterestEditModal && <AdditionalInterestEditModal verify={this.handleFormSubmit} hideAdditionalInterestModal={this.hideAdditionalInterestModal} deleteAdditionalInterest={this.deleteAdditionalInterest} /> }
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
