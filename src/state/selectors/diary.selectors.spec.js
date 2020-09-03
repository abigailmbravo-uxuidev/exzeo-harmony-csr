import {
  getFormattedDiaries,
  getOpenDiaries,
  getGroupedOpenDiaries
} from './diary.selectors';

import { date } from '@exzeo/core-ui';

describe('Test diary selectors', () => {
  const baseEntry = {
    open: true,
    _id: '5b8051c91ed51f00d4d21d67',
    type: 'Additional Interest',
    due: '2018-08-24T00:00:00.000Z',
    reason: 'estate',
    message: 'rrr',
    createdAt: '2018-08-24T18:43:21.939Z',
    updatedAt: '2018-08-24T18:43:21.939Z',
    assignee: {
      userName: 'tticcsr'
    },
    createdBy: {
      userId: 'auth0|59419e3a43e76f16f68c3349',
      userName: 'tticcsr'
    }
  };

  const baseDiary = {
    _id: '5b8051c91ed51f00d4d21d66',
    entries: [baseEntry],
    createdAt: '2018-08-24T18:43:21.940Z',
    updatedAt: '2018-08-24T18:43:21.940Z',
    resource: {
      type: 'Policy',
      id: '12-1009994-01'
    }
  };

  describe('Test getFormattedDiaries', () => {
    it('should return an empty array if there are no diaries', () => {
      const state = {
        diaries: [],
        list: {
          diaryOptions: {
            reasons: [],
            tags: []
          }
        }
      };
      const result = getFormattedDiaries(state);
      expect(result).toEqual([]);
    });

    it('should return formatted diaries', () => {
      const state = {
        diaries: [baseDiary],
        list: {
          diaryOptions: {
            reasons: [
              {
                answer: 'estate',
                label: 'Estate',
                dueDate: {
                  offset: -145,
                  path: 'endDate'
                },
                assignee: 'Underwriting'
              }
            ],
            tags: [
              {
                answer: 'new_policy',
                label: 'New Policy',
                type: 'tag'
              }
            ]
          }
        }
      };
      const result = getFormattedDiaries(state);
      expect(result).toEqual([
        {
          diaryId: '5b8051c91ed51f00d4d21d66',
          open: true,
          resourceId: '12-1009994-01',
          resourceType: 'Policy',
          createdAt: '2018-08-24T18:43:21.940Z',
          _id: '5b8051c91ed51f00d4d21d67',
          due: '2018-08-24',
          message: 'rrr',
          reason: 'estate',
          reasonLabel: 'Estate',
          type: 'Additional Interest',
          updatedAt: '2018-08-24T18:43:21.939Z',
          assignee: {
            userName: 'tticcsr'
          },
          createdBy: {
            userId: 'auth0|59419e3a43e76f16f68c3349',
            userName: 'tticcsr'
          }
        }
      ]);
    });
  });

  describe('Test getOpenDiaries', () => {
    it('should return an emptyArray if there are no diaries', () => {
      const state = {
        diaries: [],
        list: {
          diaryOptions: {
            reasons: [],
            tags: []
          }
        }
      };
      const result = getOpenDiaries(state);
      expect(result).toEqual([]);
    });
  });

  describe('Test getGroupedOpenDiaries', () => {
    it('should return getOpenDiaries diaries', () => {
      const diary1 = {
        ...baseDiary,
        entries: [
          {
            ...baseEntry,
            due: date.addDate({
              unit: 'd',
              addValue: -5,
              format: ''
            })
          }
        ]
      };

      const diary2 = {
        ...baseDiary,
        entries: [
          {
            ...baseEntry,
            due: date.addDate({ unit: 'd', addValue: 5, format: '' })
          }
        ]
      };

      const diary3 = {
        ...baseDiary,
        entries: [
          {
            ...baseEntry,
            due: date.addDate({ unit: 'd', addValue: 30, format: '' })
          }
        ]
      };

      const state = {
        diaries: [diary1, diary2, diary3],
        list: {
          diaryOptions: {
            reasons: [],
            tags: []
          }
        }
      };

      const result = getGroupedOpenDiaries(state);
      expect(result.dueSoon.length).toEqual(1);
      expect(result.pastDue.length).toEqual(1);
      expect(result.upComing.length).toEqual(1);
    });
  });
});
