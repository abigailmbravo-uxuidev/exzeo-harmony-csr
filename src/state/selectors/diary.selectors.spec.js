import moment from 'moment-timezone';

import { getFormattedDiaries, getOpenDiaries, isPollingPermitted } from './diary.selectors';

describe('Test diary selectors', () => {
  describe('Test getFormattedDiaries', () => {
    it('should return an empty array if there are no diaries', () => {
      const state = { diaries: [] };
      const result = getFormattedDiaries(state);
      expect(result).toEqual([]);
    });

    it('should return formatted diaries', () => {
      const state = {
        diaries: [{
          _id: '5b8051c91ed51f00d4d21d66',
          resource: {
            type: 'Policy',
            id: '12-1009994-01'
          },
          entries: [
            {
              open: true,
              _id: '5b8051c91ed51f00d4d21d67',
              type: 'Additional Interest',
              assignee: {
                userName: 'tticcsr'
              },
              due: '2018-08-24T00:00:00.000Z',
              reason: 'Estate',
              message: 'rrr',
              createdBy: {
                userId: 'auth0|59419e3a43e76f16f68c3349',
                userName: 'tticcsr'
              },
              createdAt: '2018-08-24T18:43:21.939Z',
              updatedAt: '2018-08-24T18:43:21.939Z'
            }
          ],
          createdAt: '2018-08-24T18:43:21.940Z',
          updatedAt: '2018-08-24T18:43:21.940Z'
        }]
      };
      const result = getFormattedDiaries(state);
      expect(result).toEqual([
        {
          _id: '5b8051c91ed51f00d4d21d67',
          diaryId: '5b8051c91ed51f00d4d21d66',
          assignee: {
            userName: 'tticcsr'
          },
          createdAt: '2018-08-24T18:43:21.939Z',
          createdBy: {
            userId: 'auth0|59419e3a43e76f16f68c3349',
            userName: 'tticcsr'
          },
          due: '2018-08-24',
          message: 'rrr',
          open: true,
          reason: 'Estate',
          resourceId: '12-1009994-01',
          resourceType: 'Policy',
          type: 'Additional Interest',
          updatedAt: '2018-08-24T18:43:21.939Z'
        }
      ]);
    });
  });
  describe('Test getOpenDiaries', () => {
    it('should return an object if there are no diaries', () => {
      const state = { diaries: [] };
      const result = getOpenDiaries(state);
      expect(result).toEqual({
        upComing: [],
        pastDue: [],
        dueSoon: [],
        count: 0
      });
    });

    it('should return getOpenDiaries diaries', () => {
      const thirtyDaysAway = moment.utc().add(30, 'd').format();
      const fiveDaysAway = moment.utc().add(5, 'd').format();
      const fiveDaysAgo = moment.utc().add(-5, 'd').format();

      const state = {
        diaries: [{
          _id: '5b8051c91ed51f00d4d21d66',
          resource: {
            type: 'Policy',
            id: '12-1009994-01'
          },
          entries: [
            {
              open: true,
              _id: '5b8051c91ed51f00d4d21d67',
              type: 'Additional Interest',
              assignee: {
                userName: 'tticcsr'
              },
              due: fiveDaysAgo,
              reason: 'Estate',
              message: 'rrr',
              createdBy: {
                userId: 'auth0|59419e3a43e76f16f68c3349',
                userName: 'tticcsr'
              },
              createdAt: '2018-08-24T18:43:21.939Z',
              updatedAt: '2018-08-24T18:43:21.939Z'
            }
          ],
          createdAt: '2018-08-24T18:43:21.940Z',
          updatedAt: '2018-08-24T18:43:21.940Z'
        },
        {
          _id: '6b8051c91ed51f00d4d21d66',
          resource: {
            type: 'Policy',
            id: '12-1009994-01'
          },
          entries: [
            {
              open: true,
              _id: '6b8051c91ed51f00d4d21d67',
              type: 'Additional Interest',
              assignee: {
                userName: 'tticcsr'
              },
              due: fiveDaysAway,
              reason: 'Estate',
              message: 'rrr',
              createdBy: {
                userId: 'auth0|59419e3a43e76f16f68c3349',
                userName: 'tticcsr'
              },
              createdAt: '2018-08-24T18:43:21.939Z',
              updatedAt: '2018-08-24T18:43:21.939Z'
            }
          ],
          createdAt: '2018-08-24T18:43:21.940Z',
          updatedAt: '2018-08-24T18:43:21.940Z'
        },
        {
          _id: '7b8051c91ed51f00d4d21d66',
          resource: {
            type: 'Policy',
            id: '12-1009994-01'
          },
          entries: [
            {
              open: true,
              _id: '7b8051c91ed51f00d4d21d67',
              type: 'Additional Interest',
              assignee: {
                userName: 'tticcsr'
              },
              due: thirtyDaysAway,
              reason: 'Estate',
              message: 'rrr',
              createdBy: {
                userId: 'auth0|59419e3a43e76f16f68c3349',
                userName: 'tticcsr'
              },
              createdAt: '2018-08-24T18:43:21.939Z',
              updatedAt: '2018-08-24T18:43:21.939Z'
            }
          ],
          createdAt: '2018-08-24T18:43:21.940Z',
          updatedAt: '2018-08-24T18:43:21.940Z'
        }]
      };
      const result = getOpenDiaries(state);
      expect(result.dueSoon.length).toEqual(1);
      expect(result.pastDue.length).toEqual(1);
      expect(result.upComing.length).toEqual(1);
    });
  });
  describe('Test isPollingPermitted', () => {
    const state = {
      authState: {
        userProfile: {
          resources: []
        }
      }

    };
    it('Should not throw when authState missing', () => {
      state.authState = {};
      expect(() => isPollingPermitted(state)).not.toThrow();
    });

    it('Should return true if user has ALL THREE Diaries resources', () => {
      state.authState.userProfile.resources = [
        { right: 'READ', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
        { right: 'INSERT', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
        { right: 'UPDATE', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' }
      ];

      const result = isPollingPermitted(state);
      expect(result).toBeTruthy();
    });

    it('Should return false if user does not have ALL THREE Diaries resources', () => {
      state.authState.userProfile.resources = [
        { right: 'READ', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
        { right: 'INSERT', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' }
      ];

      const result = isPollingPermitted(state);
      expect(result).toBeFalsy();
    });
  });
});
