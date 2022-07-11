import { pair, fir, sec, isPair, Pair } from '../pair';

export type EmptyList = null;
export type List<T = unknown> = Pair<T, Pair<T, null> | null> | EmptyList;

export function prepand<T>(ls: List<T>, val: T): List<T> {
	return <List<T>>pair(val, ls, 'list');
}

export function l<T>(...items: T[]) {
	if(!items.length) {
		return null;
	}

	return (function fillList(items: T[]): List<T> {
		return <List<T>>pair(
			items[0],
			(items.length > 1) ? fillList(items.slice(1)) : null,
			'list'
		);
	}(items));
}

export const isEmpty = (ls: unknown): ls is EmptyList => ls === null;

export const top = <T>(ls: List<T>): T | null => {
	if(isEmpty(ls)) {
		return null;
	}

	return fir(ls);
}

export const tail = <T>(ls: List<T>): List<T> => {
	if(isEmpty(ls)) {
		return null;
	}

	return sec(ls);
}

export function isFilledList(ls: unknown): ls is List {
	try {
		return typeof ls === 'function' && ls('TYPE') === 'list';
	} catch {
		return false;
	}
}

export function toString(list: List) {
	return (function print(ls: List, isNested = true, insidePair = false): string {
		const separator = isNested ? '(' : ', ';

		if(isEmpty(ls)) {
			return (isNested ? separator : '') + ')';
		}

		if(typeof ls !== 'function') {
			return ', ' + <string>ls + ')';
		}

		const head = top(ls);
		const rest = tail(ls);

		let headStr: unknown;

		if(isPair(head)) {
			headStr = print(<List>head, true, true);
		} else if(isFilledList(head)) {
			headStr = print(head);
		} else {
			headStr = head;
		}

		const restStr = isPair(rest) || (insidePair && isFilledList(rest)) ?
			`, ${print(rest)})` :
			print(rest, false);

		return separator + <string>headStr + restStr;
	}(list));
}
