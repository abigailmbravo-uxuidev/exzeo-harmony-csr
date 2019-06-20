import sinon from 'sinon';

import * as utils from './diaries';

describe('Test diaries utilities', () => {
  describe('Test sortDiariesByDate', () => {
    it('should handle an undefined gracefully', () => {
      expect(() => utils.sortDiariesByDate()).not.toThrow();
    });

    it('should handle sparse array gracefully', () => {
      const diaries = [
        undefined,
        { id: '6', entries: [{ due: '10/31/2018' }] }
      ];

      const result = utils.sortDiariesByDate(diaries);
      expect(result.length).toEqual(1);

      expect(() => utils.sortDiariesByDate(diaries)).not.toThrow();
    });

    it('should sort diaries in descending order of due date', () => {
      const diaries = [
        { id: '1', entries: [{ due: '10/31/2018' }] },
        { id: '2', entries: [{ due: '10/31/2017' }] },
        { id: '3', entries: [{ due: '6/12/2018' }] },
        { id: '4', entries: [{ due: '1/05/2019' }] }
      ];

      const result = utils.sortDiariesByDate(diaries);
      expect(result[0].id).toEqual('2');
      expect(result[1].id).toEqual('3');
      expect(result[2].id).toEqual('1');
      expect(result[3].id).toEqual('4');
    });
  });

  describe('Test due date utilities', () => {
    let clock;

    afterEach(() => {
      // restore to original state for next test
      clock.restore();
    });

    describe('Test isUpcoming due date rule', () => {
      it('should return false if date is less than 7 days away', () => {
        clock = sinon.useFakeTimers(new Date('2018-01-01'));
        const dueDate = '2018-01-04';
        const result = utils.isUpcoming(dueDate);

        expect(result).toBeFalsy();
      });

      it('should return false if date is 7 days away', () => {
        clock = sinon.useFakeTimers(new Date('2018-01-01'));
        const dueDate = '2018-01-08';
        const result = utils.isUpcoming(dueDate);

        expect(result).toBeFalsy();
      });

      it('should return true if date is more than 7 days away', () => {
        clock = sinon.useFakeTimers(new Date('2018-01-01'));
        const dueDate = '2018-01-09';
        const result = utils.isUpcoming(dueDate);

        expect(result).toBeTruthy();
      });

      it('should return false if date is in the past', () => {
        clock = sinon.useFakeTimers(new Date('2018-01-01'));
        const dueDate = '2017-12-31';
        const result = utils.isUpcoming(dueDate);

        expect(result).toBeFalsy();
      });
    });

    describe('Test isDueSoon due date rule', () => {
      it('should return true if date is less than 7 days away', () => {
        clock = sinon.useFakeTimers(new Date('2018-01-01'));
        const dueDate = '2018-01-04';
        const result = utils.isDueSoon(dueDate);

        expect(result).toBeTruthy();
      });

      it('should return true if date is 7 days away', () => {
        clock = sinon.useFakeTimers(new Date('2018-01-01'));
        const dueDate = '2018-01-08';
        const result = utils.isDueSoon(dueDate);

        expect(result).toBeTruthy();
      });

      it('should return false if date is more than 7 days away', () => {
        clock = sinon.useFakeTimers(new Date('2018-01-01'));
        const dueDate = '2018-01-09';
        const result = utils.isDueSoon(dueDate);

        expect(result).toBeFalsy();
      });

      it('should return false if date is in the past', () => {
        clock = sinon.useFakeTimers(new Date('2018-01-01'));
        const dueDate = '2017-12-31';
        const result = utils.isDueSoon(dueDate);

        expect(result).toBeFalsy();
      });
    });

    describe('Test isPastDue due date rule', () => {
      it('should return true if date is before today', () => {
        clock = sinon.useFakeTimers(new Date('2018-01-01'));
        const dueDate = '2017-12-31';
        const result = utils.isPastDue(dueDate);

        expect(result).toBeTruthy();
      });

      it('should return false if date is today', () => {
        clock = sinon.useFakeTimers(new Date('2018-01-01'));
        const dueDate = '2018-01-01';
        const result = utils.isPastDue(dueDate);

        expect(result).toBeFalsy();
      });

      it('should return false if date is after today', () => {
        clock = sinon.useFakeTimers(new Date('2018-01-01'));
        const dueDate = '2018-01-02';
        const result = utils.isPastDue(dueDate);

        expect(result).toBeFalsy();
      });
    });
  });
});
