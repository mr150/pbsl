import { pair } from '../../src/pair';
import { l, top, tail, isEmpty, toString, prepand } from '../../src/list';
import {assert} from 'chai';

describe('list/core', () => {
	const myList = l(2, 5, 6);
	const pairInList = l(pair(1, 0), 'item', 'end');
	const empty = l();

	it('check empty list', () => {
		assert.strictEqual(isEmpty(empty), true);
		assert.strictEqual(isEmpty(myList), false);
	});

	it('get first element', () => {
		assert.strictEqual(top(myList), 2);
		assert.strictEqual(top(empty), null);
	});

	it('get tail', () => {
		assert.strictEqual(toString(tail(myList)), '(5, 6)');
		assert.strictEqual(tail(empty), null);
	});

	it('print a list', () => {
		assert.strictEqual(toString(empty), '()');
		assert.strictEqual(toString(myList), '(2, 5, 6)');
	});

	it('print a list with pairs inside', () => {
		assert.strictEqual(toString(pairInList), '((1, 0), item, end)');
		assert.strictEqual(
			toString(l(pair('te', 'sto'), 'testou', pair('t', 'esto'))),
			'((te, sto), testou, (t, esto))'
		);
		assert.strictEqual(
			toString(l(
				pair(pair(1, 2), pair(5, 4)),
				pair(pair(3, 6), 0)
			)),
			'(((1, 2), (5, 4)), ((3, 6), 0))'
		);
	});

	it('print a list with lists inside', () => {
		assert.strictEqual(
			toString(l(l(1, 0, 5), l(3, 6, 0))),
			'((1, 0, 5), (3, 6, 0))'
		);

		assert.strictEqual(
			toString(l(1, pair(l(3, 4, 8), 9))),
			'(1, ((3, 4, 8), 9))'
		);

		assert.strictEqual(
			toString(l(pair(3, l(6, 7)), 1)),
			'((3, (6, 7)), 1)'
		);

		assert.strictEqual(
			toString(l(
				pair(3, l(6, 7)),
				pair(l(3, 4, 8), l(6, 7, 9))
			)),
			'((3, (6, 7)), ((3, 4, 8), (6, 7, 9)))'
		);
	});

	it('prepand value', () => {
		assert.strictEqual(
			toString(prepand(myList, 0)),
			'(0, 2, 5, 6)'
		);

		assert.strictEqual(
			toString(prepand(myList, l(1, 3, 8))),
			'((1, 3, 8), 2, 5, 6)'
		);
	});
});
