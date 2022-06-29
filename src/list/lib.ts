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
