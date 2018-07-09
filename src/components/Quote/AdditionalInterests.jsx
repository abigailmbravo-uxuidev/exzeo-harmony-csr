import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, getFormValues } from 'redux-form';
import { ADDITIONAL_INTERESTS } from '../../constants/additionalInterests';
import { getAnswers } from '../../utilities/forms';
import { getMortgageeOrderAnswers } from '../../utilities/additionalInterests';
import { batchCompleteTask } from '../../state/actions/cgActions';
import { getUIQuestions } from '../../state/actions/questionsActions';
import { setAppState } from '../../state/actions/appStateActions';
import { getLatestQuote } from '../../state/actions/quoteStateActions';
import { getBillingOptions, saveBillingInfo } from '../../state/actions/serviceActions';
import { getGroupedAdditionalInterests, getSortedAdditionalInterests, checkQuoteState } from '../../state/selectors/quote.selectors';

import QuoteBaseConnect from '../../containers/Quote';
import AIModal from '../AdditionalInterestModal';
import Footer from '../Common/Footer';
import AdditionalInterestCard from '../AdditionalInterestCard';

export class AdditionalInterests extends Component {
  state = {
    addAdditionalInterestType: '',
    isEditingAI: false,
    selectedAI: {},
    showAdditionalInterestModal: false
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

  handleAISubmit = async (additionalInterests) => {
    const {
      appState, quoteData, batchCompleteTask, getLatestQuote, setAppState
    } = this.props;
    const { addAdditionalInterestType } = this.state;
    const workflowId = appState.instanceId;

    const steps = [
      {
        name: 'hasUserEnteredData',
        data: { answer: 'Yes' }
      },
      {
        name: 'askadditionalInterests',
        data: { additionalInterests }
      },
      {
        name: 'moveTo',
        data: { key: 'additionalInterests' }
      }
    ];

    await batchCompleteTask(appState.modelName, workflowId, steps);
    await getLatestQuote(true, quoteData._id);

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

    this.hideAdditionalInterestModal();
  };

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
      selectedAI: { type, mailingAddress: {} }
    });
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
      selectedAI: ai
    });
  };

  initAdditionalInterestModal = () => {
    const { questions = {}, quoteData, groupedAdditionalInterests } = this.props;
    const { isEditingAI, selectedAI, addAdditionalInterestType } = this.state;

    if (!isEditingAI) {
      const initialValues = {
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
        aiType: addAdditionalInterestType,
        type: addAdditionalInterestType
      };

      if (addAdditionalInterestType === ADDITIONAL_INTERESTS.mortgagee) {
        const mortgageeOrderAnswers = getMortgageeOrderAnswers(questions, quoteData.additionalInterests);
        return {
          ...initialValues,
          order: mortgageeOrderAnswers[0].answer
        };
      }
      return {
        ...initialValues,
        order: groupedAdditionalInterests[addAdditionalInterestType].length
      };
    }
    const mortgageeAnswers = getAnswers('mortgagee', questions);
    const mortgagee = mortgageeAnswers.find(ai => ai.AIName1 === selectedAI.name1 && ai.AIAddress1 === selectedAI.mailingAddress.address1);

    return {
      mortgagee,
        _id: selectedAI._id || '', // eslint-disable-line
      name1: selectedAI.name1 || '',
      name2: selectedAI.name2 || '',
      phoneNumber: selectedAI.phoneNumber ? String(selectedAI.phoneNumber) : '',
      address1: selectedAI.mailingAddress.address1 || '',
      address2: selectedAI.mailingAddress.address2 || '',
      city: selectedAI.mailingAddress.city || '',
      state: selectedAI.mailingAddress.state || '',
      zip: String(selectedAI.mailingAddress.zip) || '',
      referenceNumber: selectedAI.referenceNumber || '',
      type: selectedAI.type || '',
      aiType: selectedAI.type || '',
      order: selectedAI.order
    };
  };

  hideAdditionalInterestModal = () => {
    this.setState({
      addAdditionalInterestType: null,
      showAdditionalInterestModal: false,
      selectedAI: {},
      isEditingAI: false
    });
  };

  deleteAdditionalInterest = async (selectedAdditionalInterest) => {
    const {
      appState, quoteData, setAppState, batchCompleteTask, getLatestQuote
    } = this.props;
    const workflowId = appState.instanceId;
    setAppState(
      appState.modelName,
      workflowId, {
        ...appState.data,
        deleteAdditionalInterestType: selectedAdditionalInterest.type,
        showAdditionalInterestModal: appState.data.showAdditionalInterestModal
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
            selectedMortgageeOption: null
          }
        );

        // For now, hijacking appState calls with local state where we can.
        this.setState({
          isDeleting: false,
          showAdditionalInterestModal: false,
          addAdditionalInterestType: '',
          isEditingAI: false,
          selectedAI: {}
        });
      });
  };

  editAIOnEnter = (event, ai) => {
    if (event.key === 'Enter') {
      this.editAdditionalInterest(ai);
    }
  };

  render() {
    const {
      quoteData, groupedAdditionalInterests, sortedAdditionalInterests, editingDisabled
    } = this.props;
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

    return (
      <QuoteBaseConnect>
        <div className="route-content" id="AddAdditionalInterestPage">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <h3>Additional Interests</h3>
              <div className="button-group">
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => this.addAdditionalInterest('Mortgagee')}
                  disabled={groupedAdditionalInterests[ADDITIONAL_INTERESTS.mortgagee].length > 3 || editingDisabled}
                  type="button"
                > <div><i className="fa fa-plus" /><span>Mortgagee</span></div>
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => this.addAdditionalInterest('Additional Insured')}
                  disabled={(groupedAdditionalInterests[ADDITIONAL_INTERESTS.additionalInsured].length > 1) || editingDisabled}
                  type="button"
                ><div><i className="fa fa-plus" /><span>Additional Insured</span></div>
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => this.addAdditionalInterest('Additional Interest')}
                  disabled={(groupedAdditionalInterests[ADDITIONAL_INTERESTS.additionalInterest].length > 1) || editingDisabled}
                  type="button"
                ><div><i className="fa fa-plus" /><span>Additional Interest</span></div>
                </button>
                <button
                  onClick={() => this.addAdditionalInterest('Premium Finance')}
                  disabled={(groupedAdditionalInterests[ADDITIONAL_INTERESTS.premiumFinance].length > 0 || groupedAdditionalInterests[ADDITIONAL_INTERESTS.billPayer].length > 0) || editingDisabled}
                  className="btn btn-sm btn-secondary"
                  type="button"
                ><div><i className="fa fa-plus" /><span>Premium Finance</span></div>
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => this.addAdditionalInterest('Bill Payer')}
                  disabled={(groupedAdditionalInterests[ADDITIONAL_INTERESTS.billPayer].length > 0 || groupedAdditionalInterests[ADDITIONAL_INTERESTS.premiumFinance].length > 0) || editingDisabled}
                  type="button"
                ><div><i className="fa fa-plus" /><span>Billpayer</span></div>
                </button>
              </div>
              <div className="results-wrapper">
                <ul className="results result-cards">
                  {sortedAdditionalInterests.map(ai => (
                    <AdditionalInterestCard
                      key={ai._id}
                      ai={ai}
                      handleOnEnter={this.editAIOnEnter}
                      handleClick={this.editAdditionalInterest}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {showAdditionalInterestModal &&
            <AIModal
              additionalInterests={quoteData.additionalInterests}
              addAdditionalInterestType={this.state.addAdditionalInterestType}
              completeSubmit={this.handleAISubmit}
              deleteAdditionalInterest={this.deleteAdditionalInterest}
              hideModal={this.hideAdditionalInterestModal}
              initialValues={this.initAdditionalInterestModal()}
              isDeleting={this.state.isDeleting}
              isEditing={this.state.isEditingAI}
              selectedAI={this.state.selectedAI}
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
  tasks: state.cg
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
