import type { Pair } from '../pair';
import type { List } from '../list';

export type PbMap<Key = unknown, Value = unknown> = List<Pair<Key, Value>>;
