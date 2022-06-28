import type { Pair } from './types';

export function pair<T0, T1>(a: T0, b: T1, type = 'pair'): Pair<T0, T1> {
	return function(data) {
		switch(data) {
			case 'FIR': return a;
			case 'SEC': return b;
			case 'TYPE': return type;
			default: throw new Error('invalid argument');
		}
	};
}

// I don't know yet, how to typify this better
export const fir = (pair: Pair): unknown => pair('FIR');
export const sec = (pair: Pair): unknown => pair('SEC');

export function isPair(pair: unknown): pair is Pair {
	try {
		return typeof pair === 'function' && pair('TYPE') === 'pair';
	} catch {
		return false;
	}
}

export function toString(pr: Pair): string {
	const fr = fir(pr);
	const sc = sec(pr);

	return `(${isPair(fr) ? toString(fr) : <string>fr}, ${isPair(sc) ? toString(sc) : <string>sc})`;
}
