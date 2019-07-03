import React from 'react';
import { reduxForm } from 'redux-form';

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
    search: { results: [], totalPages: 0, currentPage: 1 },
    submitting: false,
    assigneeAnswers: [],
    userProfile: { userId: '1234' }
  };

  const SearchForm = reduxForm({
    form: 'SEARCH_BAR',
    initialValues: {
      open: true,
      dateRange: { min: '', max: '' },
      assignees: []
    }
  })(DiariesSearch);

  const selectFields = fields.filter(({ type }) => type === 'select');

  it('POS:Renders and has fields and labels', () => {
    const { getByTestId } = renderWithForm(<SearchForm {...props} />);

    fields.forEach(field => checkLabel(getByTestId, field));
    selectFields.forEach(({ dataTest, selected }) =>
      expect(getByTestId(dataTest).getAttribute('data-selected')).toEqual(
        selected
      )
    );
  });

  it('POS:Checks that all fields are working', () => {
    const { getByTestId } = renderWithForm(<SearchForm {...props} />);
    selectFields.forEach(field => checkSelect(getByTestId, field));
  });

  it('POS:Diary Search Button', () => {
    const { getByTestId } = renderWithForm(<SearchForm {...props} />);
    checkButton(getByTestId, {
      dataTest: 'submit',
      text: 'Search',
      type: 'submit'
    });
  });
});
