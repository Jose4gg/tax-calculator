import { roundToTheNearest } from '../../utils/roundToTheNearest';

describe('utils', () => {
  describe('roundToTheNearest', () => {
    it('rounds to the nearest', () => {
      expect(roundToTheNearest(0.5625, 0.05)).toEqual(0.6);
      expect(roundToTheNearest(0.5625, 1.1)).toEqual(0.55);
    });
  });
});
