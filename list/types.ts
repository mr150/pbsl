import type { Pair } from '../pair';

export type EmptyList = null;
export type List<T = unknown> = Pair<T, Pair<T, null> | null> | EmptyList;

export type IterationCb<Arg, Ret> = (item: Arg, index: number) => Ret;
export type ReduceCb<Arg, Accum> = (accum: Accum, item: Arg, index: number) => Accum;
