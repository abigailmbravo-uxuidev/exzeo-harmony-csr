import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp from './ConfirmPopup';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing ShareConfirmationModal component', () => {
  it('should test connected app', () => {
    const initialState = {
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      fieldQuestions: [],
      setBackStep() {},
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      },
      ...propTypes
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper.instance().props.store).toEqual(store);

    wrapper.instance().componentWillReceiveProps({});

    expect(wrapper.instance().state.hidden).toEqual(false);

    wrapper.instance().handleConfirm();

    expect(wrapper.instance().state.hidden).toEqual(true);

    wrapper.instance().componentWillReceiveProps({});

    expect(wrapper.instance().state.hidden).toEqual(false);

    wrapper.instance().handleCancel();
    expect(wrapper.instance().state.hidden).toEqual(true);
  });
});
