import { date } from '@exzeo/core-ui';

export const diaryOptions = {
  reasonOptions: [
    {
      answer: 'reason_1',
      label: 'Reason 1',
      dueDate: { offset: 1, path: 'default' }
    },
    {
      answer: 'reason_2',
      label: 'Reason 2',
      dueDate: { offset: 2, path: 'default' }
    },
    {
      answer: 'reason_3',
      label: 'Reason 3',
      dueDate: { offset: 3, path: 'default' }
    }
  ],
  assigneeOptions: [
    {
      answer: 'assignee_1',
      label: 'Assignee 1'
    },
    {
      answer: 'assignee_2',
      label: 'Assignee 2'
    },
    {
      answer: 'assignee_3',
      label: 'Assignee 3'
    }
  ]
};

export const diariesResult = [
  {
    _id: '1',
    resource: {
      type: 'Policy'
    },
    entries: [
      {
        open: true,
        due: date.moment
          .utc()
          .subtract(2, 'days')
          .format(),
        _id: '1',
        message: 'test content with history',
        reason: 'reason_1',
        createdBy: {
          userName: 'tticcsr'
        },
        createdAt: date.moment
          .utc()
          .subtract(2, 'days')
          .format(),
        updatedAt: date.moment
          .utc()
          .subtract(1, 'days')
          .format(),
        assignee: {
          id: 'assignee_1',
          displayName: 'Assignee 1'
        }
      },
      {
        open: true,
        due: date.moment
          .utc()
          .add(2, 'days')
          .format(),
        _id: '2',
        message: 'test content',
        reason: 'reason_1',
        assignee: {
          displayName: 'TTIC CSR'
        },
        createdBy: {
          userName: 'tticcsr'
        },
        createdAt: date.moment
          .utc()
          .subtract(2, 'days')
          .format(),
        updatedAt: date.moment
          .utc()
          .subtract(1, 'days')
          .format()
      }
    ],
    createdAt: date.moment
      .utc()
      .subtract(2, 'days')
      .format(),
    updatedAt: date.moment
      .utc()
      .subtract(1, 'days')
      .format()
  },
  {
    _id: '2',
    resource: {
      type: 'Policy'
    },
    entries: [
      {
        open: true,
        due: date.moment
          .utc()
          .add(5, 'days')
          .format(),
        _id: '1',
        message: 'test content 2',
        reason: 'reason_2',
        createdBy: {
          userId: 'auth0|123',
          userName: 'tticcsr'
        },
        createdAt: date.moment
          .utc()
          .subtract(1, 'days')
          .format(),
        updatedAt: date.moment
          .utc()
          .subtract(2, 'days')
          .format(),
        assignee: {
          id: 'assignee_2',
          displayName: 'Assignee 2'
        }
      },
      {
        open: true,
        due: date.moment
          .utc()
          .add(5, 'days')
          .format(),
        _id: '2',
        message: 'test content 2',
        reason: 'reason_2',
        assignee: {
          displayName: 'Underwriting'
        },
        createdBy: {
          userName: 'tticcsr'
        },
        createdAt: date.moment
          .utc()
          .subtract(1, 'days')
          .format(),
        updatedAt: date.moment
          .utc()
          .subtract(2, 'days')
          .format()
      }
    ],
    createdAt: date.moment
      .utc()
      .subtract(2, 'days')
      .format(),
    updatedAt: date.moment
      .utc()
      .subtract(2, 'days')
      .format()
  },
  {
    _id: '3',
    resource: {
      type: 'Policy'
    },
    entries: [
      {
        open: true,
        due: date.moment
          .utc()
          .add(2, 'months')
          .format(),
        _id: '1',
        message: 'Test content 3',
        reason: 'reason_3',
        assignee: {
          id: 'assignee_3',
          displayName: 'Assignee 3'
        },
        createdBy: {
          userName: 'user3'
        },
        createdAt: date.moment
          .utc()
          .subtract(1, 'days')
          .format(),
        updatedAt: date.moment
          .utc()
          .subtract(3, 'days')
          .format()
      }
    ],
    createdAt: date.moment
      .utc()
      .subtract(1, 'days')
      .format(),
    updatedAt: date.moment
      .utc()
      .subtract(3, 'days')
      .format()
  },
  {
    _id: '4',
    resource: {
      type: 'Policy'
    },
    entries: [
      {
        open: false,
        due: date.moment
          .utc()
          .add(7, 'months')
          .format(),
        _id: '1',
        message: 'test content 4 closed',
        reason: 'reason_1',
        assignee: {
          displayName: 'Processing'
        },
        createdBy: {
          userName: 'user4'
        },
        createdAt: date.moment
          .utc()
          .subtract(1, 'months')
          .format(),
        updatedAt: date.moment
          .utc()
          .subtract(1, 'months')
          .format()
      },
      {
        open: true,
        due: date.moment
          .utc()
          .add(1, 'years')
          .format(),
        _id: '2',
        message: 'test content 4',
        reason: 'reason_2',
        assignee: {
          displayName: 'Processing'
        },
        createdBy: {
          userName: 'user4'
        },
        createdAt: date.moment
          .utc()
          .subtract(1, 'months')
          .format(),
        updatedAt: date.moment
          .utc()
          .subtract(1, 'months')
          .format()
      }
    ],
    createdAt: date.moment
      .utc()
      .subtract(3, 'months')
      .format(),
    updatedAt: date.moment
      .utc()
      .subtract(1, 'months')
      .format()
  }
];
