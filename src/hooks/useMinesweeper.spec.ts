import { plus } from './useMinesweeper';
import { expect, test } from 'vitest';

test('plus', () => {
	expect(plus(1, 1)).toBe(2);
});
