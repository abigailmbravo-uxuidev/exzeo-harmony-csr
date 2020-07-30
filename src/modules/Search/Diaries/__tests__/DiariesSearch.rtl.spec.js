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

const searchResults = {
  results: [
    {
      resource: {
        type: 'Policy',
        id: '12-1018323-01',
        companyCode: 'TTIC',
        state: 'FL',
        product: 'HO3'
      },
      _id: '5ea0469e73736000fa461a8d',
      entries: [
        {
          open: true,
          due: '2020-01-01T05:00:00.000Z',
          _id: '5ea0469e73736000fa461a8e',
          message: 'PlumbingConcernEvidenceActiveLeak',
          reason: 'underwriting_review',
          assignee: {
            id: 'auth0|5a5f765ac6e7140558a608ab',
            displayName: 'Mark Dewey',
            type: 'user'
          },
          createdBy: {
            userId: 'auth0|5b7b242f7fcc57156bdd51f0',
            userName: 'cvelazquez'
          },
          createdAt: '2020-07-23T15:44:56.304Z',
          updatedAt: '2020-07-23T15:44:56.304Z'
        },
        {
          open: true,
          due: '2020-01-01T05:00:00.000Z',
          _id: '5ea0469e73736000fa461a8e',
          message: 'PlumbingConcernEvidenceActiveLeak',
          reason: 'underwriting_review',
          assignee: {
            id: 'auth0|59562fcbc2b5082b9e61301a',
            displayName: 'Mark Eads',
            type: 'user'
          },
          createdBy: {
            userId: 'auth0|5b7b242f7fcc57156bdd51f0',
            userName: 'cvelazquez'
          },
          createdAt: '2020-07-23T15:32:15.953Z',
          updatedAt: '2020-07-23T15:32:15.953Z'
        },
        {
          open: true,
          due: '2020-01-01T05:00:00.000Z',
          _id: '5ea0469e73736000fa461a8e',
          message: 'PlumbingConcernEvidenceActiveLeak',
          reason: 'underwriting_review',
          assignee: {
            id: 'auth0|5a5f765ac6e7140558a608ab',
            displayName: 'Mark Dewey',
            type: 'user'
          },
          createdBy: {
            userId: 'auth0|5b7b242f7fcc57156bdd51f0',
            userName: 'cvelazquez'
          },
          createdAt: '2020-07-23T15:13:06.189Z',
          updatedAt: '2020-07-23T15:13:06.189Z'
        },
        {
          open: true,
          due: '2020-01-01T05:00:00.000Z',
          _id: '5ea0469e73736000fa461a8e',
          message: 'PlumbingConcernEvidenceActiveLeak',
          reason: 'underwriting_review',
          assignee: {
            id: 'auth0|59562fcbc2b5082b9e61301a',
            displayName: 'Mark Eads',
            type: 'user'
          },
          createdBy: {
            userId: 'auth0|5b7b242f7fcc57156bdd51f0',
            userName: 'cvelazquez'
          },
          createdAt: '2020-07-23T15:12:12.046Z',
          updatedAt: '2020-07-23T15:12:12.046Z'
        },
        {
          open: true,
          due: '2020-01-01T05:00:00.000Z',
          _id: '5ea0469e73736000fa461a8e',
          message: 'PlumbingConcernEvidenceActiveLeak',
          reason: 'underwriting_review',
          assignee: {
            id: 'auth0|5b8021ef80d68e4c21243acb',
            displayName: 'Alexis Boucher',
            type: 'user'
          },
          createdBy: {
            userId: 'auth0|5b7b242f7fcc57156bdd51f0',
            userName: 'cvelazquez'
          },
          createdAt: '2020-04-22T13:29:02.219Z',
          updatedAt: '2020-04-22T13:29:02.219Z'
        }
      ],
      createdAt: '2020-04-22T13:29:02.219Z',
      updatedAt: '2020-07-23T15:44:56.304Z',
      __v: 0
    }
  ],
  totalRecords: 1,
  noResults: false
};

const transferResult = {
  result: {
    ok: 1,
    writeErrors: [],
    writeConcernErrors: [],
    insertedIds: [],
    nInserted: 0,
    nUpserted: 0,
    nMatched: 1,
    nModified: 1,
    nRemoved: 0,
    upserted: [],
    lastOp: { ts: '6852699068993372185', t: 1287 }
  },
  status: 200,
  message: 'success'
};

describe('Diaries Search Testing', () => {
  searchData.fetchDiaryOptions = jestResolve(diariesOptions);
  searchData.getDiaryAssigneeOptions = jestResolve(diaryAssignees);
  searchData.searchDiaries = jestResolve({ results: [] });

  const props = {
    userProfile: {
      profile: { given_name: 'John', family_name: 'Smith' },
      resources: [
        { right: 'READ', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
        { right: 'INSERT', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
        { right: 'UPDATE', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
        { right: 'TRANSFER', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' }
      ]
    }
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
  searchData.searchDiaries = jestResolve(searchResults);
  searchData.transferDiaries = jestResolve(transferResult);

  const props = {
    userProfile: {
      profile: { given_name: 'John', family_name: 'Smith' },
      resources: [
        { right: 'READ', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
        { right: 'INSERT', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
        { right: 'UPDATE', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
        { right: 'TRANSFER', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' }
      ]
    },
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

    await wait(() => [
      expect(getByText('TRANSFER')),
      expect(getByText(/12-1018323-01/)),
      expect(getByText(/underwriting_review/)),
      expect(getByText(/PlumbingConcernEvidenceActiveLeak/))
    ]);

    fireEvent.click(getByText('TRANSFER'));

    await wait(() => [
      expect(queryAllByText('Select All').length).toBe(1),
      expect(queryAllByText('Transfer To').length).toBe(1),
      expect(queryAllByTestId('resetTransfer').length).toBe(1),
      expect(queryAllByTestId('submitTransfer').length).toBe(1)
    ]);

    const transferTo = getByTestId('transferTo_wrapper');
    await wait(() => expect(getByText(/Start typing to search.../)));

    fireEvent.keyDown(transferTo.querySelector('input:not([type="hidden"])'), {
      keyCode: 40
    });

    await wait(() => expect(getByText(/Test User/)));

    fireEvent.click(getByTestId('selectAll'));

    await wait(() => {
      expect(getByTestId('selectAll').checked).toBe(true);
    });

    fireEvent.click(getByTestId('submitTransfer'));
  });
});
