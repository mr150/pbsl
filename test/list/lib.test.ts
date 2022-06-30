import { pair, Pair } from '../../src/pair';
import { l, toString, prepand } from '../../src/list/core';
import { List } from '../../src/list/types';
import { map, filter, reduce, append, findIndex, find, index, nth, length, setNth, join } from '../../src/list/lib';
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

	it('find item index', () => {
		assert.strictEqual(
			findIndex<number>(myList, (item) => item === 5),
			1
		);

		assert.strictEqual(
			findIndex<number>(l(), (item) => item === 5),
			null
		);

		assert.strictEqual(
			findIndex<number>(myList, (item, i) => item < i),
			null
		);

		assert.equal(index(myList, 6), 2);
	});

	it('find item with function or index', () => {
		assert.strictEqual(
			find<number>(myList, (item) => !(item%5)),
			5
		);

		assert.strictEqual(
			find<number>(myList, (item) => !(item%9)),
			null
		);

		assert.strictEqual(
			find<number>(l(), (item) => true),
			null
		);

		assert.strictEqual(nth(myList, 2), 6);
	});

	it('get length of list', () => {
		assert.equal(length(myList), 3);
		assert.equal(length(l()), 0);
	});

	it('set the list item by index', () => {
		assert.equal(
			toString(setNth(myList, 1, 10)),
			'(2, 10, 6)'
		);

		assert.equal(
			toString(setNth(myList, -1, 20)),
			'(2, 5, 20)'
		);

		assert.throws(() => setNth(myList, 5, 10), "Index '5' outside the list");
		assert.throws(() => setNth(myList, -4, 10), "Index '-4' outside the list");
	});

	it('join two lists', () => {
		assert.equal(
			toString(join(myList, l(7, 8, 9))),
			'(2, 5, 6, 7, 8, 9)'
		);

		assert.equal(
			toString(join(myList, l())),
			'(2, 5, 6)'
		);

		assert.equal(
			toString(join(l(), myList)),
			'(2, 5, 6)'
		);

		assert.equal(
			toString(join(l(), l())),
			'()'
		);
	});
});
