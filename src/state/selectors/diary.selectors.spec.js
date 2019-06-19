import moment from 'moment-timezone';

import {
  getFormattedDiaries,
  getOpenDiaries,
  getGroupedOpenDiaries,
  isPollingPermitted
} from './diary.selectors';

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
      const state = { diaries: [] };
      const result = getFormattedDiaries(state);
      expect(result).toEqual([]);
    });

    it('should return formatted diaries', () => {
      const state = {
        diaries: [baseDiary]
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
          reason: 'Estate',
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
      const state = { diaries: [] };
      const result = getOpenDiaries(state);
      expect(result).toEqual([]);
    });
  });

  describe('Test getGroupedOpenDiaries', () => {
    it('should return getOpenDiaries diaries', () => {
      const diary1 = {
        ...baseDiary,
        entries: [{
          ...baseEntry,
          due: moment.utc().add(-5, 'd').format()
        }]
      };

      const diary2 = {
        ...baseDiary,
        entries: [{
          ...baseEntry,
          due: moment.utc().add(5, 'd').format()
        }]
      };

      const diary3 = {
        ...baseDiary,
        entries: [{
          ...baseEntry,
          due: moment.utc().add(30, 'd').format()
        }]
      };

      const state = {
        diaries: [diary1, diary2, diary3]
      };

      const result = getGroupedOpenDiaries(state);
      expect(result.dueSoon.length).toEqual(1);
      expect(result.pastDue.length).toEqual(1);
      expect(result.upComing.length).toEqual(1);
    });
  });

  describe('Test isPollingPermitted', () => {
    let state = {};

    beforeEach(() => {
      state = {
        authState: {
          userProfile: {
            resources: []
          }
        }
      };
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

    it('Should return true even when there are duplicate resources, but ALL THREE right are present', () => {
      state.authState.userProfile.resources = [
        { right: 'READ', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
        { right: 'INSERT', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
        { right: 'UPDATE', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
        { right: 'READ', uri: 'Diaries:DiariesService:*', conditions: [{ csp: "TTIC:FL:HO3" }] },
        { right: 'INSERT', uri: 'Diaries:DiariesService:*',  conditions: [{ csp: "TTIC:FL:HO3" }] },
        { right: 'UPDATE', uri: 'Diaries:DiariesService:*', conditions: [{ csp: "TTIC:FL:HO3" }] },
      ];

      const result = isPollingPermitted(state);
      expect(result).toBeTruthy();
    });

    it('Should return false even when there are duplicate resources, but ALL THREE rights are NOT present', () => {
      state.authState.userProfile.resources = [
        { right: 'READ', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
        { right: 'UPDATE', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
        { right: 'READ', uri: 'Diaries:DiariesService:*', conditions: [{ csp: "TTIC:FL:HO3" }] },
        { right: 'UPDATE', uri: 'Diaries:DiariesService:*', conditions: [{ csp: "TTIC:FL:HO3" }] },
      ];

      const result = isPollingPermitted(state);
      expect(result).toBeFalsy();
    });

    it('Should not throw when authState missing', () => {
      state.authState = {};
      expect(() => isPollingPermitted(state)).not.toThrow();
    });
  });
});
