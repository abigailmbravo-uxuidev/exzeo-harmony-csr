import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';
import GenerateDocsForm  from './GenerateDocsForm';

describe('Testing GenerateDocsForm component', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  let initialState;
  let store;
  let props;
  let wrapper;
  let instance;

  beforeEach(() => {
    initialState = {
      authState: {
        userProfile: {
          profile: {
            given_name: 'Test',
            family_name: "Test"
          }
        }
      },
      appState: {
        data: {
          minimize: false
        }
      }
    };

    const result = {
      result: {
        workflowData: {
          policyInvoiceGenerator: {
            data: { previousTask: { value: { result: [{ fileUrl: 'http://test.pdf', fileName: 'test.pdf' }] } } }
          }
        }
      }
    }

    props = {
      policyNumber: '123',
      errorHandler: jest.fn(),
      startWorkflow: jest.fn(() => Promise.resolve(result)),
      updateNotes: () => jest.fn()
    };

    store = mockStore(initialState);
    wrapper = shallow(<GenerateDocsForm store={store} {...props} />);
    instance = wrapper.dive().dive().dive().instance();
  });

  it('should toggle date', () => {
    instance.fieldsWithDate = ['test'];
    instance.toggleDate({}, 'test');
    expect(instance.state.showDate).toBe(true);
  });

  it('initial effectiveDate ahould be set', () => {
    expect(instance.props.initialValues.effectiveDate).toBe(moment.utc().format('YYYY-MM-DD'));
  });

  it('should test generateDoc', () => {
    const data =  { documentType: 'policyInvoice', effectiveDate: null };
    return instance.generateDoc(data, store.dispatch, instance.props)
      .then(() => {
        expect(instance.props.startWorkflow).toBeCalledWith('policyInvoiceGenerator', {documentNumber: '123'}, false);
      });
    expect(instance.props.updateNotes).toHaveBeenCalled();
  });
});
