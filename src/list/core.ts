import { pair, fir, sec, isPair } from '../pair';
import type { List, EmptyList } from './types';

function fillList(items: unknown[]): List {
	return pair(
		items[0],
		(items.length > 1) ? fillList(items.slice(1)) : null,
		'list'
	);
}

export function prepand(ls: List, val: unknown): List {
	return pair(val, ls, 'list');
}

export function l(...items: unknown[]): List {
	if(!items.length) {
		return null;
	}

	return fillList(items);
}

export const isEmpty = (ls: unknown): ls is EmptyList => ls === null;

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

export function isFilledList(ls: unknown): ls is List {
	try {
		return typeof ls === 'function' && ls('TYPE') === 'list';
	} catch {
		return false;
	}
}

export function toString(ls: List, isNested = true, insidePair = false): string {
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
		headStr = toString(<List>head, true, true);
	} else if(isFilledList(head)) {
		headStr = toString(head);
	} else {
		headStr = head;
	}

	const restStr = isPair(rest) || (insidePair && isFilledList(rest)) ?
		`, ${toString(rest)})` :
		toString(rest, false);

	return separator + <string>headStr + restStr;
}
