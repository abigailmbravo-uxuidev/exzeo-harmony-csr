import { date } from '@exzeo/core-ui';

export const notesResult = [
  {
    _id: '1',
    companyCode: 'TTIC',
    createdAt: date.moment
      .utc()
      .subtract(1, 'days')
      .format(),
    createdBy: { userName: 'user1' },
    noteAttachments: [],
    noteContactType: 'System',
    noteContent: 'aa content1',
    noteType: 'Policy Note',
    number: '12-1234567-01',
    numberType: 'policyNumber',
    policyNumber: '12-1234567-01'
  },
  {
    _id: '2',
    companyCode: 'TTIC',
    createdAt: date.moment
      .utc()
      .subtract(2, 'days')
      .format(),
    createdBy: { userName: 'user2' },
    noteAttachments: [
      {
        fileType: 'Application Packet',
        fileUrl: 'http:/foo/bar/files/AppPacket-123-123.pdf'
      }
    ],
    noteContactType: 'System',
    noteContent: 'BB content2',
    noteType: 'Quote Note',
    number: '23-1234567-01',
    numberType: 'quoteNumber',
    quoteNumber: '23-1234567-01'
  },
  {
    _id: '3',
    companyCode: 'TTIC',
    createdAt: date.moment
      .utc()
      .subtract(3, 'days')
      .format(),
    createdBy: { userName: 'user3' },
    noteAttachments: [],
    noteContactType: 'Agent',
    noteContent: '<p>cc content3 inside a p tag!</p>',
    noteType: 'Policy Note',
    number: '12-2345678-02',
    numberType: 'policyNumber',
    policyNumber: '12-2345678-02'
  }
];

export const filesResult = [
  {
    createdDate: date
      .moment()
      .subtract(1, 'days')
      .unix(),
    fileName: 'AppPacket-11-1111.pdf',
    fileUrl: 'http://foo/bar/files/123/AppPacket-11-1111.pdf',
    policyNumber: '12-345-01'
  },
  {
    createdDate: date
      .moment()
      .subtract(2, 'days')
      .unix(),
    fileName: 'Invoice-11-1112.pdf',
    fileUrl: 'http://foo/bar/files/456/Invoice-11-1112.pdf',
    policyNumber: '12-345-02'
  },
  {
    createdDate: date
      .moment()
      .subtract(3, 'days')
      .unix(),
    fileName: 'FullPolicy-11-1113.pdf',
    fileUrl: 'http://foo/bar/files/789/FullPolicy-11-1113.pdf',
    policyNumber: '12-345-03'
  }
];

export const diaryOptions = {
  reasons: [
    {
      answer: 'information_needed',
      label: 'Information Needed'
    },
    {
      answer: 'estate',
      label: 'Estate'
    },
    {
      answer: 'death_of_only_NI',
      label: 'Death of Only NI'
    },
    {
      answer: 'other',
      label: 'Other'
    },
    {
      answer: 'exception',
      label: 'Exception'
    },
    {
      answer: 'new_policy',
      label: 'New Policy'
    },
    {
      answer: 'occupancy_Letter',
      label: 'Occupancy Letter'
    },
    {
      answer: 'ownership_Change',
      label: 'Ownership Change'
    },
    {
      answer: 'renewal_processing',
      label: 'Renewal Processing'
    },
    {
      answer: 'underwriting_condition_letter',
      label: 'Underwriting Condition Letter'
    },
    {
      answer: 'underwriting_review',
      label: 'Underwriting Review'
    },
    {
      answer: 'vacant_unoccupied',
      label: 'Vacant/Unoccupied'
    },
    {
      answer: 'tenant_occupied',
      label: 'Tenant Occupied'
    },
    {
      answer: 'refund',
      label: 'Refund'
    },
    {
      answer: 'verify_ownership',
      label: 'Verify Ownership'
    },
    {
      answer: 'coverage_c_rejection',
      label: 'Coverage C Rejection'
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
          .add(2, 'days')
          .format(),
        _id: '1',
        message: 'test content with history',
        reason: 'information_needed',
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
          displayName: 'TTIC CSR'
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
        reason: 'information_needed',
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
        reason: 'estate',
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
          displayName: 'Underwriting'
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
        reason: 'estate',
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
        reason: 'new_policy',
        assignee: {
          displayName: 'Processing'
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
        reason: 'new_policy',
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
        reason: 'new_policy',
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
