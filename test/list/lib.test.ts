import { pair } from '../../pair';
import { l, toString, prepand } from '../../list/core';
import { map, filter, reduce, append, findIndex, find, index, nth, length, setNth, join } from '../../list/lib';
import {assert} from 'chai';

describe('list/lib', () => {
	const myList = l(2, 5, 6);
	const empty = l();

	it('mapping', () => {
		assert.strictEqual(
			toString(map(myList, (item) => item * 10)),
			'(20, 50, 60)'
		);

		assert.equal(
			map(empty, (item) => item),
			l(),
		);

		assert.strictEqual(
			toString(map(myList, (item, i) => pair(i, item))),
			'((0, 2), (1, 5), (2, 6))'
		);
	});

	it('filter', () => {
		assert.strictEqual(
			toString(filter(myList, (item) => !(item%2))),
			'(2, 6)'
		);

		assert.strictEqual(
			toString(filter(myList, (item, i) => item < i)),
			'()'
		);
	});

	it('reduce', () => {
		assert.strictEqual(
			reduce(myList, (accum: number, item) => accum += item),
			13,
		);

		assert.strictEqual(
			toString(reduce(myList, (accum, item, i) => prepand(accum, item + i), l())),
			'(8, 6, 2)'
		);

		assert.strictEqual(
			reduce(l(), (accum, item) => accum += item, '0'),
			'0',
		);

		assert.strictEqual(
			reduce(l(), (accum, item) => accum || item),
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
			findIndex(myList, (item) => item === 5),
			1
		);

		assert.strictEqual(
			findIndex(l(), (item) => item === 5),
			-1
		);

		assert.strictEqual(
			findIndex(myList, (item, i) => item < i),
			-1
		);

		assert.equal(index(myList, 6), 2);
	});

	it('find item with function or index', () => {
		assert.strictEqual(
			find(myList, (item) => !(item%5)),
			5
		);

		assert.strictEqual(
			find(myList, (item) => !(item%9)),
			undefined
		);

		assert.strictEqual(
			find(l(), (item) => true),
			undefined
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
