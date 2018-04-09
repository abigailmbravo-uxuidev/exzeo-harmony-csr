import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, propTypes } from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as questionsActions from '../../actions/questionsActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import * as quoteStateActions from '../../actions/quoteStateActions';
import * as serviceActions from '../../actions/serviceActions';
import AdditionalInterestPopup from '../../components/Common/AdditionalInterestModal';
import AdditionalInterestEditPopup from '../../components/Common/AdditionalInterestEditModal';
import Footer from '../Common/Footer';

export const applyRank = (additionalInterests) => {
  // add rank to sort by a specific way
  _.forEach(additionalInterests, (value) => {
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
      case 'Premium Finance':
        value.rank = 4; // eslint-disable-line
        break;
      case 'Bill Payer':
        value.rank = 5; // eslint-disable-line
        break;
      default:
        break;
    }
  });
};

const handleInitialize = () => {
  // const quoteData = handleGetQuoteData(state);
  const values = {};
  return values;
};

export const handleFormSubmit = (data, dispatch, props) => {
  const { appState, actions, quoteData } = props;

  const workflowId = appState.instanceId;
  actions.appStateActions.setAppState(
    appState.modelName,
    workflowId, {
      ...appState.data,
      submittingAI: true
    }
  );

  let additionalInterests = quoteData.additionalInterests || [];

  const type = appState.data.addAdditionalInterestType;

  let { order } = data;

  const isMortgagee = type === 'Mortgagee';
  // type mortgagee allows the user to select order and the AI edit will pass in order
  if (!isMortgagee && !data._id) {
    order = _.filter(additionalInterests, ai => ai.type === type).length === 0 ? 0 : 1;
  }
  // remove any existing items before submission
  const modifiedAIs = _.cloneDeep(additionalInterests);

    _.remove(modifiedAIs, ai => ai._id === data._id); // eslint-disable-line

  const aiData = {
      _id: data._id, // eslint-disable-line
    name1: data.name1,
    name2: data.name2,
    referenceNumber: data.referenceNumber || '',
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

  if (isMortgagee && data._id) {
    const selectedAI = props.appState.data.selectedAI;
    _.forEach(modifiedAIs.filter(ai => ai.type === 'Mortgagee'), (mortgagee) => {
      if(String(mortgagee.order) === String(data.order)){
        mortgagee.order = Number(selectedAI.order);
      }
    });
  }

  modifiedAIs.push(aiData);


  // console.log(modifiedAIs.filter(ai => ai.type === 'Mortgagee'));

  applyRank(modifiedAIs);

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
      props.actions.quoteStateActions.getLatestQuote(true, props.quoteData._id);

      additionalInterests = modifiedAIs;
      // now update the workflow details so the recalculated rate shows
      actions.appStateActions.setAppState(
        appState.modelName,
        workflowId, {
          ...appState.data,
          selectedMortgageeOption: null,
          addAdditionalInterestType: type,
          deleteAdditionalInterestType: '',
          selectedLink: 'additionalInterests',
          submittingAI: false,
          showAdditionalInterestModal: false,
          showAdditionalInterestEditModal: false
        }
      );
    });
};

const checkQuoteState = quoteData => _.some(['Policy Issued', 'Documents Received'], state => state === quoteData.quoteState);


export const addAdditionalInterest = (type, props) => {
  if (checkQuoteState(props.quoteData)) return;
  props.actions.appStateActions.setAppState(
    props.appState.modelName, props.appState.instanceId,
    { ...props.appState.data, showAdditionalInterestModal: true, addAdditionalInterestType: type }
  );
};

export const editAdditionalInterest = (ai, props) => {
  if (checkQuoteState(props.quoteData)) return;
  props.actions.appStateActions.setAppState(
    props.appState.modelName, props.appState.instanceId,
    {
      ...props.appState.data, showAdditionalInterestEditModal: true, selectedAI: ai, addAdditionalInterestType: ai.type
    }
  );
};

export const hideAdditionalInterestModal = (props) => {
  props.actions.appStateActions.setAppState(
    props.appState.modelName, props.appState.instanceId,
    { ...props.appState.data, showAdditionalInterestModal: false, showAdditionalInterestEditModal: false }
  );
};

export const deleteAdditionalInterest = (selectedAdditionalInterest, props) => {
  const { appState, actions, quoteData } = props;
  const workflowId = appState.instanceId;
  actions.appStateActions.setAppState(
    appState.modelName,
    workflowId, {
      ...props.appState.data,
      submittingAI: true,
      deleteAdditionalInterestType: selectedAdditionalInterest.type,
      showAdditionalInterestModal: appState.data.showAdditionalInterestModal,
      showAdditionalInterestEditModal: appState.data.showAdditionalInterestEditModal
    }
  );

  let additionalInterests = quoteData.additionalInterests || [];

  // remove any existing items before submission
  const modifiedAIs = _.cloneDeep(additionalInterests);
  // remove any existing items before submission
    _.remove(modifiedAIs, ai => ai._id === selectedAdditionalInterest._id); // eslint-disable-line

  if (_.filter(modifiedAIs, ai => ai.type === selectedAdditionalInterest.type).length === 1) {
    const index = _.findIndex(modifiedAIs, { type: selectedAdditionalInterest.type });
    const ai = modifiedAIs[index];
    ai.order = 0;
    modifiedAIs.splice(index, 1, ai);
  }

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
      props.actions.quoteStateActions.getLatestQuote(true, props.quoteData._id);

      additionalInterests = modifiedAIs;
      props.actions.appStateActions.setAppState(
        props.appState.modelName,
        workflowId, {
          ...props.appState.data,
          selectedLink: 'additionalInterests',
          addAdditionalInterestType: '',
          deleteAdditionalInterestType: selectedAdditionalInterest.type,
          submittingAI: false,
          selectedMortgageeOption: null,
          showAdditionalInterestModal: false,
          showAdditionalInterestEditModal: false
        }
      );
    });
};

const getAnswers = (name, questions) => _.get(_.find(questions, { name }), 'answers') || [];

export const editAIOnEnter = (event, ai, props) => {
  if (event.key === 'Enter') {
    editAdditionalInterest(ai, props);
  }
};

export class AdditionalInterests extends Component {
  componentDidMount() {
    this.props.actions.questionsActions.getUIQuestions('additionalInterestsCSR');

    if (this.props.appState.instanceId) {
      this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
        ...this.props.appState.data,
        submittingAI: true,
        submitting: true,
        selectedLink: 'additionalInterests'
      });
      const steps = [
        { name: 'hasUserEnteredData', data: { answer: 'No' } },
        { name: 'moveTo', data: { key: 'additionalInterests' } }
      ];
      const workflowId = this.props.appState.instanceId;

      this.props.actions.cgActions.batchCompleteTask(this.props.appState.modelName, workflowId, steps)
        .then(() => {

          this.props.actions.quoteStateActions.getLatestQuote(true, this.props.quoteData._id);

          this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
            ...this.props.appState.data,
            selectedLink: 'additionalInterests'
          });
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.quoteData.additionalInterests, nextProps.quoteData.additionalInterests)) {
      const paymentOptions = {
        effectiveDate: nextProps.quoteData.effectiveDate,
        policyHolders: nextProps.quoteData.policyHolders,
        additionalInterests: nextProps.quoteData.additionalInterests,
        netPremium: nextProps.quoteData.rating.netPremium,
        fees: {
          empTrustFee: nextProps.quoteData.rating.worksheet.fees.empTrustFee,
          mgaPolicyFee: nextProps.quoteData.rating.worksheet.fees.mgaPolicyFee
        },
        totalPremium: nextProps.quoteData.rating.totalPremium
      };
      nextProps.actions.serviceActions.getBillingOptions(paymentOptions);
    }

    if (nextProps.billingOptions && !_.isEqual(this.props.billingOptions, nextProps.billingOptions) &&
    nextProps.appState.data.addAdditionalInterestType === 'Bill Payer' || nextProps.appState.data.addAdditionalInterestType === 'Premium Finance') {
      const billPayer = nextProps.billingOptions.options[0];
      nextProps.actions.serviceActions.saveBillingInfo(nextProps.quoteData._id, billPayer.billToType, billPayer.billToId, 'Annual');

      // update billToType to BP
    } else if (nextProps.billingOptions && !_.isEqual(this.props.billingOptions, nextProps.billingOptions) &&
    nextProps.appState.data.deleteAdditionalInterestType === 'Bill Payer' || nextProps.appState.data.deleteAdditionalInterestType === 'Premium Finance') {
      // update billToType to PH
      const policyHolder = _.find(nextProps.billingOptions.options, bo => bo.billToType === 'Policyholder');
      nextProps.actions.serviceActions.saveBillingInfo(nextProps.quoteData._id, policyHolder.billToType, policyHolder.billToId, 'Annual');
    }
  }
  render() {
    const { appState, quoteData, questions } = this.props;
    _.forEach(getAnswers('mortgagee', questions), (answer) => {
      answer.displayText = `${answer.AIName1}, ${answer.AIAddress1}, ${answer.AICity} ${answer.AIState}, ${answer.AIZip}`;
    });
    if (!quoteData.rating) {
      return (
        <QuoteBaseConnect>
          <div className="route-content">
            <div className="messages">
              <div className="message error">
                <i className="fa fa-exclamation-circle" aria-hidden="true" /> &nbsp;Additional Interests cannot be accessed until Premium calculated.
              </div>
            </div>
          </div>
        </QuoteBaseConnect>
      );
    }

    applyRank(quoteData.additionalInterests);
    return (
      <QuoteBaseConnect>
        <div className="route-content">
          <form id="AddAdditionalInterestPage">
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">
                <h3>Additional Interests</h3>
                <div className="button-group">
                  <button disabled={(quoteData && _.filter(quoteData.additionalInterests, ai => ai.type === 'Mortgagee').length > 2) || checkQuoteState(quoteData)} onClick={() => addAdditionalInterest('Mortgagee', this.props)} className="btn btn-sm btn-secondary" type="button"> <div><i className="fa fa-plus" /><span>Mortgagee</span></div></button>
                  <button disabled={(quoteData && _.filter(quoteData.additionalInterests, ai => ai.type === 'Additional Insured').length > 1) || checkQuoteState(quoteData)} onClick={() => addAdditionalInterest('Additional Insured', this.props)} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Additional Insured</span></div></button>
                  <button disabled={(quoteData && _.filter(quoteData.additionalInterests, ai => ai.type === 'Additional Interest').length > 1) || checkQuoteState(quoteData)} onClick={() => addAdditionalInterest('Additional Interest', this.props)} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Additional Interest</span></div></button>
                  <button disabled={quoteData && _.filter(quoteData.additionalInterests, ai => ai.type === 'Premium Finance').length > 0 ||  _.filter(quoteData.additionalInterests, ai => ai.type === 'Bill Payer').length > 0 || checkQuoteState(quoteData)} onClick={() => addAdditionalInterest('Premium Finance', this.props)} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Premium Finance</span></div></button>
                  <button disabled={(quoteData && _.filter(quoteData.additionalInterests, ai => ai.type === 'Bill Payer').length > 0 || _.filter(quoteData.additionalInterests, ai => ai.type === 'Premium Finance').length > 0) || checkQuoteState(quoteData)} onClick={() => addAdditionalInterest('Bill Payer', this.props)} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Billpayer</span></div></button>
                </div>
                <div className="results-wrapper">
                  <ul className="results result-cards">
                    {quoteData && quoteData.additionalInterests && _.sortBy(quoteData.additionalInterests, ['rank', 'order']).map((ai, index) =>
                      (
                        <li key={index}>
                          <a onKeyPress={event => editAIOnEnter(event, ai, this.props)} onClick={() => editAdditionalInterest(ai, this.props)}>
                            {/* add className based on type - i.e. mortgagee could have class of mortgagee */}
                            <div className="card-icon"><i className={`fa fa-circle ${ai.type}`} /><label>{ai.type} {ai.order + 1}</label></div>
                            <section><h4>{ai.name1}&nbsp;{ai.name2}</h4><p className="address">{`${ai.mailingAddress.address1}, ${ai.mailingAddress.address2 ? `${ai.mailingAddress.address2},` : ''} ${ai.mailingAddress.city}, ${ai.mailingAddress.state} ${ai.mailingAddress.zip}`}</p></section>
                            <div className="ref-number">
                              <label htmlFor="ref-number">Reference Number</label>
                              <span>{`${ai.referenceNumber || '-'}`}</span>
                            </div>
                            <span className="edit-btn">
                              <i className="fa fa-pencil-square" />
                              <span>EDIT</span>
                            </span>
                          </a>
                        </li>))}
                  </ul>
                </div>
              </div>
            </div>
          </form>
          { appState.data.showAdditionalInterestEditModal && <AdditionalInterestEditPopup additionalInterests={this.props.quoteData.additionalInterests} questions={this.props.questions} selectedAI={this.props.appState.data.selectedAI} quoteData={quoteData} verify={handleFormSubmit} hideAdditionalInterestModal={() => hideAdditionalInterestModal(this.props)} deleteAdditionalInterest={() => deleteAdditionalInterest(this.props.appState.data.selectedAI, this.props)} /> }
          { appState.data.showAdditionalInterestModal && <AdditionalInterestPopup additionalInterests={this.props.quoteData.additionalInterests} questions={this.props.questions} quoteData={quoteData} verify={handleFormSubmit} hideAdditionalInterestModal={() => hideAdditionalInterestModal(this.props)} /> }
        </div>
        <div className="basic-footer">
          <Footer />
        </div>
      </QuoteBaseConnect>
    );
  }
}
// ------------------------------------------------
// Property type definitions
// ------------------------------------------------
AdditionalInterests.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape().isRequired,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submittingAI: PropTypes.bool })
  }).isRequired
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
  tasks: state.cg,
  questions: state.questions,
  appState: state.appState,
  fieldValues: _.get(state.form, 'AdditionalLinterests.values', {}),
  initialValues: handleInitialize(state),
  showAdditionalInterestModal: state.appState.data.showAdditionalInterestModal,
  quoteData: state.service.quote || {},
  billingOptions: state.service.billingOptions
});

const mapDispatchToProps = dispatch => ({
  actions: {
    questionsActions: bindActionCreators(questionsActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    quoteStateActions: bindActionCreators(quoteStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'AdditionalInterests', enableReinitialize: true })(AdditionalInterests));
