import { l, top, tail, isEmpty, prepand, List } from './core';

export type IterationCb<Arg, Ret> = (item: Arg, index: number) => Ret;
export type ReduceCb<Arg, Accum> = (accum: Accum, item: Arg, index: number) => Accum;

export function map<I, R>(list: List<I>, callback: IterationCb<I, R>) {
	return (function mapItem(ls: List<I>, index = 0): List<R> {
		if(isEmpty(ls)) {
			return l();
		}

		const head = <I>top(ls);
		const newItem = callback(head, index);
		return prepand(mapItem(tail(ls), index + 1), newItem);
	}(list));
}

export function filter<T>(list: List<T>, callback: IterationCb<T, boolean>) {
	return (function checkItem(ls: List<T>, index = 0): List<T> {
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

export function reduce<I, R>(list: List<I>, callback: ReduceCb<I, R>, initValue?: I | R) {
	return (function reduceItem(ls: List<I>, result: typeof initValue, index = 0): R | null {
		if(isEmpty(ls)) {
			return <R>result || null;
		}

		const head = <I>top(ls);

		if(result === undefined) {
			result = head;
		} else {
			result = callback(<R>result, head, index);
		}

		return reduceItem(tail(ls), result, index + 1);
	}(list, initValue));
}

export function append<T>(list: List<T>, value: T): List<T> {
	if(isEmpty(list)) {
		return prepand(list, value);
	}

	return prepand(
		append(tail(list), value),
		<T>top(list)
	);
}

export function findIndex<T>(list: List<T>, callback: IterationCb<T, boolean>) {
	return (function getIndex(ls: List<T>, index = 0): number {
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

export function index<T>(list: List<T>, value: T): ReturnType<typeof findIndex> {
	return findIndex(list, (item) => item === value);
}

export function find<T>(list: List<T>, callback: IterationCb<T, boolean>) {
	return (function checkItem(ls: List<T>, index = 0): T | undefined  {
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

export function nth<T>(list: List<T>, index: number): T | undefined {
	return find(list, (item, i) => index === i);
}

export function length(list: List) {
	return (function counter(ls: List, result = 0): number {
		if(isEmpty(ls)) {
			return result;
		}

		return counter(tail(ls), result + 1);
	}(list));
}

export function setNth<T>(list: List<T>, index: number, value: T) {
	if(index < 0) {
		const lsLength = length(list);

		if(index < -lsLength) {
			throw new Error(`Index '${index}' outside the list`);
		}

		index = lsLength + index;
	}

	return (function getItem(ls: List<T>, i = 0): List<T> | never  {
		if(isEmpty(ls)) {
			throw new Error(`Index '${index}' outside the list`);
		}

		if(i === index) {
			return prepand(tail(ls), value);
		}

		return prepand(
			getItem(tail(ls), i + 1),
			<T>top(ls)
		);
	}(list));
}

export function join<T>(list0: List<T>, list1: List<T>) {
	return (function getList(ls: List<T>): List<T> {
		if(isEmpty(ls)) {
			return list1;
		}

		return prepand(
			getList(tail(ls)),
			<T>top(ls)
		);
	}(list0));
}
