import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { SearchForm, handleSearchBarSubmit, validate, handlePolicySearchSubmit, togglePolicyAdvanceSearch, changePageQuote, changePagePolicy } from './SearchBar';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing SearchBar component', () => {
  it('should test connected app', () => {
    const initialState = {
      service: {
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
      form: {
        SearchBar: {
          values: {
            searchType: 'address'
          }
        }
      },
      appState: {
        data: {
          searchType: 'address'
        },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      fieldValues: {
        searchType: 'address'
      },
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false,
          searchType: 'address'
        }
      },
      ...propTypes
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });
  it('should test handleFormSubmit', () => {
    const initialState = {
      cg: {
        bb: {
          data: {
            activeTask: {
              name: 'activeTask'
            },
            modelInstanceId: '123',
            model: {
              variables: [
                {
                  name: 'retrieveQuote',
                  value: {
                    result: {}
                  }
                }, {
                  name: 'getQuoteBeforePageLoop',
                  value: {
                    result: {}
                  }
                }]
            },
            uiQuestions: []
          }
        }
      },
      appState: {
        data: {
          showAdditionalInterestModal: false
        },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);

    const props = {
      tasks: {
        ...initialState.cg
      },
      fieldValues: {
        searchType: 'address'
      },
      fieldQuestions: [],
      dispatch: store.dispatch,
      actions: {
        searchActions: {
          setSearch() {}
        },
        appStateActions: {
          setAppState() { }
        },
        errorActions: {
          clearAppError() { }
        },
        cgActions: {
          moveToTaskAndExecuteComplete() { return Promise.resolve(() => {}); }
        }
      },
      appState: {
        modelName: 'bb',
        data: {
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

    handleSearchBarSubmit({
      firstName: '',
      lastName: '',
      address: '',
      quoteNumber: '',
      policyNumber: '',
      zip: ''
    }, store.dispatch, props);
  });

  it('should test validate', () => {
    const values = {
      zip: '*^%$',
      firstName: '*^%$',
      lastName: '$#%$#%',
      policyNumber: '%^%$^$%',
      quoteNumber: '%^$%^$%^',
      address: '/',
      agencyCode: '@12345',
      agentCode: '@1556544'
    };
    const errors = validate(values);
    expect(errors.firstName).toEqual('Invalid characters');
    expect(errors.lastName).toEqual('Invalid characters');
    expect(errors.quoteNumber).toEqual('Only numbers and dashes allowed');
    expect(errors.agencyCode).toEqual('Not a valid number');
    expect(errors.agentCode).toEqual('Not a valid number');
    expect(errors.policyNumber).toEqual('Only numbers and dashes allowed');
    expect(errors.zip).toEqual('Invalid characters');
    expect(errors.address).toEqual('Invalid characters');
  });

  it('should test policy', () => {
    const initialState = {
      cg: {
        test: {
          data: {
            activeTask: {},
            modelInstanceId: '123',
            model: {
            },
            uiQuestions: []
          }
        }
      },
      service: {
        policyResults: []
      },
      appState: {
        data: {
          showAdditionalInterestModal: false
        },
        modelName: 'test'
      }
    };
    const store = mockStore(initialState);

    const props = {
      agencyList: [],
      reset() {},
      change() {},
      search: {
        hasSearched: true
      },
      handleSubmit() {},
      tasks: {
        test: {},
        ...initialState.cg
      },
      fieldValues: {
        searchType: 'policy'
      },
      fieldQuestions: [],
      dispatch: store.dispatch,
      actions: {
        serviceActions: {
          getAgencies() {},
          clearAgencies() {},
          clearAgent() {},
          clearPolicyResults() {},
          searchPolicy() { return Promise.resolve(() => {}); }
        },
        searchActions: {
          setSearch() {}
        },
        appStateActions: {
          setAppState() { }
        },
        errorActions: {
          clearAppError() { }
        },
        cgActions: {
          clearSearchResults() {},
          moveToTaskAndExecuteComplete() { return Promise.resolve(() => {}); }
        },
        change() {},
      },
      appState: {
        modelName: 'test',
        data: {
          submitting: false
        }
      },
      policyResults: []
    };
    const wrapper2 = shallow(<SearchForm {...props} store={store} />);

    wrapper2.instance().componentWillReceiveProps({
      ...props,
      policyResults: [{
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
      }]
    });

    wrapper2.find('#searchType').simulate('change', { target: { value: 'quote' } });
    wrapper2.find('#searchType').simulate('change', { target: { value: 'policy' } });
    wrapper2.find('#searchPolicySubmit').simulate('click');
    handlePolicySearchSubmit({}, props.dispatch, props);
    togglePolicyAdvanceSearch(props);
    changePageQuote(props, true);
    changePagePolicy(props, true);
  });
});
