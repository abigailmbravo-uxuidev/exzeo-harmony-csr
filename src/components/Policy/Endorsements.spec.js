import React from 'react';
import thunk from 'redux-thunk';
import localStorage from 'localStorage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { reduxForm, propTypes, change, Form } from 'redux-form';
import { shallow, mount } from 'enzyme';
import { Endorsements, calculatePercentage, handleInitialize, setPercentageOfValue, updateDependencies, calculate, save, setCalculate, updateCalculatedSinkhole, getNewPolicyNumber } from './Endorsements';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe('Testing Endorsements component', () => {
  it('should test connected app', () => {
    const initialState = {
      service: {
        latestPolicy: {}
      },
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {},
            uiQuestions: []
          }
        }
      },
      appState: {
        data: { activateRedirect: false },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      reset() {},
      getRate: {},
      actions: {
        errorActions: { dispatchClearAppError() { } },
        serviceActions: {
          getUnderwritingQuestions() {},
          getEndorsementHistory() {},
          getBillingOptions() { },
          addTransaction() { return Promise.resolve(); },
          getRate() { return Promise.resolve({ rating: {} }); },
          getTransactionHistory() {},
          getSummaryLedger() {},
          getPaymentHistory() {},
          getPaymentOptionsApplyPayments() {}
        },
        cgActions: {
          startWorkflow() { return Promise.resolve({ payload: [{ workflowData: { endorsePolicyModelSave: { data: {} }, endorsePolicyModelCalculate: { data: {} } } }] }); },
          batchCompleteTask() { return Promise.resolve(); }
        },
        questionsActions: {
          getUIQuestions() {}
        },
        appStateActions: {
          setAppState() {}
        }
      },
      initialValues: {},
      fieldValues: {},
      policy: {
        policyNumber: '112',
        rating: {},
        property: {},
        policyHolderMailingAddress: {}
      },
      handleSubmit() {},
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          isCalculated: true,
          isSubmitting: true,
          submitting: false
        }
      }
    };

    localStorage.setItem('isNewTab', true);
    localStorage.setItem('lastSearchData', JSON.stringify({
      searchType: 'policy'
    }));

    const wrapper = shallow(<Endorsements store={store} {...props} />);
    expect(wrapper);

    calculatePercentage(100, 200);
    handleInitialize(initialState);
    setPercentageOfValue(234, 1);
    updateDependencies({ target: { value: '' } }, 'ds', 'sdf', props);
    calculate({}, props.dispatch, props);
    setCalculate(props, true);
    save({}, props.dispatch, props);
    updateCalculatedSinkhole(props);
    wrapper.instance().updateDwellingAndDependencies({}, '5000');
    props.getRate = { worksheet: {} };
    wrapper.instance().componentWillReceiveProps(props);

    wrapper.find('[name="otherStructuresNew"]').simulate('change', { target: { value: '4,540' } });
    wrapper.find('[name="personalPropertyNew"]').simulate('change', { target: { value: '4,540' } });
    wrapper.find('[name="personalLiabilityNew"]').simulate('change', { target: { value: '4,540' } });
    wrapper.find('[name="moldPropertyNew"]').simulate('change', { target: { value: '10,000' } });
    wrapper.find('[name="moldLiabilityNew"]').simulate('change', { target: { value: '50,000' } });
    wrapper.find('[name="allOtherPerilsNew"]').simulate('change', { target: { value: '1,000' } });
    wrapper.find('[name="hurricaneNew"]').simulate('change', { target: { value: '2,000' } });
    wrapper.find('[name="sinkholePerilCoverageNew"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="personalPropertyReplacementCostCoverageNew"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="ordinanceOrLawNew"]').simulate('change', { target: { value: 25 } });
    wrapper.find('[name="propertyIncidentalOccupanciesMainDwellingNew"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="propertyIncidentalOccupanciesOtherStructuresNew"]').simulate('change', { target: { value: true } });

    wrapper.find('[name="liabilityIncidentalOccupanciesNew"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="townhouseRowhouseNew"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="rentedNew"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="monthsOccupiedNew"]').simulate('change', { target: { value: '10+' } });
    wrapper.find('[name="noPriorInsuranceNew"]').simulate('change', { target: { value: 'Yes' } });
    wrapper.find('[name="burglarAlarmNew"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="fireAlarmNew"]').simulate('change', { target: { value: true } });
    wrapper.find('[name="sprinklerNew"]').simulate('change', { target: { value: 'N' } });
    wrapper.find('[name="roofCoveringNew"]').simulate('change', { target: { value: 'Other' } });

    wrapper.find('[name="roofDeckAttachmentNew"]').simulate('change', { target: { value: 'Other' } });
    wrapper.find('[name="roofToWallConnectionNew"]').simulate('change', { target: { value: 'Other' } });
    wrapper.find('[name="secondaryWaterResistanceNew"]').simulate('change', { target: { value: 'Other' } });
    wrapper.find('[name="openingProtectionNew"]').simulate('change', { target: { value: 'Other' } });
    wrapper.find('[name="electronicDeliveryNew"]').simulate('change', { target: { value: false } });
    wrapper.find('[name="floridaBuildingCodeWindSpeedNew"]').simulate('change', { target: { value: '140' } });
    wrapper.find('[name="floridaBuildingCodeWindSpeedDesignNew"]').simulate('change', { target: { value: '140' } });
    wrapper.find('[name="terrainNew"]').simulate('change', { target: { value: 'C' } });
    wrapper.find('[name="internalPressureDesignNew"]').simulate('change', { target: { value: 'Other' } });
    wrapper.find('[name="windBorneDebrisRegionNew"]').simulate('change', { target: { value: 'Other' } });
    wrapper.find('[name="yearBuiltNew"]').simulate('change', { target: { value: '1995' } });
    wrapper.find('[name="constructionTypeNew"]').simulate('change', { target: { value: 'MASONRY' } });
    wrapper.find('[name="protectionClassNew"]').simulate('change', { target: { value: '05' } });
    wrapper.find('[name="buildingCodeEffectivenessGradingNew"]').simulate('change', { target: { value: '04' } });


    wrapper.find('[name="buildingCodeEffectivenessGradingNew"]').simulate('change', { target: { value: '04' } });
    wrapper.find('[name="familyUnitsNew"]').simulate('change', { target: { value: '1-2' } });
    wrapper.find('[name="floodZoneNew"]').simulate('change', { target: { value: 'A' } });
    wrapper.find('[name="distanceToTidalWaterNew"]').simulate('change', { target: { value: '686.5' } });
    wrapper.find('[name="distanceToFireHydrantNew"]').simulate('change', { target: { value: '1000' } });
    wrapper.find('[name="distanceToFireStationNew"]').simulate('change', { target: { value: '0.4' } });
    wrapper.find('[name="residenceTypeNew"]').simulate('change', { target: { value: 'SINGLE FAMILY' } });
    wrapper.find('[name="squareFeetNew"]').simulate('change', { target: { value: '2000' } });
    wrapper.find('[name="yearOfRoofNew"]').simulate('change', { target: { value: '2000' } });

    wrapper.find('[name="pH1FirstName"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH1LastName"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH1phone"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH1secondaryPhone"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH1email"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH2FirstName"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH2LastName"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH2phone"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH2secondaryPhone"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="pH2email"]').simulate('change', { target: { value: 'ABC@gmail.com' } });
    wrapper.find('[name="address1New"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="address2New"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="cityNew"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="stateNew"]').simulate('change', { target: { value: 'FL' } });
    wrapper.find('[name="zipNew"]').simulate('change', { target: { value: '33607' } });
    wrapper.find('[name="propertyAddress1New"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="propertyAddress2New"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="propertyCityNew"]').simulate('change', { target: { value: 'ABC' } });
    wrapper.find('[name="propertyStateNew"]').simulate('change', { target: { value: 'FL' } });
    wrapper.find('[name="propertyZipNew"]').simulate('change', { target: { value: '33627' } });
    wrapper.find('[name="effectiveDateNew"]').simulate('change', { target: { value: '10/27/2017' } });
    wrapper.find('button.btn-secondary').simulate('click');
    wrapper.find('button.btn-primary').simulate('click');
    getNewPolicyNumber(initialState);
  });
});
