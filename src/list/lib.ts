import type { List, IterationCb, ReduceCb } from './types';
import { l, top, tail, isEmpty, prepand } from './core';

export function map<T0, T1 = T0>(ls: List, callback: IterationCb<T0, T1>, index = 0): List {
	if(isEmpty(ls)) {
		return l();
	}

	const head = <T0>top(ls);
	const newItem = callback(head, index);
	return prepand(map(tail(ls), callback, index + 1), newItem);
}

export function filter<T>(ls: List, callback: IterationCb<T, boolean>, index = 0): List {
	if(isEmpty(ls)) {
		return l();
	}

	const head = <T>top(ls);

	return callback(head, index) ?
		prepand(filter(tail(ls), callback, index + 1), head) :
		filter(tail(ls), callback, index + 1);
}

export function reduce<T0, T1 = T0>(
	ls: List,
	callback: ReduceCb<T0, T1>,
	result?: T0 | T1,
	index = 0,
): T1 | null {
	if(isEmpty(ls)) {
		return <T1>result || null;
	}

	const head = <T0>top(ls);

	if(result === undefined) {
		result = head;
	} else {
		result = callback(<T1>result, head, index);
	}

	return reduce(tail(ls), callback, result, index + 1);
}

export function append(ls: List, val: unknown): List {
	if(isEmpty(ls)) {
		return prepand(ls, val);
	}

	return prepand(
		append(tail(ls), val),
		top(ls)
	);
}

export function findIndex<T = unknown>(list: List, callback: IterationCb<T, boolean>) {
	return (function getIndex(ls: List, index: number): number | null  {
		if(isEmpty(ls)) {
			return null;
		}

		const head = <T>top(ls);

		return callback(head, index) ?
			index :
			getIndex(tail(ls), index + 1);
	}(list, 0))
}

export function find<T = unknown>(list: List, callback: IterationCb<T, boolean>) {
	return (function checkItem(ls: List, index: number): T | null  {
		if(isEmpty(ls)) {
			return null;
		}

		const head = <T>top(ls);

		return callback(head, index) ?
			head :
			checkItem(tail(ls), index + 1);
	}(list, 0))
}

export function index(ls: List, val: unknown): number | null {
	return findIndex(ls, (item) => item === val);
}

export function nth(ls: List, index: number): unknown | null {
	return find(ls, (item, i) => index === i);
}
