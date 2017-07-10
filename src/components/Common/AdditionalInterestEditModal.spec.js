import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { AdditionalInterestEditModal, setMortgageeValues } from './AdditionalInterestEditModal';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing AdditionalInterestEditModal component', () => {
  it('should test connected app', () => {
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
      quoteData: {
        AdditionalInterests: [{
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
        }]
      },
      ...propTypes
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper.props().selectedAI.phoneNumber).toEqual('43543543535');
    expect(wrapper.props().selectedAI.type).toEqual('Mortgagee');
  });

  it('should test connected app with selected AI null', () => {
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
          selectedAI: null,
          showAdditionalInterestModal: false
        },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      selectedAI: null,
      fieldQuestions: [],
      dispatch: store.dispatch,
      appState: {
        data: {
          selectedAI: null,
          submitting: false
        }
      },
      quoteData: {
        AdditionalInterests: [{
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
        }]
      },
      ...propTypes
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper.props().selectedAI).toEqual(null);
  });

  it('should test setMortgageeValues', () => {
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
          selectedAI: null,
          showAdditionalInterestModal: false
        },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      selectedAI: null,
      fieldQuestions: [],
      dispatch: store.dispatch,
      appState: {
        data: {
          selectedAI: null,
          submitting: false
        }
      },
      quoteData: {
        AdditionalInterests: [{
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
        }]
      }
    };

    setMortgageeValues(1, props);

    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper.props().selectedAI).toEqual(null);
  });

  it('should test AdditionalInterestEditModal', () => {
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
      handleSubmit() {},
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
        AdditionalInterests: [{
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
        }]
      }
    };
    AdditionalInterestEditModal(props);
  });
});
