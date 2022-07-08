// Generic could have the third parameter for the type of pair, but while I have left just a string
export type Pair<T0 = unknown, T1 = unknown> =
	(data: 'FIR' | 'SEC' | 'TYPE') => T0 | T1 | string | never;
