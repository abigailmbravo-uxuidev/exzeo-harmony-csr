import React from 'react';

import {
  renderWithForm,
  checkLabel,
  checkSelect,
  checkButton
} from '../../../../test-utils';
import DiariesSearch from '../DiariesSearch';
const fields = [
  {
    dataTest: 'status',
    type: 'select',
    label: 'Diary Status',
    selected: 'true',
    options: ['Open', 'Closed']
  },
  {
    dataTest: 'reason',
    type: 'select',
    label: 'Reason',
    selected: '',
    options: [
      'Please choose',
      'Information Needed',
      'Estate',
      'Death of Only NI',
      'Other',
      'Exception',
      'New Policy',
      'Occupancy Letter',
      'Ownership Change',
      'Renewal Processing',
      'Underwriting Condition Letter',
      'Underwriting Review',
      'Vacant/Unoccupied',
      'Tenant Occupied',
      'Refund'
    ]
  },
  {
    dataTest: 'assignees',
    type: 'typeahead',
    label: 'Assigned To',
    placeholderText: 'Select...'
  },
  {
    dataTest: 'date-range',
    type: 'date',
    label: 'Date Range'
  }
];

describe('Diaries Search Testing', () => {
  const props = {
    userProfile: { profile: { given_name: 'John', family_name: 'Smith' } }
  };

  const selectFields = fields.filter(({ type }) => type === 'select');

  it('POS:Renders and has fields and labels', () => {
    const { getByTestId } = renderWithForm(<DiariesSearch {...props} />);

    fields.forEach(field => checkLabel(getByTestId, field));
    selectFields.forEach(({ dataTest, selected }) =>
      expect(getByTestId(dataTest).getAttribute('data-selected')).toEqual(
        selected
      )
    );
  });

  it('POS:Checks that all fields are working', () => {
    const { getByTestId } = renderWithForm(<DiariesSearch {...props} />);
    selectFields.forEach(field => checkSelect(getByTestId, field));
  });

  it('POS:Diary Search Button', () => {
    const { getByTestId } = renderWithForm(<DiariesSearch {...props} />);
    checkButton(getByTestId, {
      dataTest: 'submit',
      text: 'Search',
      type: 'submit'
    });
  });
});

describe('Transfer Diaries Testing', () => {
  const props = {
    userProfile: { profile: { given_name: 'John', family_name: 'Smith' } }
  };

  const selectFields = fields.filter(({ type }) => type === 'select');

  it('Should toggle the transfer diaries and clear  transfer diaries', () => {
    const { getByTestId } = renderWithForm(<DiariesSearch {...props} />);
  });

  it('Should toggle validate required fields', () => {
    const { getByTestId } = renderWithForm(<DiariesSearch {...props} />);
  });

  it('Should toggle the transfer diaries and toggle select all', () => {
    const { getByTestId } = renderWithForm(<DiariesSearch {...props} />);
  });

  it('Should submit transfer diaries', () => {
    const { getByTestId } = renderWithForm(<DiariesSearch {...props} />);
  });
});
