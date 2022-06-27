import { pair, fir, sec } from '../pair';
import type { List, EmptyList } from './types';

function fillList(items: unknown[]): List {
	if(items.length > 1) {
		return pair(items[0], fillList(items.slice(1)));
	}

	return pair(items[0], null);
}

export function l(...items: unknown[]): List {
	if(!items.length) {
		return null;
	}

	return fillList(items);
}

export function prepand(ls: List, val: unknown): List {
	return pair(val, ls);
}

export const isEmpty = (ls: List): ls is EmptyList => ls === null;

export const top = (ls: List): unknown => {
	if(isEmpty(ls)) {
		return null;
	}

	return fir(ls);
}

export const tail = (ls: List): List | null => {
	if(isEmpty(ls)) {
		return null;
	}

	return <List>sec(ls);
}

export function toString(ls: List, isNested = true): string {
	const separator = isNested ? '(' : ', ';

	if(isEmpty(ls)) {
		return (isNested ? separator : '') + ')';
	}

	if(typeof ls !== 'function') {
		return ', ' + <string>ls + ')';
	}

	const head = fir(ls);
	const rest = sec(ls);

	const headStr = typeof head === 'function' ? toString(<List>head) : head;

	return separator + <string>headStr + toString(<List>rest, false);
}
