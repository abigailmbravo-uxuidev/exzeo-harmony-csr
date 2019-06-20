import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, {
  AdditionalInterestModal,
  checkAdditionalInterestForName
} from './AdditionalInterestModal';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing AdditionalInterestModal component', () => {
  it('should test connected app', () => {
    const initialState = {
      quoteState: {
        quote: {}
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
        data: {
          addAdditionalInterestType: 'Mortgagee',
          selectedAI: {
            type: 'Mortgagee',
            phoneNumber: '43543543535',
            mailingAddress: {}
          },
          showAdditionalInterestModal: false
        },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      selectedAI: {
        type: 'Mortgagee',
        phoneNumber: '43543543535',
        mailingAddress: {}
      },
      fieldQuestions: [],
      dispatch: store.dispatch,
      appState: {
        data: {
          selectedAI: {
            type: 'Mortgagee',
            phoneNumber: '43543543535',
            mailingAddress: {}
          },
          submitting: false
        }
      },
      handleSubmit() {},
      verify() {},
      quoteData: {
        AdditionalInterests: [
          {
            id: '049a50b23c21c2ae3',
            type: 'Mortgagee',
            order: 1,
            name1: 'BB&T Home Mortgage',
            referenceNumber: '1234567',
            mailingAddress: {
              address1: '5115 Garden Vale Ave',
              city: 'Tampa',
              state: 'FL',
              county: 'Hillsborough',
              zip: '33624',
              country: {
                code: 'USA',
                displayText: 'United States of America'
              }
            },
            active: true
          }
        ]
      },
      ...propTypes
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper.props().selectedAI.phoneNumber).toEqual('43543543535');
    expect(wrapper.props().selectedAI.type).toEqual('Mortgagee');
  });

  it('should test AdditionalInterestModal', () => {
    const initialState = {
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
        data: {
          addAdditionalInterestType: 'Mortgagee',
          selectedAI: {
            type: 'Mortgagee',
            phoneNumber: '43543543535',
            mailingAddress: {}
          },
          showAdditionalInterestModal: false
        },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      completeSubmit() {},
      setAppStateAction() {},
      change() {},
      handleSubmit() {},
      verify() {},
      hideModal() {},
      validAdditionalInterestTypes: [],
      pristine: true,
      submitting: false,
      selectedAI: {
        type: 'Mortgagee',
        phoneNumber: '43543543535',
        mailingAddress: {}
      },
      fieldQuestions: [],
      dispatch: store.dispatch,
      appState: {
        data: {
          selectedAI: {
            type: 'Mortgagee',
            phoneNumber: '43543543535',
            mailingAddress: {}
          },
          submitting: false
        }
      },
      quoteData: {
        AdditionalInterests: [
          {
            id: '049a50b23c21c2ae3',
            type: 'Mortgagee',
            order: 1,
            name1: 'BB&T Home Mortgage',
            referenceNumber: '1234567',
            mailingAddress: {
              address1: '5115 Garden Vale Ave',
              city: 'Tampa',
              state: 'FL',
              county: 'Hillsborough',
              zip: '33624',
              country: {
                code: 'USA',
                displayText: 'United States of America'
              }
            },
            active: true
          }
        ]
      },
      entity: {
        AdditionalInterests: [
          {
            id: '049a50b23c21c2ae3',
            type: 'Mortgagee',
            order: 1,
            name1: 'BB&T Home Mortgage',
            referenceNumber: '1234567',
            mailingAddress: {
              address1: '5115 Garden Vale Ave',
              city: 'Tampa',
              state: 'FL',
              county: 'Hillsborough',
              zip: '33624',
              country: {
                code: 'USA',
                displayText: 'United States of America'
              }
            },
            active: true
          }
        ]
      }
    };
    const wrapper = shallow(
      <AdditionalInterestModal store={store} {...props} />
    );
    const wi = wrapper.instance();

    wi.setTopValues('1', [{ id: '1' }]);
    wi.setTopValues('');
    wi.handleFormSubmit({}, () => {}, props);
  });

  it('should test setMortgageeValues', () => {
    const initialState = {
      quoteState: { quote: {} },
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
        data: {
          selectedAI: null,
          showAdditionalInterestModal: false
        },
        modelName: 'bb'
      },
      questions: {}
    };
    const store = mockStore(initialState);
    const props = {
      initializeForm() {},
      resetForm() {},
      actions: {
        cgActions: {
          startWorkflow() {}
        },
        appStateActions: {
          setAppState() {}
        }
      },
      selectedAI: null,
      fieldQuestions: [],
      dispatch: store.dispatch,
      appState: {
        data: {
          selectedAI: null,
          submitting: false
        }
      },
      handleSubmit() {},
      verify() {},
      quoteData: {
        AdditionalInterests: [
          {
            id: '049a50b23c21c2ae3',
            type: 'Mortgagee',
            order: 1,
            name1: 'BB&T Home Mortgage',
            referenceNumber: '1234567',
            mailingAddress: {
              address1: '5115 Garden Vale Ave',
              city: 'Tampa',
              state: 'FL',
              county: 'Hillsborough',
              zip: '33624',
              country: {
                code: 'USA',
                displayText: 'United States of America'
              }
            },
            active: true
          }
        ]
      }
    };

    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper.props().selectedAI).toEqual(null);
    expect(checkAdditionalInterestForName('Bill Payer')).toEqual(true);
    expect(checkAdditionalInterestForName('Additional Interest')).toEqual(true);
    expect(checkAdditionalInterestForName('Additional Insured')).toEqual(true);
    expect(checkAdditionalInterestForName('Mortgagee')).toEqual(false);
  });
});
