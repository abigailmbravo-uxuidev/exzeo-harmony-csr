import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import PreviousEndorsementsComponent from './PreviousEndorsements';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing PreviousEndorsements component', () => {
  it('should test app render', () => {
    const store = mockStore();
    const props = {
      mappedEndorsementHistory: [
        {
          effectiveDate: '2017-05-05',
          netChargeFormat: '1000',
          transactionType: 'Endorsement',
          createdAt: '2017-05-05'
        }
      ]
    };
    const wrapper = shallow(
      <PreviousEndorsementsComponent store={store} {...props} />
    );
    expect(wrapper.find('h3').text()).toEqual('Previous Endorsements');
  });
});
