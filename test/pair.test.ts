import {pair, fir, sec, toString, isPair} from '../pair';
import {assert} from 'chai';

describe('pair', () => {
	const myPair = pair(1, 2);
	const newPair = pair('str', 5);
	const nestedPair = pair('testou', myPair);
	const notPair = (n: unknown): never => {throw 'error'};

	it('get pair elements', () => {
		assert.strictEqual(fir(myPair), 1);
		assert.strictEqual(sec(myPair), 2);
		assert.strictEqual(sec(nestedPair), myPair);
	});

	it('check pair type in runtime', () => {
		assert.strictEqual(isPair(myPair), true);
		assert.strictEqual(isPair(5), false);
		assert.strictEqual(isPair(notPair), false);
	});

	it('print pair as a string', () => {
		assert.strictEqual(toString(myPair), '(1, 2)');
		assert.strictEqual(toString(newPair), '(str, 5)');
		assert.strictEqual(toString(nestedPair), '(testou, (1, 2))');
	});
});
