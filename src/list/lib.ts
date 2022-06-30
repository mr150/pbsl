import type { List, IterationCb, ReduceCb } from './types';
import { l, top, tail, isEmpty, prepand } from './core';

export function map<T0, T1 = T0>(list: List, callback: IterationCb<T0, T1>) {
	return (function mapItem(ls: List, index = 0): List {
		if(isEmpty(ls)) {
			return l();
		}

		const head = <T0>top(ls);
		const newItem = callback(head, index);
		return prepand(mapItem(tail(ls), index + 1), newItem);
	}(list));
}

export function filter<T>(list: List, callback: IterationCb<T, boolean>) {
	return (function checkItem(ls: List, index = 0): List {
		if(isEmpty(ls)) {
			return l();
		}

		const head = <T>top(ls);

		return callback(head, index) ?
			prepand(checkItem(tail(ls), index + 1), head) :
			checkItem(tail(ls), index + 1);
	}(list));
}

export function reduce<T0, T1 = T0>(list: List, callback: ReduceCb<T0, T1>, initValue?: T0 | T1) {
	return (function reduceItem(ls: List, result: typeof initValue, index = 0): T1 | null {
		if(isEmpty(ls)) {
			return <T1>result || null;
		}

		const head = <T0>top(ls);

		if(result === undefined) {
			result = head;
		} else {
			result = callback(<T1>result, head, index);
		}

		return reduceItem(tail(ls), result, index + 1);
	}(list, initValue));
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
	return (function getIndex(ls: List, index = 0): number | null  {
		if(isEmpty(ls)) {
			return null;
		}

		const head = <T>top(ls);

		return callback(head, index) ?
			index :
			getIndex(tail(ls), index + 1);
	}(list));
}

export function index(ls: List, val: unknown): number | null {
	return findIndex(ls, (item) => item === val);
}

export function find<T = unknown>(list: List, callback: IterationCb<T, boolean>) {
	return (function checkItem(ls: List, index = 0): T | null  {
		if(isEmpty(ls)) {
			return null;
		}

		const head = <T>top(ls);

		return callback(head, index) ?
			head :
			checkItem(tail(ls), index + 1);
	}(list));
}

export function nth(ls: List, index: number): unknown | null {
	return find(ls, (item, i) => index === i);
}

export function length(list: List) {
	return (function counter(ls: List, result = 0): number {
		if(isEmpty(ls)) {
			return result;
		}

		return counter(tail(ls), result + 1);
	}(list));
}

export function setNth(list: List, index: number, value: unknown) {
	if(index < 0) {
		const lsLength = length(list);

		if(index < -lsLength) {
			throw new Error(`Index '${index}' outside the list`);
		}

		index = lsLength + index;
	}

	return (function getItem(ls: List, i = 0): List | never  {
		if(isEmpty(ls)) {
			throw new Error(`Index '${index}' outside the list`);
		}

		if(i === index) {
			return prepand(tail(ls), value);
		}

		return prepand(
			getItem(tail(ls), i + 1),
			top(ls)
		);
	}(list));
}

export function join(list0: List, list1: List) {
	return (function getList(ls: List): List {
		if(isEmpty(ls)) {
			return list1;
		}

		return prepand(
			getList(tail(ls)),
			top(ls)
		);
	}(list0));
}
