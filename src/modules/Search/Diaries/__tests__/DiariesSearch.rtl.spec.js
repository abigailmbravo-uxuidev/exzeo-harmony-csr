import React from 'react';

import {
  renderWithForm,
  checkLabel,
  checkSelect,
  checkButton
} from '../../../../test-utils';
import { noop } from '@exzeo/core-ui';
import SearchPage from '../../index';

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
    pathName: '/diaries',
    agencies: [],
    userProfile: { profile: { given_name: 'John', family_name: 'Smith' } },
    children: [],
    errorHandler: noop
  };

  const selectFields = fields.filter(({ type }) => type === 'select');

  it('POS:Renders and has fields and labels', () => {
    const { getByTestId } = renderWithForm(<SearchPage {...props} />);

    fields.forEach(field => checkLabel(getByTestId, field));
    selectFields.forEach(({ dataTest, selected }) =>
      expect(getByTestId(dataTest).getAttribute('data-selected')).toEqual(
        selected
      )
    );
  });

  it('POS:Checks that all fields are working', () => {
    const { getByTestId } = renderWithForm(<SearchPage {...props} />);
    selectFields.forEach(field => checkSelect(getByTestId, field));
  });

  it('POS:Diary Search Button', () => {
    const { getByTestId } = renderWithForm(<SearchPage {...props} />);
    checkButton(getByTestId, {
      dataTest: 'submit',
      text: 'Search',
      type: 'submit'
    });
  });
});
