import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, getFormValues } from 'redux-form';

import { ADDITIONAL_INTERESTS } from '../../constants/additionalInterests';
import { getAnswers } from '../../utilities/forms';
import { getMortgageeOrderAnswers } from '../../utilities/additionalInterests';
import { getUIQuestions } from '../../state/actions/questions.actions';
import { setAppState } from '../../state/actions/appState.actions';
import { setAppError } from '../../state/actions/error.actions';
import { getQuote } from '../../state/actions/quote.actions';
import { getBillingOptions, saveBillingInfo } from '../../state/actions/service.actions';
import { getGroupedAdditionalInterests, getSortedAdditionalInterests, blockQuote } from '../../state/selectors/quote.selectors';
import AIModal from '../AdditionalInterestModal';
import Footer from '../Common/Footer';
import AdditionalInterestCard from '../AdditionalInterestCard';
import AIDeleteReinstateModal from '../AIDeleteReinstateModal';

const MODEL_NAME = 'csrAdditionalInterest';
const PAGE_NAME = 'additionalInterests';

export class AdditionalInterests extends Component {
  state = {
    addAdditionalInterestType: '',
    isEditingAI: false,
    selectedAI: {},
    showAdditionalInterestModal: false,
    showDeleteReinstateAI: false,
    deleteReinstateType: ''
  };

  componentDidMount() {
    const {
      appState,
      setAppStateAction,
      getQuoteAction,
      getUIQuestionsAction,
      match: { params: { quoteNumber } }
    } = this.props;

    getUIQuestionsAction('additionalInterestsCSR');
    getQuoteAction(quoteNumber, 'additionalInterests');
    setAppStateAction(MODEL_NAME, '', { ...appState.data, submitting: false });
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
      nextProps.getBillingOptionsAction(paymentOptions);
    }

    if (nextProps.billingOptions && !_.isEqual(this.props.billingOptions, nextProps.billingOptions) &&
    (nextProps.appState.data.addAdditionalInterestType === 'Bill Payer' || nextProps.appState.data.addAdditionalInterestType === 'Premium Finance')) {
      const billPayer = nextProps.billingOptions.options[0];
      nextProps.saveBillingInfoAction(nextProps.quoteData._id, billPayer.billToType, billPayer.billToId, 'Annual');

      // update billToType to BP
    } else if (nextProps.billingOptions && !_.isEqual(this.props.billingOptions, nextProps.billingOptions) &&
    (nextProps.appState.data.deleteAdditionalInterestType === 'Bill Payer' || nextProps.appState.data.deleteAdditionalInterestType === 'Premium Finance')) {
      // update billToType to PH
      const policyHolder = _.find(nextProps.billingOptions.options, bo => bo.billToType === 'Policyholder');
      nextProps.saveBillingInfoAction(nextProps.quoteData._id, policyHolder.billToType, policyHolder.billToId, 'Annual');
    }
  }

  onHandleAISubmit = async (additionalInterests) => {
    const {
      quoteData, setAppStateAction, appState
    } = this.props;

    const { addAdditionalInterestType } = this.state;

    await this.props.updateQuote(MODEL_NAME, {
      quoteId: quoteData._id,
      additionalInterests
    }, PAGE_NAME);
    
    this.hideAdditionalInterestModal();
    setAppStateAction(
      MODEL_NAME,
      '', {
        ...appState.data,
        selectedMortgageeOption: null,
        addAdditionalInterestType,
        deleteAdditionalInterestType: '',
        submittingAI: false,
        selectedLink: 'additionalInterests'
      }
    );
  };


  addAdditionalInterest = (type) => {
    const { editingDisabled } = this.props;
    if (editingDisabled) return;
    // For now, hijacking appState calls with local state where we can.
    this.setState({
      showAdditionalInterestModal: true,
      addAdditionalInterestType: type,
      selectedAI: { type, mailingAddress: {} }
    });
  };

  editAI = (ai) => {
    const { editingDisabled } = this.props;
    if (editingDisabled) return;
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
          order: (Array.isArray(mortgageeOrderAnswers) && mortgageeOrderAnswers.length > 0) ? mortgageeOrderAnswers[0].answer : ''
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
      isEditingAI: false,
      showDeleteReinstateAI: false
    });
  };

  toggleDeleteReinstateAIModal = (deleteReinstateType) => (selectedAI) => {
    this.setState({ showDeleteReinstateAI: !this.state.showDeleteReinstateAI, selectedAI, deleteReinstateType });
  }

  deleteAdditionalInterest = async (selectedAdditionalInterest) => {
    const {
      appState, quoteData, setAppStateAction
    } = this.props;
    setAppStateAction(
      MODEL_NAME,
      '', {
        ...appState.data,
        deleteAdditionalInterestType: selectedAdditionalInterest.type,
        showAdditionalInterestModal: appState.data.showAdditionalInterestModal
      }
    );
    // For now, hijacking appState calls with local state where we can.
    this.setState({ isDeleting: true });

    const additionalInterests = quoteData.additionalInterests || [];

    // remove any existing items before submission
    const modifiedAIs = _.cloneDeep(additionalInterests);
    // remove any existing items before submission
    _.remove(modifiedAIs, ai => ai._id === selectedAdditionalInterest._id); // eslint-disable-line

    _.each(_.sortBy(_.filter(modifiedAIs, ai => ai.type === selectedAdditionalInterest.type), ['order']), (ai, index) => {
      ai.order = index;
    });

    await this.onHandleAISubmit(modifiedAIs);

    this.setState({
      isDeleting: false,
      showAdditionalInterestModal: false,
      addAdditionalInterestType: '',
      isEditingAI: false,
      selectedAI: {}
    });
  };

  render() {
    const {
      quoteData, groupedAdditionalInterests, sortedAdditionalInterests, editingDisabled
    } = this.props;
    const { showAdditionalInterestModal } = this.state;

    if (!quoteData.rating) {
      return (
        <div className="route-content">
          <div className="scroll">
            <div className="detail-wrapper">
              <div className="messages">
                <div className="message error">
                  <i className="fa fa-exclamation-circle" aria-hidden="true" /> &nbsp;Additional Interests cannot be accessed until Premium calculated.
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="route-content" id="AddAdditionalInterestPage">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <h3>Additional Interests</h3>
              <div className="button-group" data-test="add-additional-interests">
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => this.addAdditionalInterest('Mortgagee')}
                  disabled={groupedAdditionalInterests[ADDITIONAL_INTERESTS.mortgagee].length > 2 || editingDisabled}
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
                  type="button"><div><i className="fa fa-plus" /><span>Bill Payer</span></div>
                </button>
              </div>
              <div className="results-wrapper">
                <ul className="results result-cards">
                  {sortedAdditionalInterests.map(ai => (
                    <AdditionalInterestCard
                      editingDisabled={editingDisabled}
                      key={ai._id}
                      ai={ai}
                      editAI={this.editAI}
                      toggleReactivateAIModal={this.toggleDeleteReinstateAIModal('Reactivate')}
                      toggleDeleteAIModal={this.toggleDeleteReinstateAIModal('Delete')} />
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {showAdditionalInterestModal &&
            <AIModal
              additionalInterests={quoteData.additionalInterests}
              addAdditionalInterestType={this.state.addAdditionalInterestType}
              completeSubmit={this.onHandleAISubmit}
              hideModal={this.hideAdditionalInterestModal}
              deleteAdditionalInterest={this.deleteAdditionalInterest}
              initialValues={this.initAdditionalInterestModal()}
              isDeleting={this.state.isDeleting}
              isEditing={this.state.isEditingAI}
              selectedAI={this.state.selectedAI} />
          }

          {this.state.showDeleteReinstateAI && 
          <AIDeleteReinstateModal
            actionType={this.state.deleteReinstateType}
            closeModal={this.hideAdditionalInterestModal}
            selectedAI={this.state.selectedAI}
            handleAction={() => this.deleteAdditionalInterest(this.state.selectedAI, this.props)}
          />
          }

        </div>
        <div className="basic-footer">
          <Footer />
        </div>
      </React.Fragment>
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
  editingDisabled: blockQuote(state),
  fieldValues: getFormValues('AdditionalInterests')(state) || defaultObj,
  questions: state.questions,
  quoteData: state.quoteState.quote || defaultObj,
  sortedAdditionalInterests: getSortedAdditionalInterests(state),
  groupedAdditionalInterests: getGroupedAdditionalInterests(state),
  tasks: state.cg
});

export default connect(mapStateToProps, {
  getUIQuestionsAction: getUIQuestions,
  setAppStateAction: setAppState,
  getBillingOptionsAction: getBillingOptions,
  saveBillingInfoAction: saveBillingInfo,
  getQuoteAction: getQuote,
  setAppErrorAction: setAppError
})(reduxForm({
  form: 'AdditionalInterests',
  enableReinitialize: true
})(AdditionalInterests));
