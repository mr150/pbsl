export type Pair<T0 = unknown, T1 = unknown> = {
	(data: 'FIR' | 'SEC'): T0 | T1 | never,
	_type: string,
}

export function pair<T0, T1>(a: T0, b: T1, type = 'pair') {
	const pr: Pair<T0, T1> = (data) => {
		switch(data) {
			case 'FIR': return a;
			case 'SEC': return b;
			default: throw new Error('invalid argument');
		}
	}

	pr._type = type;

	return pr;
}

export const fir = <F, S>(pair: Pair<F, S>): F => <F>pair('FIR');
export const sec = <F, S>(pair: Pair<F, S>): S => <S>pair('SEC');

export function isPair(pair: unknown): pair is Pair {
	return typeof pair === 'function' && (<Pair>pair)._type === 'pair';
}

export function toString(pr: Pair): string {
	const fr = fir(pr);
	const sc = sec(pr);

	return `(${isPair(fr) ? toString(fr) : <string>fr}, ${isPair(sc) ? toString(sc) : <string>sc})`;
}
