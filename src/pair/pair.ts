import type { Pair } from './types';

export function pair<T0, T1>(a: T0, b: T1): Pair<T0, T1> {
	return function(data) {
		switch(data) {
			case 'FIR': return a;
			case 'SEC': return b;
			default: throw new Error('invalid argument');
		}
	};
}

// I don't know yet, how to typify this better
export const fir = (pair: Pair): unknown => pair('FIR');
export const sec = (pair: Pair): unknown => pair('SEC');

export function toString(pr: Pair): string {
	const fr = fir(pr);
	const sc = sec(pr);

	return `(${typeof fr === 'function' ? toString(<Pair>fr) : <string>fr}, ${typeof sc === 'function' ? toString(<Pair>sc) : <string>sc})`;
}
