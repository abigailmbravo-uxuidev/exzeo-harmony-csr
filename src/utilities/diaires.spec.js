import { sortDiariesByDate } from './diaries';

describe('Test search helpers', () => {
  describe('should call sortDiariesByDate', () => {

    it('should handle an undefined gracefully', () => {
      expect(() => sortDiariesByDate()).not.toThrow();
    });

    it('should handle sparse array gracefully', () => {
      const diaries = [
        undefined,
        { id: '6', entries: [{ due: '10/31/2018' }] }
      ];

      const result = sortDiariesByDate(diaries);
      expect(result.length).toEqual(1);

      expect(() => sortDiariesByDate(diaries)).not.toThrow();
    });

    it('should sort diaries in descending order of due date', () => {
      const diaries = [
        { id: '1', entries: [{ due: '10/31/2018' }] },
        { id: '2', entries: [{ due: '10/31/2017' }] },
        { id: '3', entries: [{ due: '6/12/2018' }] },
        { id: '4', entries: [{ due: '1/05/2019' }] }
      ];

      const result = sortDiariesByDate(diaries);
      expect(result[0].id).toEqual('2');
      expect(result[1].id).toEqual('3');
      expect(result[2].id).toEqual('1');
      expect(result[3].id).toEqual('4');
    });
  });
});
