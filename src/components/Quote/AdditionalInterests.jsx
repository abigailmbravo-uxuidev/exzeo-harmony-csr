import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, getFormValues } from 'redux-form';
import {ADDITIONAL_INTERESTS} from "../../constants/quote";
import { getAnswers } from '../../utilities/forms';
import { getMortgageeOrderAnswers, getMortgageeOrderAnswersForEdit } from "../../utilities/additionalInterests";
import { batchCompleteTask } from '../../state/actions/cgActions';
import { getUIQuestions } from '../../state/actions/questionsActions';
import { setAppState } from '../../state/actions/appStateActions';
import { getLatestQuote } from '../../state/actions/quoteStateActions';
import { getBillingOptions, saveBillingInfo } from '../../state/actions/serviceActions';
import { getGroupedAdditionalInterests, getSortedAdditionalInterests, checkQuoteState } from "../../state/selectors/quote.selectors";
import applyRank from '../Common/additionalInterestRank';
import normalizePhone from '../Form/normalizePhone';

import QuoteBaseConnect from '../../containers/Quote';
import AIModal from '../../components/Common/AdditionalInterestModal';
import Footer from '../Common/Footer';

export class AdditionalInterests extends Component {
  state = {
    addAdditionalInterestType: null,
    selectedAI: {},
    showAdditionalInterestModal: false,
    isEditingAI: false,
  };

  componentDidMount() {
    this.props.getUIQuestions('additionalInterestsCSR');

    if (this.props.appState.instanceId) {
      this.props.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
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

      this.props.batchCompleteTask(this.props.appState.modelName, workflowId, steps)
        .then(() => {
          this.props.getLatestQuote(true, this.props.quoteData._id);

          this.props.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
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
      nextProps.getBillingOptions(paymentOptions);
    }

    if (nextProps.billingOptions && !_.isEqual(this.props.billingOptions, nextProps.billingOptions) &&
    (nextProps.appState.data.addAdditionalInterestType === 'Bill Payer' || nextProps.appState.data.addAdditionalInterestType === 'Premium Finance')) {
      const billPayer = nextProps.billingOptions.options[0];
      nextProps.saveBillingInfo(nextProps.quoteData._id, billPayer.billToType, billPayer.billToId, 'Annual');

      // update billToType to BP
    } else if (nextProps.billingOptions && !_.isEqual(this.props.billingOptions, nextProps.billingOptions) &&
    (nextProps.appState.data.deleteAdditionalInterestType === 'Bill Payer' || nextProps.appState.data.deleteAdditionalInterestType === 'Premium Finance')) {
      // update billToType to PH
      const policyHolder = _.find(nextProps.billingOptions.options, bo => bo.billToType === 'Policyholder');
      nextProps.saveBillingInfo(nextProps.quoteData._id, policyHolder.billToType, policyHolder.billToId, 'Annual');
    }
  }

  addAdditionalInterest = (type) => {
    const { appState, setAppState, editingDisabled } = this.props;
    if (editingDisabled) return;
    setAppState(
      appState.modelName,
      appState.instanceId,
      { ...appState.data }
    );
    // For now, hijacking appState calls with local state where we can.
    this.setState({
      showAdditionalInterestModal: true,
      addAdditionalInterestType: type,
      selectedAI: {}
    })
  };

  editAIOnEnter = (event, ai) => {
    if (event.key === 'Enter') {
      this.editAdditionalInterest(ai);
    }
  };

  editAdditionalInterest = (ai) => {
    const { appState, setAppState, editingDisabled } = this.props;
    if (editingDisabled) return;
    setAppState(
      appState.modelName,
      appState.instanceId,
      { ...appState.data }
    );
    // For now, hijacking appState calls with local state where we can.
    this.setState({
      addAdditionalInterestType: ai.type,
      isEditingAI: true,
      showAdditionalInterestModal: true,
      selectedAI: ai,
    });
  };

  hideAdditionalInterestModal = () => {
    this.setState({
      addAdditionalInterestType: null,
      showAdditionalInterestModal: false,
      selectedAI: {},
      isEditingAI: false
    });
  };

  initAdditionalInterestModal = () => {
    const { questions, quoteData } = this.props;
    const { isEditingAI, selectedAI } = this.state;
    const mortgageeOrderAnswers = getMortgageeOrderAnswers(questions, quoteData.additionalInterests);

    if (!isEditingAI) return { order: mortgageeOrderAnswers && mortgageeOrderAnswers.length === 1 ? mortgageeOrderAnswers[0].answer : '' };

    if (selectedAI) {
      const mortgageeAnswers = getAnswers('mortgagee', questions);
      const mortgagee = mortgageeAnswers.find(ai => {
        return ai.AIName1 === selectedAI.name1 && ai.AIAddress1 === selectedAI.mailingAddress.address1
      });

      return {
        mortgagee,
        _id: selectedAI._id, // eslint-disable-line
        name1: selectedAI.name1,
        name2: selectedAI.name2,
        phoneNumber: String(selectedAI.phoneNumber).length > 0 ? normalizePhone(String(selectedAI.phoneNumber)) : '',
        address1: selectedAI.mailingAddress.address1,
        address2: selectedAI.mailingAddress.address2,
        city: selectedAI.mailingAddress.city,
        state: selectedAI.mailingAddress.state,
        zip: String(selectedAI.mailingAddress.zip),
        referenceNumber: selectedAI.referenceNumber,
        type: selectedAI.type,
        aiType: selectedAI.type,
        order: selectedAI.order
      };
    }

    return {
      _id: '',
      name1: '',
      name2: '',
      phoneNumber: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      referenceNumber: '',
      type: ''
    };
  };

  handleFormSubmit = async (data) => {
    const { appState, quoteData, setAppState, batchCompleteTask, getLatestQuote } = this.props;
    const { addAdditionalInterestType, selectedAI } = this.state;

    const workflowId = appState.instanceId;
    setAppState(
      appState.modelName,
      workflowId, {
        ...appState.data
      }
    );

    let additionalInterests = quoteData.additionalInterests || [];

    let { order } = data;

    const isMortgagee = addAdditionalInterestType === 'Mortgagee';
    // type mortgagee allows the user to select order and the AI edit will pass in order
    if (!isMortgagee && !data._id) {
      order = _.filter(additionalInterests, ai => ai.type === addAdditionalInterestType).length === 0 ? 0 : 1;
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
      type: addAdditionalInterestType,
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
      _.forEach(modifiedAIs.filter(ai => ai.type === 'Mortgagee'), (mortgagee) => {
        if (String(mortgagee.order) === String(data.order)) {
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

    return batchCompleteTask(appState.modelName, workflowId, steps)
      .then(() => {
        getLatestQuote(true, quoteData._id);

        additionalInterests = modifiedAIs;
        // now update the workflow details so the recalculated rate shows
        setAppState(
          appState.modelName,
          workflowId, {
            ...appState.data,
            selectedMortgageeOption: null,
            addAdditionalInterestType,
            deleteAdditionalInterestType: '',
            submittingAI: false,
            selectedLink: 'additionalInterests'
          }
        );

        this.hideAdditionalInterestModal()
      });
  };

  deleteAdditionalInterest = async (selectedAdditionalInterest) => {
    const { appState, quoteData, setAppState, batchCompleteTask, getLatestQuote } = this.props;
    const workflowId = appState.instanceId;
    setAppState(
      appState.modelName,
      workflowId, {
        ...appState.data,
        deleteAdditionalInterestType: selectedAdditionalInterest.type,
        showAdditionalInterestModal: appState.data.showAdditionalInterestModal,
      }
    );
    // For now, hijacking appState calls with local state where we can.
    this.setState({ isDeleting: true });

    let additionalInterests = quoteData.additionalInterests || [];

    // remove any existing items before submission
    const modifiedAIs = _.cloneDeep(additionalInterests);
    // remove any existing items before submission
    _.remove(modifiedAIs, ai => ai._id === selectedAdditionalInterest._id); // eslint-disable-line

    _.each(_.sortBy(_.filter(modifiedAIs, ai => ai.type === selectedAdditionalInterest.type), ['order']), (ai, index) => {
      ai.order = index;
    });

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

    return batchCompleteTask(appState.modelName, workflowId, steps)
      .then(() => {
        getLatestQuote(true, quoteData._id);

        additionalInterests = modifiedAIs;
        setAppState(
          appState.modelName,
          workflowId, {
            ...appState.data,
            selectedLink: 'additionalInterests',
            deleteAdditionalInterestType: selectedAdditionalInterest.type,
            selectedMortgageeOption: null,
          }
        );

        // For now, hijacking appState calls with local state where we can.
        this.setState({
          isDeleting: false,
          showAdditionalInterestModal: false,
          addAdditionalInterestType: ''
        })
      });
  };

  render() {
    const { quoteData, groupedAdditionalInterests, sortedAdditionalInterests, editingDisabled } = this.props;
    const { showAdditionalInterestModal } = this.state;

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
        <div className="route-content" id="AddAdditionalInterestPage">
          {/*<form>*/}
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">
                <h3>Additional Interests</h3>
                <div className="button-group">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => this.addAdditionalInterest('Mortgagee')}
                    disabled={groupedAdditionalInterests[ADDITIONAL_INTERESTS.mortgagee].length > 3 || editingDisabled}
                    type="button"> <div><i className="fa fa-plus" /><span>Mortgagee</span></div>
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => this.addAdditionalInterest('Additional Insured')}
                    disabled={(groupedAdditionalInterests[ADDITIONAL_INTERESTS.additionalInsured].length > 1) || editingDisabled}
                    type="button"><div><i className="fa fa-plus" /><span>Additional Insured</span></div>
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => this.addAdditionalInterest('Additional Interest')}
                    disabled={(groupedAdditionalInterests[ADDITIONAL_INTERESTS.additionalInterest].length > 1) || editingDisabled}
                    type="button"><div><i className="fa fa-plus" /><span>Additional Interest</span></div>
                  </button>
                  <button
                    onClick={() => this.addAdditionalInterest('Premium Finance')}
                    disabled={(groupedAdditionalInterests[ADDITIONAL_INTERESTS.premiumFinance].length > 0 || groupedAdditionalInterests[ADDITIONAL_INTERESTS.billPayer].length > 0) || editingDisabled}
                    className="btn btn-sm btn-secondary"
                    type="button"><div><i className="fa fa-plus" /><span>Premium Finance</span></div>
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => this.addAdditionalInterest('Bill Payer')}
                    disabled={(groupedAdditionalInterests[ADDITIONAL_INTERESTS.billPayer].length > 0 || groupedAdditionalInterests[ADDITIONAL_INTERESTS.premiumFinance].length > 0) || editingDisabled}
                    type="button"><div><i className="fa fa-plus" /><span>Billpayer</span></div>
                  </button>
                </div>
                <div className="results-wrapper">
                  <ul className="results result-cards">
                    {sortedAdditionalInterests.map(ai => (
                      <li key={ai._id}>
                        <a onKeyPress={this.editAIOnEnter} onClick={() => this.editAdditionalInterest(ai)}>
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
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          {/*</form>*/}

          {showAdditionalInterestModal &&          <AIModal
              additionalInterests={quoteData.additionalInterests}
              addAdditionalInterestType={this.state.addAdditionalInterestType}
              deleteAdditionalInterest={this.deleteAdditionalInterest}
              getMortgageeOrderAnswers={getMortgageeOrderAnswers}
              getMortgageeOrderAnswersForEdit={getMortgageeOrderAnswersForEdit}
              hideModal={this.hideAdditionalInterestModal}
              initialValues={this.initAdditionalInterestModal()}
              isDeleting={this.state.isDeleting}
              isEditing={this.state.isEditingAI}
              selectedAI={this.state.selectedAI}
              quoteData={quoteData}
              verify={this.handleFormSubmit}
              isPolicy={false}
            />
          }
        </div>
        <div className="basic-footer">
          <Footer />
        </div>
      </QuoteBaseConnect>
    );
  }
}

AdditionalInterests.propTypes = {
  tasks: PropTypes.shape().isRequired,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submittingAI: PropTypes.bool })
  }).isRequired
};

const defaultObj = {};
const mapStateToProps = state => ({
  appState: state.appState,
  billingOptions: state.service.billingOptions,
  editingDisabled: checkQuoteState(state),
  fieldValues: getFormValues('AdditionalInterests')(state) || defaultObj,
  questions: state.questions,
  quoteData: state.service.quote || defaultObj,
  sortedAdditionalInterests: getSortedAdditionalInterests(state),
  groupedAdditionalInterests: getGroupedAdditionalInterests(state),
  tasks: state.cg,
});

export default connect(mapStateToProps, {
  batchCompleteTask,
  getUIQuestions,
  setAppState,
  getBillingOptions,
  saveBillingInfo,
  getLatestQuote
})(reduxForm({
  form: 'AdditionalInterests',
  enableReinitialize: true
})(AdditionalInterests));
