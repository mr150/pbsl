import { PbMap } from './types';
import {
	l, find, findIndex, setNth, prepand, filter, map, join, List, isEmpty, isFilledList
} from '../list';
import { pair, fir, sec, Pair } from '../pair';

export function mkMap<K, V>(entries?: [K, V][]): PbMap<K, V> {
	if(entries === undefined) {
		return <PbMap<K, V>>l();
	}

	return l(
		...entries.map((item) => pair(item[0], item[1]))
	);
}

export function get<K, V>(mp: PbMap<K, V>, key: K): V | undefined {
	const elem = find(mp, (item) => fir(item) === key);

	return elem === undefined ? elem : sec(elem);
}

export function set<K, V>(mp: PbMap<K, V>, key: K, value: V): PbMap<K, V> {
	const index = findIndex(mp, (item) => fir(item) === key);

	if(index < 0) {
		return prepand(mp, pair(key, value));
	}

	return setNth(mp, index, pair(key, value));
}

export function has<K, V>(mp: PbMap<K, V>, key: K): boolean {
	return find(mp, (item) => fir(item) === key) === undefined ? false : true;
}

export function remove<K, V>(mp: PbMap<K, V>, ...keys: K[]): PbMap<K, V> {
	return filter(
		mp,
		(item) => keys.indexOf(fir(item)) < 0
	);
}

export function keys<K, V>(mp: PbMap<K, V>): List<K> {
	return map(mp, (item) => fir(item));
}

export function values<K, V>(mp: PbMap<K, V>): List<V> {
	return map(mp, (item) => sec(item));
}

export function merge<K, V>(
	firMap: PbMap<K, V>, secMap: PbMap<K, V> | Pair<K, V>
): PbMap<K, V> {
	if(isEmpty(secMap)) {
		return firMap;
	}

	if(isFilledList(secMap)) {
		const filteredMap = filter(
			firMap,
			(firItem) => {
				const key = fir(firItem);
				return findIndex(secMap, (secItem) => key === fir(secItem)) < 0
			}
		);

		return join(filteredMap, secMap);
	}

	return set(firMap, fir(secMap), sec(secMap));
}
