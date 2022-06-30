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
		const rest = checkItem(tail(ls), index + 1);

		if(callback(head, index)) {
			return prepand(rest, head);
		}

		return rest;
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

export function append(list: List, value: unknown): List {
	if(isEmpty(list)) {
		return prepand(list, value);
	}

	return prepand(
		append(tail(list), value),
		top(list)
	);
}

export function findIndex<T = unknown>(list: List, callback: IterationCb<T, boolean>) {
	return (function getIndex(ls: List, index = 0): number {
		if(isEmpty(ls)) {
			return -1;
		}

		const head = <T>top(ls);

		if(callback(head, index)) {
			return index;
		}

		return getIndex(tail(ls), index + 1);
	}(list));
}

export function index(list: List, value: unknown): ReturnType<typeof findIndex> {
	return findIndex(list, (item) => item === value);
}

export function find<T = unknown>(list: List, callback: IterationCb<T, boolean>) {
	return (function checkItem(ls: List, index = 0): T | undefined  {
		if(isEmpty(ls)) {
			return undefined;
		}

		const head = <T>top(ls);

		if(callback(head, index)) {
			return head;
		}

		return checkItem(tail(ls), index + 1);
	}(list));
}

export function nth<T = unknown>(list: List, index: number): T | undefined {
	return find<T>(list, (item, i) => index === i);
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
