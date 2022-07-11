// Generic could have the third parameter for the type of pair, but while I have left just a string
export type Pair<T0 = unknown, T1 = unknown> =
	(data: 'FIR' | 'SEC' | 'TYPE') => T0 | T1 | string | never;

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

export const fir = <F, S>(pair: Pair<F, S>): F => <F>pair('FIR');
export const sec = <F, S>(pair: Pair<F, S>): S => <S>pair('SEC');

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
