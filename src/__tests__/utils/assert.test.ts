import { assert } from '../../utils/assert';

describe('utils', () => {
  describe('assert', () => {
    it('#execute', () => {
      expect(() => assert(true, 'error')).not.toThrow();
      expect(() => assert(false, 'error')).toThrow();
    });
  });
});
