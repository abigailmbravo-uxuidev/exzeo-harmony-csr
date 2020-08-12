export const diaryOptions = [
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

export const assigneeOptions = [
  {
    enabled: true,
    userId: 'test_user',
    firstName: 'Test',
    lastName: 'User'
  }
];

export const searchResults = [
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
        _id: 'test-id',
        message: 'Diary entry message!',
        reason: 'information_needed',
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
        reason: 'informationNeeded',
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
      }
    ],
    createdAt: '2020-04-22T13:29:02.219Z',
    updatedAt: '2020-07-23T15:44:56.304Z',
    __v: 0
  }
];

export const transferResult = {
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
