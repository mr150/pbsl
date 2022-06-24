import {pair, fir, sec, toString} from '../src/pair';
import {assert} from 'chai';

describe('pair', () => {
	const myPair = pair(1, 2);
	const newPair = pair('str', 5);
	const nestedPair = pair('testou', myPair);

	it('get pair elements', () => {
		assert.strictEqual(fir(myPair), 1);
		assert.strictEqual(sec(myPair), 2);
		assert.strictEqual(sec(nestedPair), myPair);
	});

	it('print pair as a string', () => {
		assert.strictEqual(toString(myPair), '(1, 2)');
		assert.strictEqual(toString(newPair), '(str, 5)');
		assert.strictEqual(toString(nestedPair), '(testou, (1, 2))');
	});
});
