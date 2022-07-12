import { pair } from '../src/pair';
import { mkMap, get, set, has, remove, keys, values, merge, isPbMap } from '../src/map';
import { l, toString } from '../src/list';
import { assert } from 'chai';

describe('map', () => {
	const myMap = mkMap([['name', 'mister'], ['age', '54']]);
	const codes = mkMap([[200, 'ok'], [403, 'forbidden'], [404, 'not found']]);
	const empty = mkMap();

	it('print a map like a list', () => {
		assert.equal(
			toString(myMap),
			'((name, mister), (age, 54))'
		);

		assert.equal(
			toString(empty),
			'()'
		);
	});

	it('get value', () => {
		assert.strictEqual(get(myMap, 'name'), 'mister');
		assert.strictEqual(get(myMap, 'testou'), undefined);
	});

	it('set value', () => {
		assert.equal(
			toString(set(myMap, 'race', 'human')),
			'((race, human), (name, mister), (age, 54))'
		);

		assert.equal(
			toString(set(myMap, 'name', 'BoBuk')),
			'((name, BoBuk), (age, 54))'
		);
	});

	it('has key', () => {
		assert.equal(
			has(myMap, 'name'),
			true
		);

		assert.equal(
			has(myMap, 'nope'),
			false
		);

		assert.equal(
			has(empty, 'noooo'),
			false
		);
	});

	it('remove items', () => {
		assert.equal(
			toString(remove(myMap, 'age')),
			'((name, mister))'
		);

		assert.equal(
			toString(remove(myMap, 'nope')),
			'((name, mister), (age, 54))'
		);

		assert.equal(
			toString(remove(empty, 'noo')),
			'()'
		);

		assert.equal(
			toString(remove(codes, 403, 404)),
			'((200, ok))'
		);
	});

	it('get list of keys', () => {
		assert.equal(
			toString(keys(myMap)),
			'(name, age)'
		);

		assert.equal(
			toString(keys(empty)),
			'()'
		);
	});

	it('get list of values', () => {
		assert.equal(
			toString(values(codes)),
			'(ok, forbidden, not found)'
		);

		assert.equal(
			toString(values(empty)),
			'()'
		);
	});


	it('merge two maps', () => {
		assert.equal(
			toString(merge(myMap, pair('new', 'year'))),
			'((new, year), (name, mister), (age, 54))'
		);

		assert.equal(
			toString(merge(myMap, pair('name', 'BoBuk'))),
			'((name, BoBuk), (age, 54))'
		);

		assert.equal(
			toString(merge(myMap, mkMap([['testo', 'prosto']]))),
			'((name, mister), (age, 54), (testo, prosto))'
		);

		assert.equal(
			toString(merge(myMap, mkMap([['testo', 'prosto'], ['age', '36']]))),
			'((name, mister), (testo, prosto), (age, 36))'
		);

		assert.equal(
			toString(merge(empty, pair('new', 'year'))),
			'((new, year))'
		);

		assert.equal(
			toString(merge(empty, mkMap([['testo', 'prosto']]))),
			'((testo, prosto))'
		);

		assert.equal(
			toString(merge(myMap, empty)),
			'((name, mister), (age, 54))'
		);
	});

	it('PbMap typeguard', () => {
		assert.strictEqual(
			isPbMap(myMap), true
		);

		assert.strictEqual(
			isPbMap(pair(5, 2)), false
		);

		assert.strictEqual(
			isPbMap(l(5, 2)), false
		);

		assert.strictEqual(
			isPbMap(l(l(5), l(6))), false
		);

		assert.strictEqual(
			isPbMap(l<any>(pair(1, 0), 2)), false
		);

		assert.strictEqual(
			isPbMap(empty), false
		);
	});
});
