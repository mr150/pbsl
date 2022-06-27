import type { Pair } from '../pair';

export type EmptyList = null;
export type List = Pair<unknown, Pair | null> | EmptyList;
