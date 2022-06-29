import type { Pair } from '../pair';

export type EmptyList = null;
export type List = Pair<unknown, Pair | null> | EmptyList;

export type IterationCb<Arg, Ret> = (item: Arg, index: number) => Ret;
export type ReduceCb<Arg, Accum> = (accum: Accum, item: Arg, index: number) => Accum;
