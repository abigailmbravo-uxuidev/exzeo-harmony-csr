import React from 'react';

import {
  renderWithForm,
  checkLabel,
  checkSelect,
  checkButton,
  jestResolve
} from '../../../../test-utils';
import DiariesSearch from '../DiariesSearch';
import { fireEvent, wait } from '@testing-library/react';
import * as searchData from '../../data';
import { noop } from '@exzeo/core-ui';
import { searchDiaries } from '../../data';

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

const diariesOptions = [
  {
    tags: [{ answer: 'new_policy', label: 'New Policy', type: 'tag' }],
    reasons: [
      {
        answer: 'information_needed',
        label: 'Information Needed',
        dueDate: {
          offset: 7,
          path: 'default'
        },
        assignee: 'CURRENT_USER'
      }
    ]
  }
];

const diaryAssignees = [
  {
    answer: 'test_user',
    label: 'Test User',
    type: 'user'
  }
];

describe('Diaries Search Testing', () => {
  searchData.fetchDiaryOptions = jestResolve(diariesOptions);
  searchData.getDiaryAssigneeOptions = jestResolve(diaryAssignees);
  searchData.searchDiaries = jestResolve({ results: [] });

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
  searchData.fetchDiaryOptions = jestResolve(diariesOptions);
  searchData.getDiaryAssigneeOptions = jestResolve(diaryAssignees);

  const props = {
    userProfile: { profile: { given_name: 'John', family_name: 'Smith' } },
    errorHandler: noop
  };

  it('Should toggle the transfer diaries section', async () => {
    const {
      getByTestId,
      getByText,
      queryAllByText,
      queryAllByTestId
    } = renderWithForm(<DiariesSearch {...props} />);

    await wait(() => [
      expect(getByText('TRANSFER')),
      expect(queryAllByText('Select All').length).toBe(0),
      expect(queryAllByText('Transfer To').length).toBe(0),
      expect(queryAllByTestId('resetTransfer').length).toBe(0),
      expect(queryAllByTestId('submitTransfer').length).toBe(0)
    ]);

    fireEvent.click(getByText('TRANSFER'));

    await wait(() => [
      expect(queryAllByText('Select All').length).toBe(1),
      expect(queryAllByText('Transfer To').length).toBe(1),
      expect(queryAllByTestId('resetTransfer').length).toBe(1),
      expect(queryAllByTestId('submitTransfer').length).toBe(1)
    ]);

    fireEvent.click(getByTestId('resetTransfer'));

    await wait(() => [
      expect(queryAllByText('Select All').length).toBe(0),
      expect(queryAllByText('Transfer To').length).toBe(0),
      expect(queryAllByTestId('resetTransfer').length).toBe(0),
      expect(queryAllByTestId('submitTransfer').length).toBe(0)
    ]);
  });

  it('Should submit transfer diaries: select all', async () => {
    const {
      getByTestId,
      getByText,
      queryAllByText,
      queryAllByTestId
    } = renderWithForm(<DiariesSearch {...props} />);

    await wait(() => [expect(getByText('TRANSFER'))]);

    fireEvent.click(getByText('TRANSFER'));

    await wait(() => [
      expect(queryAllByText('Select All').length).toBe(1),
      expect(queryAllByText('Transfer To').length).toBe(1),
      expect(queryAllByTestId('resetTransfer').length).toBe(1),
      expect(queryAllByTestId('submitTransfer').length).toBe(1)
    ]);

    fireEvent.click(getByTestId('selectAll'));

    await wait(() => {
      expect(getByTestId('selectAll').checked).toBe(true);
    });
  });
});
