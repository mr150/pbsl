import { pair, Pair } from '../../src/pair';
import { l, toString, prepand, map, filter, reduce, append, List } from '../../src/list';
import {assert} from 'chai';

describe('list/lib', () => {
	const myList = l(2, 5, 6);
	const empty = l();

	it('mapping', () => {
		assert.strictEqual(
			toString(map<number>(myList, (item) => item * 10)),
			'(20, 50, 60)'
		);

		assert.equal(
			map<number>(empty, (item) => item * 10),
			l(),
		);

		assert.strictEqual(
			toString(map<number, Pair>(myList, (item, i) => pair(i, item))),
			'((0, 2), (1, 5), (2, 6))'
		);
	});

	it('filter', () => {
		assert.strictEqual(
			toString(filter<number>(myList, (item) => !(item%2))),
			'(2, 6)'
		);

		assert.strictEqual(
			toString(filter<number>(myList, (item, i) => item < i)),
			'()'
		);
	});

	it('reduce', () => {
		assert.strictEqual(
			reduce<number>(myList, (accum, item) => accum += item),
			13,
		);

		assert.strictEqual(
			toString(reduce<number, List>(myList, (accum, item, i) => prepand(accum, item + i), l())),
			'(8, 6, 2)'
		);

		assert.strictEqual(
			reduce<number, string>(l(), (accum, item) => accum += item, '0'),
			'0',
		);

		assert.strictEqual(
			reduce<number>(l(), (accum, item) => accum -= item),
			null,
		);
	});

	it('append item', () => {
		assert.strictEqual(
			toString(append(myList, 8)),
			'(2, 5, 6, 8)'
		);

		assert.strictEqual(
			toString(append(l(), 5)),
			'(5)'
		);
	});
});
